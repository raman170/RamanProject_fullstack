

import {Link, useNavigate } from "react-router-dom"; // Ensure this is imported

import { auth } from "./firebase";
import "./App.css";
import "./Home.css";
import React, { useEffect, useState, useRef } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [query, setQuery] = useState("");
    
      const handleSearch = () => {
        const cards = document.querySelectorAll(".language-card");
        let matchFound = false;
    
        cards.forEach((card) => {
          const name = card.getAttribute("data-name").toLowerCase();
          if (name.includes(query.toLowerCase().trim()) && query !== "") {
            card.style.border = "3px solid #1976d2";
            card.style.backgroundColor = "#bbdefb";
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            matchFound = true;
          } else {
            card.style.border = "";
            card.style.backgroundColor = "#e3f2fd";
          }
        });
    
        if (!matchFound && query !== "") {
          alert("No matching language found.");
        }
      };

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
const navigate = useNavigate();
    const [state1, setState1] = useState();
    const [state2, setState2] = useState();
    const ref = useRef();
  
    const [userInitial, setUserInitial] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() =>   {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            const name = user.displayName || user.email;
            setUserInitial(name.charAt(0).toUpperCase());
          } else {
            navigate('/login');
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);
    
      // Close dropdown if clicked outside
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
    
      const handleLogout = () => {
        auth.signOut().then(() => navigate('/Home'));
      };
    
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="nav-left">
          <ul className="logo">
            <li><a href="/User" className="logo-link">FullStackAcademy</a></li>
            <li><a href="/tutorial">Tutorials</a></li>
            <li><a href="/exercise">Exercises</a></li>
            <li><a href="/LearnMorePage">Services</a></li>
          </ul>
        </div>

        <div className="auth-buttons" ref={dropdownRef}>
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="search-bar"
            aria-label="Search"
          />
          <button onClick={handleSearch} className="btn search-btn">Search</button>
          <div
            className="user-icon"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {userInitial}
          </div>

          {showDropdown && (
            <div className="dropdown-menu-modern">
              <hr />
              <button className="dropdown-item logout" onClick={handleLogout}>🚪 Log out</button>
            </div>
          )}
        </div>
      </header>

      <section className="hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us through the form below.</p>
      </section>

      <section className="content contact-form">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />

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

export default ContactPage;
