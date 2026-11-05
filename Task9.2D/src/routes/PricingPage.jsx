import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { db } from "../utils/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import "./PricingPage.css"; 


const stripePromise = loadStripe("pk_test_51SBTIxQREaGR5hlFY4OjsuodT1Bqh5MpyUmj4GwPINuAk3VqGBvU4yhOLvJmXw3fuKc6fk3SRcAe7UuJkC1ISxTw00R5wpSzcE");

function PricingPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isPremium, setIsPremium] = useState(false);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      if (user?.uid) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setIsPremium(data.premium === true);
            setCancelAtPeriodEnd(data.cancelAtPeriodEnd || false);
          } else {
            setIsPremium(false);
          }
        } catch (err) {
          console.error("Error fetching premium status:", err);
          setIsPremium(false);
        }
      }
    };

    fetchPremiumStatus();
  }, [user]);

  const handlePremiumSelect = async () => {
    if (!user?.uid) {
      navigate('/Login');
      return;
    }
      const stripe = await stripePromise;

      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const session = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        alert(result.error.message);
      }
    };

  const handleCancel = async () => {
      const res = await fetch("http://localhost:5000/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }),
      });
    
      const data = await res.json();
      if (data.success) {
        alert("Your subscription will end at the end of the billing period.");
      } else {
        alert("Error cancelling subscription: " + (data.error || "Unknown error"));
      }
    };
    
  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Choose Your Plan</h1>
      <div className="plans-wrapper">


        <div className="plan-card free-plan">
          <h2>Free Plan</h2>
          <p>Basic features</p>
          <p className="price">$0 / month</p>
          {isPremium ? (<button className="plan-btn" onClick={handleCancel}>Cancel Premium</button>)
           : (<button className="plan-btn" disabled>Current Plan</button>)}
        </div>

        <div className="plan-card premium-plan">
          <h2>Premium Plan</h2>
          <p>Unlock customization</p>
          <p className="price">$9.99 / month</p>
          {isPremium && !user?.cancelAtPeriodEnd && (<button className="plan-btn cancel-btn" onClick={handleCancel}>Cancel Premium</button>)}
          {isPremium && user?.cancelAtPeriodEnd && (<p>Your subscription will end at the end of the billing period.</p>)}
          {!isPremium && (<button className="plan-btn go-premium-btn" onClick={handlePremiumSelect}>Go Premium</button>)}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
