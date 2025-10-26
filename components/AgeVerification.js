"use client";
import { useState, useEffect } from "react";

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const verifiedData = localStorage.getItem("ageVerified");

    if (verifiedData) {
      const { verified, timestamp } = JSON.parse(verifiedData);
      const now = Date.now();

      if (verified && now - timestamp < 30 * 60 * 1000) {
        setShowModal(false);
        return;
      }
    }

    setShowModal(true);
  }, []);

  const handleAccept = () => {
    const data = {
      verified: true,
      timestamp: Date.now(),
    };
    localStorage.setItem("ageVerified", JSON.stringify(data));
    setShowModal(false);
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  if (!showModal) return null;

  return (
    <div className="age-overlay">
      <div className="age-modal">
        <h1>CONFIRM YOUR AGE!</h1>
        <p>
          Are you over the age of 18? <br /> You must be 18 years or older to
          access this website.
        </p>
        <div className="age-buttons">
          <button className="no" onClick={handleReject}>
            No, I’m below 18
          </button>
          <button className="yes" onClick={handleAccept}>
            Yes, I’m above 18
          </button>
        </div>
      </div>
    </div>
  );
}
