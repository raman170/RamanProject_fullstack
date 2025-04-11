
import { Link } from "react-router-dom";
import "./Home.css"; // Ensure you have a corresponding CSS file for styling
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

import "./Home.css";
import React, { useEffect, useState, useRef } from 'react';


const AboutUsPage = () => {
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
    <div className="about-us-container">
      {/* Navbar */}
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

      <div class="aboutus-container">
   
    <div class="aboutus-hero">
        <h1>About Us</h1>
        <p>We are committed to empowering learners with high-quality educational resources and hands-on coding tutorials.</p>
    </div>


    <div class="aboutus-box">
        <h2>Who We Are</h2>
        <p>We are a passionate team dedicated to making coding and technology education accessible to everyone. Our platform provides tutorials, projects, and a supportive community for learners of all levels.</p>
    </div>

    
    <div class="aboutus-box">
        <h2>Our Mission & Vision</h2>
        <p><strong>Mission:</strong> To make learning to code simple, engaging, and effective.</p>
        <p><strong>Vision:</strong> To build a global community where anyone can develop technical skills and create innovative solutions.</p>
    </div>

    
    
</div>
      

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="/Contact">Contact Us</Link>
          <Link to="/Home">Home</Link>
        </div>
        <p>© 2025 FullStackAcademy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
