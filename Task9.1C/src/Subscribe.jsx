import React from "react";
import "./Subscribe.css";

function Subscribe() {
  return (
    <div className="signupContainer">
      <span className="signupText">SIGN UP FOR OUR DAILY INSIDER</span>
      <input
        type="email"
        placeholder="Enter your email"
        className="emailInput"
      />
      <button className="subscribeBtn">Subscribe</button>
    </div>
  );
}

export default Subscribe