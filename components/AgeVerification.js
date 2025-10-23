"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleAccept = () => {
    setIsVerified(true);
    setShowModal(false); // Hide modal for this session only
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  if (!showModal) return null; 

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
