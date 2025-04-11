import React, { useState } from "react";
import { sendMessage } from "firebase/auth";
import { auth } from "./firebase";
import {Link, useNavigate } from "react-router-dom"; // Ensure this is imported
import "./Login.css";
const Contact = () => {
  const [formData, setFormData] = useState({

    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">
            <ul>
              <li><Link to="/Home" className="logo-link">FullStackAcademy</Link></li>
              <li><Link to="/Tutorial">Tutorials</Link></li>
              <li><Link to="#">Exercises</Link></li>
              <li><Link to="/LearnMore">Services</Link></li>
            </ul>
          </div>
        </div>
        <div className="auth-buttons">
          <input type="text" placeholder="Search" className="search-bar" aria-label="Search" />
          <button className="btn login"><Link to="/login">Login</Link></button>
          <button className="btn sign-up"><Link to="/signup">Sign Up</Link></button>
        </div>
      </header>

      <section className="hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us through the form below.</p>
      </section>

      <section className="content contact-form">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="4" required></textarea>

            <button type="submit" className="btn submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
        </div>
        <p>© 2025 FullStackAcademy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
