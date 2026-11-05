import React, { useState } from "react";
import "./Subscribe.css"
function Subscribe() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        alert("We’ve sent you a welcome email!");
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Network error.");
    }
  };

  return (
    <form className="signupContainer" onSubmit={handleSubscribe}>
      <span className="signupText">SIGN UP FOR OUR DAILY INSIDER</span>
      <input
        type="email"
        placeholder="Enter your email"
        className="emailInput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required/>
      <button className="subscribeBtn" type="submit">Subscribe</button>
    </form>
  );
}

export default Subscribe;
