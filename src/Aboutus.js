import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Ensure you have a corresponding CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-left">
            <div className="logo">
              <ul>
                <li> <Link to="/Home" className="logo-link">FullStackAcademy</Link> {/* Ensure correct path */}</li>
                <li><a href="/Tutorial">Tutorials</a></li>
                <li><a href="#">Exercises</a></li>
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

export default AboutUs;
