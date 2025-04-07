
import "./signup";
import "./login";
import "./Home.css";
import "./LearnMorePage";
import "./Home";
import "./c";
import "./Tutorial";
import "./Contact";
import "./Aboutus";
import "./csharp";
import "./Python";
import "./Java";
import "./CSS";
import "./Javascript";
import "./PHP";
import "./Bootstrap";
import "./MySQL";
import "./DJango";
import "./HTML";
import "./JQuery";
import "./React";
import "./Node";
import "./C++";
import "./C.css";
import "./User";
import "./Exercise";
import "./App.css";
import "./firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./App.css";
import "./Home.css";
import React, { useEffect, useState, useRef } from 'react';
import "./ContactPage";
import "./AboutPage";
import "./profile";

const User = () => {
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
    <div className="user-wrapper">
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
          <div
            className="user-icon"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {userInitial}
          </div>

          {showDropdown && (
            <div className="dropdown-menu-modern">
              <a href="/profile" className="dropdown-item">👤 View Profile</a>
              <hr />
              <button className="dropdown-item logout" onClick={handleLogout}>🚪 Log out</button>
            </div>
          )}
        </div>
      </header>

      <section className="hero">
        <h1>Coding Languages</h1>
        <p className="tagline">welcome</p>
        <p className="description">
          Your go-to platform for learning, building, and mastering programming skills with resources, tutorials, and real-world projects.
        </p>
      </section>

      <section className="coding-languages">
        <h2>Coding Languages</h2>
        <p className="subtitle">
          Learn coding step-by-step, from basics to advanced, with practical projects and skills to solve real-world challenges.
        </p>

        <div className="language-grid">
          {[
            ["C", "c"],
            ["C++", "c++"],
            ["HTML", "html"],
            ["Python", "python"],
            ["Java", "java"],
            ["CSS", "css"],
            ["Javascript", "Javascript"],
            ["PHP", "php"],
            ["C#", "csharp"], 
            ["Bootstrap", "bootstrap"],
            ["jQuery", "jquery"],
            ["Django", "django"],
            ["MySQL", "mysql"],
            ["React", "react"],
            ["Node.js", "node"]
          ].map(([name, path], index) => (
            <a key={index} href={`/${path}`} className="language-card" data-name={name.toLowerCase()}>
              <div className="language-number">{index + 1}</div>
              <h3>{name}</h3>
              <p>Learn the fundamentals of {name} and master the language.</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/ContactPage">Contact Us</a>
          <a href="/AboutUsPage">About Us</a>
        </div>
        <p>© 2025 FullStackAcademy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default User;
