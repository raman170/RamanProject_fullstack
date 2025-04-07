
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./signup";
import "./login";
import "./LearnMore";
import "./Home";
import "./c";
import "./Tutorial";
import "./Exercise";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./Home.css";
import React, { useEffect, useState, useRef } from 'react';


const Tutorial = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  const dropdownRef = useRef();

  useEffect(() => {
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
    auth.signOut().then(() => navigate('/home'));
  };

  return (
    <div className="home-container">
      {/* Navbar Section */}
      <header className="navbar">
        <div className="nav-left">
          <ul className="logo">
            <li><a href="/User" className="logo-link">FullStackAcademy</a></li>
            <li><a href="/tutorial">Tutorials</a></li>
            <li><a href="/exercise">Exercises</a></li>
            <li><a href="/learnMorePage">Services</a></li>
          </ul>
        </div>

        <div className="auth-buttons" ref={dropdownRef}>
          <div
            className="user-icon"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {userInitial}
          </div>

          {showDropdown && (
            <div className="dropdown-menu-modern">
              <a href="/profile" className="dropdown-item">👤 View Profile</a>
              <a href="/process" className="dropdown-item">📄 Overall Process</a>
              <hr />
              <button className="dropdown-item logout" onClick={handleLogout}>🚪 Log out</button>
            </div>
          )}
        </div>
      </header>


      {/* Hero Section */}
      <section className="hero">
        <h1>Tutorial</h1>  
          
      </section>

      {/* tutorial Section */}
      <section className="tutorials">
      <ul className="tutorial-list">
  {[
    ["HTML", "html"],
    ["CSS", "css"],
    ["JavaScript", "javascript"],
    ["C", "c"],
    ["C++", "c++"],
    ["Python", "python"],
    ["Java", "java"],
    ["PHP", "php"],
    ["C#", "csharp"],
    ["Bootstrap", "bootstrap"],
    ["jQuery", "jquery"],
    ["Django", "django"],
    ["MySQL", "mysql"],
    ["React", "react"],
    ["Node.js", "node"]
  ].map(([name, path], index) => (
    <li key={index}>
      Learn <strong>{name}</strong>{' '}
      <Link to={`/${path}`} className="tutorial-link">Tutorial</Link>
    </li>
  ))}
</ul>

      </section>

      

      {/* Footer */}
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

export default Tutorial;
