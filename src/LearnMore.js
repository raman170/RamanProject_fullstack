import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Home.css";
import "./Home";
import "./Exercise";
import "./Tutorial";
import "./LearnMore";

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      {/* Navbar Section */}
            <header className="navbar">
        {/* Left Side - Logo and Navigation */}
        <div className="nav-left">
          <div className="logo">
            <ul>
              <li> <Link to="/Home" className="logo-link">FullStackAcademy</Link> {/* Ensure correct path */}</li>
              <li><a href="/Tutorial">Tutorials</a></li>
              <li><a href="/Exercise">Exercises</a></li>
              <li><a href="./LearnMore">Services</a></li>
            </ul>
         </div>
        </div>
      
        {/* Right Side - Search and Buttons */}
        <div className="auth-buttons">
          <input type="text" placeholder="Search" className="search-bar" aria-label="Search" />
          <button className="btn login"><a href="/login">Login </a></button>
          <button className="btn sign-up"><a href="/signup">Sign Up </a></button>
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

export default LearnMore;
