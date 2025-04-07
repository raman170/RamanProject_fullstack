
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./signup";
import "./login";
import "./Home.css";
import "./LearnMore";
import "./Home";
import "./Tutorial";
import "./Contact";
import "./Aboutus";
import "./User";
import "./Exercise";
import React, { useState} from 'react';


const Home = () => {
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

  const languages = [
    "C", "C++", "HTML", "Python", "Java", "CSS",
    "JavaScript", "PHP", "C#", "Bootstrap", "jQuery",
    "Django", "MySQL", "React", "Node.js"
  ];

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="nav-left">
          <ul className="logo">
            <li><Link to="/Home" className="logo-link">FullStackAcademy</Link></li>
            <li><Link to="/Login">Tutorials</Link></li>
            <li><Link to="/Login">Exercises</Link></li>
            <li><Link to="/LearnMore">Services</Link></li>
          </ul>
        </div>
        <div className="auth-buttons">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="search-bar"
            aria-label="Search"
          />
          <button onClick={handleSearch} className="btn search-btn">Search</button>
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/signup" className="btn sign-up">Sign Up</Link>
        </div>
      </header>

      <section className="hero">
        <h1>Coding Languages</h1>
        <p className="tagline">"Code. Create. Conquer."</p>
        <div className="buttons">
          <Link to="/signup" className="btn register">REGISTER</Link>
          <Link to="/learnmore" className="btn learn-more">LEARN MORE</Link>
        </div>
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
          {languages.map((lang, index) => (
            <Link to="/login" key={lang} className="language-card" data-name={lang.toLowerCase()}>
              <div className="language-number">{index + 1}</div>
              <h3>{lang}</h3>
              <p>Learn the fundamentals of {lang} and master the language.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="sign-up-section">
        <h2>Sign up Here</h2>
        <form className="sign-up-form" action="/signup">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="btn sign-up-btn">Sign Up</button>
        </form>
      </section>

      <section className="youtube-section">
        <h2>YouTube Channel</h2>
        <div className="youtube-logo-container">
          <a href="https://www.youtube.com/@w3schools" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
              alt="YouTube Logo"
              className="youtube-logo"
            />
          </a>
          <p className="youtube-website-name">W3Schools</p>
        </div>
        <p className="youtube-description">
          Join our coding tutorials on YouTube, where we explain coding concepts step by step.
          <a href="https://www.youtube.com/@w3schools" target="_blank" rel="noopener noreferrer">Subscribe here</a>
          for the latest programming tutorials and updates.
        </p>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/contact">Contact Us</Link>
          <Link to="/aboutus">About Us</Link>
        </div>
        <p>© 2025 FullStackAcademy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;