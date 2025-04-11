
import "./signup";
import "./login";

import "./Home";
import "./c";
import "./Tutorial";
import "./Contact";
import "./Aboutus";

import "./User";
import "./Exercise";


import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./App.css";
import "./Home.css";
import React, { useEffect, useState, useRef } from 'react';


function LearnMorePage() {
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
    <div className="learn-more-container">
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
      

      <section className="hero-learn">
        <h1>Services</h1>
        <p className="tagline-learn">Explore our platform's features and offerings.</p>
      </section>

      <section className="content-learn">
        <h2>What We Offer</h2>
        <p>
          FullStackAcademy is your go-to platform for learning, building, and mastering programming skills.
          We provide a wide range of **tutorials, exercises, resources, and real-world projects** to enhance your coding knowledge.
        </p>

        <div className="feature-grid-learn">
          <div className="feature-card-learn">
            <h3>Tutorials</h3>
            <p>Step-by-step tutorials covering various programming languages and frameworks.</p>
          </div>

          <div className="feature-card-learn">
            <h3>Exercises</h3>
            <p>Practice coding problems to strengthen your programming skills.</p>
          </div>

          <div className="feature-card-learn">
            <h3>Resources</h3>
            <p>Access useful guides, cheat sheets, and industry best practices.</p>
          </div>
           
          <div className="feature-card-learn">
            <h3>Coding Languages</h3>
            <p>Learn different programming languages like Python, JavaScript, Java, C++, and more.</p>
          </div>

          <div className="feature-card-learn">
            <h3>Sign-up for Updates</h3>
            <p>Get notified about new courses, workshops, and coding challenges.</p>
          </div>

          <div className="feature-card-learn">
            <h3>YouTube Channel</h3>
            <p>Watch step-by-step coding tutorials on our YouTube channel.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
        </div>
        <p>© 2025 FullStackAcademy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LearnMorePage;
