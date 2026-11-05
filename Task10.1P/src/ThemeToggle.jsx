import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./utils/AuthContext";
import { db } from "./utils/firebase"; 
import { doc, getDoc } from "firebase/firestore";
function ThemeToggle() {
  const {user} = useContext(AuthContext);
  const [isPremium, setIsPremium] = useState(false);

  console.log("User object:", user);
  console.log("Premium field:", isPremium);
  useEffect(() => {
    const fetchPremiumStatus = async () => {
      if (user?.uid) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setIsPremium(data.premium === true); 
          } else {
            console.warn("No user doc found for:", user.uid);
            setIsPremium(false);
          }
        } catch (err) {
          console.error("Error fetching premium status:", err);
          setIsPremium(false);
        }
      } else {
        setIsPremium(false);
      }
      document.documentElement.setAttribute("data-theme", "light");
    };
    fetchPremiumStatus();
    }, [user]);
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={!isPremium}
      style={{
        padding: "8px 12px",
        margin: "10px",
        border: "none",
        cursor: isPremium ? "pointer" : "not-allowed",
        backgroundColor: "var(--component-bg)",
        color: "var(--primary-text)",
      }}
    >
      {isPremium ? "Toggle Theme" : "Theme selection for Premium Only"}
    </button>

  );
}

export default ThemeToggle;
