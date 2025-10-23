"use client";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [paystackReady, setPaystackReady] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "Nigeria",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    notes: "",
    agree: false,
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // ✅ Load Paystack script safely
  useEffect(() => {
    if (window.PaystackPop) {
      setPaystackReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Paystack script loaded");
      setPaystackReady(true);
    };

    script.onerror = () => console.error("❌ Failed to load Paystack script");

    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Payment verification helper
  const verifyPayment = async (reference) => {
    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          customer: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.address}, ${formData.city}, ${formData.state}`,
            notes: formData.notes,
          },
          cart,
        }),
      });

      const data = await res.json();
      console.log("Verification result:", data);

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Thank you for your purchase. A confirmation email has been sent.",
          confirmButtonColor: "#063A47",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: "Payment verification failed. Please contact support.",
        });
      }
    } catch (err) {
      console.error("Verification Error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not verify payment. Please contact support.",
      });
    }
  };

  // ✅ Handle Paystack payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (
      !formData.agree ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Kindly fill all required fields indicated with *",
        confirmButtonColor: "#063A47",
      });
      return;
    }

    if (cart.length === 0) {
      Swal.fire({ icon: "info", title: "Your cart is empty" });
      return;
    }

    if (!paystackReady || typeof window.PaystackPop === "undefined") {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Payment system not ready yet. Please wait a few seconds and try again.",
      });
      return;
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Missing Paystack public key. Please contact support.",
      });
      return;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: total * 100,
        currency: "NGN",
        ref: `DISTILLERY-${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: `${formData.firstName} ${formData.lastName}`,
              variable_name: "customer_name",
              value: formData.phone,
            },
          ],
        },
        callback: (response) => {
          console.log("✅ Paystack callback triggered:", response);
          verifyPayment(response.reference);
        },
        onClose: () => {
          Swal.fire({
            icon: "info",
            title: "Payment Cancelled",
            text: "You closed the payment window.",
          });
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("❌ Paystack setup failed:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong while initiating payment.",
      });
    }
  };

  return (
    <div className="new-checkout-container">
      <div className="new-checkout-grid">
        {/* Billing Form */}
        <form onSubmit={handlePayment} className="new-billing-form">
          <h2>Billing details</h2>

          <div className="new-form-row">
            <div className="new-form-group">
              <label>First name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="new-form-group">
              <label>Last name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="new-form-group">
            <label>Company name (optional)</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="new-form-group">
            <label>Country / Region *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option>Nigeria</option>
              <option>Ghana</option>
              <option>Kenya</option>
            </select>
          </div>

          <div className="new-form-group">
            <label>Street address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="new-form-row">
            <div className="new-form-group">
              <label>Town / City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="new-form-group">
              <label>State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select state</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Rivers</option>
              </select>
            </div>
          </div>

          <div className="new-form-row">
            <div className="new-form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="new-form-group">
              <label>Email address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="new-form-group">
            <label>Order notes (optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes about your order, e.g. special instructions for delivery."
            ></textarea>
          </div>
        </form>

        {/* Order Summary */}
        <div className="new-order-summary">
          <h2>Your order</h2>

          <div className="new-order-item">
            <div className="new-order-row">
              <p><strong>Product</strong></p>
              <p><strong>Subtotal</strong></p>
            </div>

            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="new-order-row">
                  <p>{item.name} ({item.purchaseType}) × {item.quantity}</p>
                  <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          <div className="new-order-total">
            <p><strong>Total</strong></p>
            <p><strong>₦{total.toLocaleString()}</strong></p>
          </div>

          <div className="new-payment-info">
            <p><strong>Debit/Credit Cards</strong></p>
            <div className="new-card-logos">
              <img
                src="https://thedistillery.ng/wp-content/plugins/woo-paystack/assets/images/paystack-wc.png"
                className="new-card-logo"
                alt="Visa"
              />
            </div>
          </div>

          <p className="new-privacy-note">
            Your personal data will be used to process your order and improve your experience on this site.
          </p>

          <div className="new-terms">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <label>I have read and agree to the website terms and conditions *</label>
          </div>

          <button type="button" onClick={handlePayment} className="new-place-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}