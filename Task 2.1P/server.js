require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
 
app.get("/", (req,res) => {
    console.log(req)
    res.sendFile(__dirname + "/index.html")
})


app.post('/', async (req, res) => {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;
    
    console.log("Incoming data:", req.body);
    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
        to: email,
        from: 'chout799@gmail.com', // must be verified with SendGrid
        subject: 'Welcome!',
        text: `Hi ${fname} ${lname}, welcome to our service!`,
        html: `<p>Hi <strong>${fname} ${lname}</strong>, welcome to our service!</p>`,
    };
    
    try {
        await sgMail.send(msg);
        console.log("Message sent to:", email);
        res.send("We have got your email and sent a message.");
    } catch (error) {
        console.error("SendGrid error:", error);
        if (error.response) {
            console.error(error.response.body);
        }
        res.status(500).send("There was an error sending your email.");
    }
});    

app.listen(5000, (req, res) =>{
    console.log("server is running at port 5000")
})
