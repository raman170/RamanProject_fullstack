
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import "./Login.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: "ramandeepkaur860220@gmail.com",
        message: formData.message,
        timestamp: new Date()
      });

      await emailjs.send(
        "service_0o9zakq",
        "template_ibu0kyn",
        {
          name: formData.name,
          message: formData.message,
          email: "ramandeepkaur860220@gmail.com"
        },
        "Wgc3qFIZJjMQrrkbM"
      );

      setResponseMessage("Message submitted and email sent to admin.");
      setFormData({ name: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
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
        <p>We'd love to hear from you! Just leave your name and message below.</p>
      </section>

      <section className="content contact-form">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
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
