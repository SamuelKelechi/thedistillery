"use client";

import React, { useState } from "react";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-container">
          <h1 className="contact-hero-title">Contact Us</h1>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-grid">
            <div className="contact-info-column">
              <h2 className="contact-section-title">Get In Touch</h2>
              <p className="contact-section-text">
                Whether it’s a chill night, a big event, or just stocking up
                <br />
                we’ve got your bottle. Drop us a line and let’s make sure
                <br />
                your next sip hits just right.
              </p>

              <div className="contact-info-items">
                <div className="contact-info-item">
                  <div className="contact-icon-circle">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                      <path
                        d="M8 8.5C9.38071 8.5 10.5 7.38071 10.5 6C10.5 4.61929 9.38071 3.5 8 3.5C6.61929 3.5 5.5 4.61929 5.5 6C5.5 7.38071 6.61929 8.5 8 8.5Z"
                        fill="white"
                      />
                      <path
                        d="M8 0.5C4.96243 0.5 2.5 2.96243 2.5 6C2.5 10.5 8 17.5 8 17.5C8 17.5 13.5 10.5 13.5 6C13.5 2.96243 11.0376 0.5 8 0.5Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <h4 className="contact-info-title">Address</h4>
                    <p className="contact-info-detail">
                      The Distilery Plaza, Call Park, Trade Fair, Lagos
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-circle">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M16.5 12.7V15.2C16.5008 15.4657 16.4301 15.7263 16.2952 15.9556C16.1604 16.1848 15.9661 16.3746 15.7319 16.5048C15.4977 16.6349 15.2319 16.7007 14.9644 16.6954C14.697 16.6901 14.4338 16.6139 14.2044 16.4744C11.1588 14.8155 8.58559 12.4278 6.72185 9.52312C4.85659 6.61583 3.76348 3.29167 3.54935 0.855625C3.54403 0.588291 3.60608 0.323093 3.73029 0.0858095C3.85449 -0.151474 4.03684 -0.378157 4.26435 -0.548125C4.49186 -0.718093 4.75751 -0.825769 5.03685 -0.861875C5.31619 -0.897981 5.59995 -0.861562 5.86185 -0.755625L8.22185 0.194375C8.46591 0.293712 8.67487 0.463063 8.82303 0.681667C8.97119 0.900271 9.05191 1.15849 9.05435 1.42313V3.67313C9.05435 4.40313 8.54935 5.02313 7.84935 5.19813C7.73685 5.22813 7.62685 5.27313 7.52185 5.33063C7.26185 5.47813 7.04935 5.70813 6.91935 5.98563C6.78935 6.26313 6.75185 6.57563 6.81435 6.87563C7.29935 9.17313 9.32685 11.2006 11.6244 11.6856C11.9244 11.7481 12.2369 11.7106 12.5144 11.5806C12.7919 11.4506 13.0219 11.2381 13.1694 10.9781C13.2269 10.8731 13.2719 10.7631 13.3019 10.6506C13.4769 9.95063 14.0969 9.44563 14.8269 9.44563H17.0769C17.3416 9.44807 17.5998 9.52879 17.8184 9.67695C18.037 9.82511 18.2064 10.0341 18.3057 10.2781L19.2557 12.6381C19.3616 12.9 19.3981 13.1838 19.362 13.4631C19.3258 13.7425 19.2182 14.0081 19.0482 14.2356C18.8783 14.4632 18.6516 14.6455 18.3887 14.7697C18.1259 14.8939 17.8356 14.9559 17.5432 14.9506C17.1932 14.9431 16.8444 14.8881 16.5057 14.7869L16.5 12.7Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <h4 className="contact-info-title">Phone Number</h4>
                    <p className="contact-info-detail">
                      0906 182 3111, 0912 211 0950
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-circle">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path
                        d="M1.5 0.5H16.5C17.3284 0.5 18 1.17157 18 2V12C18 12.8284 17.3284 13.5 16.5 13.5H1.5C0.671573 13.5 0 12.8284 0 12V2C0 1.17157 0.671573 0.5 1.5 0.5Z"
                        fill="white"
                      />
                      <path
                        d="M16.5 2L9 7.75L1.5 2"
                        stroke="#063A47"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <h4 className="contact-info-title">E-Mail</h4>
                    <p className="contact-info-detail">info@thedistillery.ng</p>
                  </div>
                </div>
              </div>

              <div className="contact-social-section">
                <h4 className="contact-social-title">Follow Us:</h4>
                <div className="contact-social-icons">
                  <a href="#" className="contact-social-icon">
                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                      <path
                        d="M6.5 6V4C6.5 3.17157 7.17157 2.5 8 2.5H9V0H6.5C4.84315 0 3.5 1.34315 3.5 3V6H1V9H3.5V18H6.5V9H9L10 6H6.5Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a href="#" className="contact-social-icon">
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none">
                      <path
                        d="M19.5 2C18.8 2.3 18.1 2.5 17.3 2.6C18.1 2.1 18.7 1.4 19 0.5C18.3 0.9 17.5 1.2 16.6 1.4C15.9 0.6 14.9 0.1 13.8 0.1C11.5 0.1 9.7 2 9.7 4.3C9.7 4.6 9.7 4.9 9.8 5.2C6.4 5 3.4 3.4 1.4 0.9C1 1.5 0.8 2.1 0.8 2.9C0.8 4.3 1.5 5.5 2.6 6.2C2 6.2 1.4 6 0.9 5.7C0.9 5.7 0.9 5.7 0.9 5.7C0.9 7.7 2.3 9.4 4.1 9.8C3.8 9.9 3.4 9.9 3 9.9C2.7 9.9 2.5 9.9 2.2 9.8C2.7 11.5 4.2 12.7 6 12.7C4.6 13.8 2.9 14.5 1 14.5C0.7 14.5 0.3 14.5 0 14.4C1.8 15.6 4 16.3 6.3 16.3C13.8 16.3 17.9 10 17.9 4.8C17.9 4.6 17.9 4.4 17.9 4.2C18.6 3.7 19.3 3 19.8 2.2L19.5 2Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a href="#" className="contact-social-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="3.5" fill="white" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.5 0.5H12.5C15.5376 0.5 18 2.96243 18 6V12C18 15.0376 15.5376 17.5 12.5 17.5H5.5C2.46243 17.5 0 15.0376 0 12V6C0 2.96243 2.46243 0.5 5.5 0.5ZM12.5 2H5.5C3.29086 2 1.5 3.79086 1.5 6V12C1.5 14.2091 3.29086 16 5.5 16H12.5C14.7091 16 16.5 14.2091 16.5 12V6C16.5 3.79086 14.7091 2 12.5 2ZM9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5ZM14.25 5.25C14.9404 5.25 15.5 4.69036 15.5 4C15.5 3.30964 14.9404 2.75 14.25 2.75C13.5596 2.75 13 3.30964 13 4C13 4.69036 13.5596 5.25 14.25 5.25Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a href="#" className="contact-social-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM13.5 7.2C13.5 7.3 13.5 7.45 13.5 7.55C13.5 10.55 11.2 14 7.05 14C5.85 14 4.75 13.65 3.8 13.05C3.95 13.05 4.15 13.1 4.3 13.1C5.3 13.1 6.2 12.75 6.95 12.15C6 12.15 5.2 11.5 4.9 10.65C5.05 10.7 5.2 10.7 5.35 10.7C5.55 10.7 5.75 10.65 5.9 10.6C4.9 10.4 4.15 9.55 4.15 8.5V8.5C4.45 8.65 4.8 8.75 5.15 8.75C4.55 8.35 4.15 7.7 4.15 6.95C4.15 6.55 4.25 6.2 4.45 5.9C5.5 7.15 7.05 7.95 8.8 8.05C8.75 7.9 8.75 7.7 8.75 7.55C8.75 6.35 9.7 5.4 10.9 5.4C11.5 5.4 12.05 5.65 12.45 6.05C12.95 5.95 13.4 5.75 13.8 5.5C13.65 6.05 13.3 6.5 12.85 6.8C13.3 6.75 13.7 6.65 14.1 6.45C13.8 6.9 13.45 7.3 13.05 7.65C13.05 7.5 13.5 7.2 13.5 7.2Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-column">
              <div className="contact-form-card">
                <h3 className="contact-form-title">Send a Message</h3>
                <div className="contact-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-form-input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail address"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-form-input"
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-form-textarea"
                    rows="4"
                  />
                  <p className="contact-form-disclaimer">
                    By submitting, you agree that we may use your information to respond to your message. We respect your privacy and never share your details with third parties.
                  </p>
                  <button onClick={handleSubmit} className="contact-submit-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="contact-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7928.944219347529!2d3.245113339459294!3d6.461714584837916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b879f599bcb53%3A0xd95254294b4c6a52!2sThe%20Distillery.NG!5e0!3m2!1sen!2sng!4v1760709922166!5m2!1sen!2sng"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;