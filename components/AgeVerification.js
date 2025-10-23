"use client";
import { useEffect, useState } from "react";

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if the user has already verified their age
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      setIsVerified(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
  };

  const handleReject = () => {
    alert("Sorry, you must be 18 years or older to access this site.");
    window.location.href = "https://www.google.com";
  };

  if (isVerified) return null; // If verified, don't show modal

  return (
    <div className="age-overlay">
      <div className="age-modal">
        <h1>CONFIRM YOUR AGE!</h1>
        <p>Are you over the age of 18? <br /> You must be 18 years or older to access this website.</p>
        <div className="age-buttons">
          <button className="no" onClick={handleReject}>No, I’m below 18</button>
          <button className="yes" onClick={handleAccept}>Yes, I’m above 18</button>
        </div>
      </div>
    </div>
  );
}