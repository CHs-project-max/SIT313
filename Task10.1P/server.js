const { initializeApp } = require("firebase/app");
const { getFirestore, doc, updateDoc, getDoc } = require("firebase/firestore");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const firebaseConfig = {
  apiKey: "AIzaSyBUcBK_rpYnFEdjfOb931OY6a4ZPr1GoR0",
  authDomain: "deakinwebapp-5899c.firebaseapp.com",
  projectId: "deakinwebapp-5899c",
  storageBucket: "deakinwebapp-5899c.firebasestorage.app",
  messagingSenderId: "461754791912",
  appId: "1:461754791912:web:fa53af5661117d87f3d65d"
};
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

require('dotenv').config()

const bodyParser = require("body-parser")


const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
 
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { userId } = req.body;
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userSnap.data();
    const { subscriptionId, cancelAtPeriodEnd } = userData;

    if (subscriptionId && !cancelAtPeriodEnd) {
      return res.status(400).json({ error: "User already has an active subscription" });
    }

    if (subscriptionId && cancelAtPeriodEnd) {
      await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: false });
      await updateDoc(userRef, { cancelAtPeriodEnd: false });
      return res.json({ message: "Subscription resumed successfully" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: { name: "DEV@Deakin Premium Plan" },
            unit_amount: 999,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata: { userId },
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
    });

    res.json({ id: session.id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const subscriptionId = session.subscription;
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { 
        premium: true,
        subscriptionId: subscriptionId 
      });
      console.log(`User ${userId} is now premium with subscription ${subscriptionId}`);
    } catch (err) {
      console.error("Error updating premium status:", err);
    }
  }
  
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    const userId = subscription.metadata.userId; 
    try {
      await updateDoc(doc(db, "users", userId), { premium: false, subscriptionId: null, cancelAtPeriodEnd: false });
      console.log(`User ${userId} premium ended`);
    } catch (err) {
      console.error("Error updating user after subscription deletion:", err);
    }
  }
  res.json({ received: true });
});


app.post("/cancel-subscription", async (req, res) => {
  const { userId } = req.body;
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) return res.status(404).json({ error: "User not found" });

    const subscriptionId = userSnap.data().subscriptionId;
    if (!subscriptionId) return res.status(400).json({ error: "No subscription found" });
    
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    await updateDoc(userDocRef, { cancelAtPeriodEnd: true });

    res.json({ success: true });
    console.log(`Subscription ${subscriptionId} will end at period end for user ${userId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/send-email', async (req, res) => {
  const email = req.body.email;
  
  console.log("Incoming data:", req.body);
  
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
      to: email,
      from: 'chout799@gmail.com',
      subject: 'Welcome!',
      text: `Hi, welcome to our service!`,
      html: `<p>Hi, welcome to our service! this is a email that is send by our team</p>`,
  };
  
  try {
      await sgMail.send(msg);
      console.log("Message sent to:", email);
      res.json({success:true})
  } catch (error) {
      console.error("SendGrid error:", error);
      if (error.response) {
          console.error(error.response.body);
      }
      res.status(500).send("There was an error sending your email.");
  }
});    


app.listen(5000, (req,res) => console.log("Server running on port 5000"));
