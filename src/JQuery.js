import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const JQueryTutorial = () => {
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
    <div className="page-container">
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
      
      <div className="main-layout">
        <aside className="sidebar">
          <h2>jQuery Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Setup</a></li>
            <li><a href="#selectors">Selectors</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#effects">Effects</a></li>
            <li><a href="#html">DOM Manipulation</a></li>
            <li><a href="#css">CSS Methods</a></li>
            <li><a href="#ajax">AJAX</a></li>
            <li><a href="#chaining">Method Chaining</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
  <h2>Introduction to jQuery</h2>
  <p>jQuery is a fast, small, and feature-rich JavaScript library. It simplifies things like HTML document traversal, event handling, animation, and AJAX with an easy-to-use API that works across multiple browsers.</p>

  <h3>Why Use jQuery?</h3>
  <ul>
    <li><strong>Cross-browser compatibility:</strong> jQuery handles differences between browsers so developers can focus on writing functionality without worrying about the quirks of each browser.</li>
    <li><strong>Simplified Syntax:</strong> jQuery allows you to write less code to accomplish more, thanks to its concise syntax.</li>
    <li><strong>Ease of use:</strong> jQuery provides powerful methods for tasks like animations, DOM manipulations, and Ajax calls, which would otherwise require complex JavaScript code.</li>
    <li><strong>Rich API:</strong> jQuery’s API covers everything from event handling, DOM manipulation, animation, and AJAX to handling CSS, text, and HTML.</li>
  </ul>

  <h3>Real-World Uses of jQuery</h3>
  <ul>
    <li><strong>Interactive Web Pages:</strong> jQuery is often used to enhance the user experience with dynamic content updates and animations.</li>
    <li><strong>Handling User Inputs:</strong> It's commonly used to validate forms, manage events (e.g., button clicks), and handle user interactions smoothly.</li>
    <li><strong>AJAX Requests:</strong> jQuery simplifies AJAX, making it easy to fetch data from a server and update the page without reloading.</li>
    <li><strong>Animations:</strong> You can use jQuery to create sliding menus, fade effects, and other interactive animations easily.</li>
  </ul>
</section>


<section id="setup">
  <h2>Setting Up jQuery</h2>
  <p>To start using jQuery in your project, you need to include the jQuery library. You can either download it or link to a Content Delivery Network (CDN). The easiest way to include it in your project is by using a CDN.</p>
  
  <h3>Using a CDN</h3>
  <p>Here’s how to include jQuery using a CDN:</p>
  <pre>{`<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>`}</pre>
  <p>Include this <code>&lt;script&gt;</code> tag just before the closing <code>&lt;/body&gt;</code> tag to ensure jQuery loads after the page content.</p>

  <h3>Downloading jQuery</h3>
  <p>If you prefer to host jQuery locally, you can download it from the official jQuery website:</p>
  <ul>
    <li>Visit <a href="https://jquery.com/download/">jquery.com/download</a> and download the latest version.</li>
    <li>Save the file in your project directory and reference it with a <code>&lt;script&gt;</code> tag:</li>
  </ul>
  <pre>{`<script src="path/to/jquery-3.6.0.min.js"></script>`}</pre>
</section>


<section id="selectors">
  <h2>jQuery Selectors</h2>
  <p>jQuery selectors are used to select elements on your page, just like CSS selectors. jQuery makes it easier to manipulate these elements with just a few lines of code.</p>

  <h3>Basic Selectors</h3>
  <p>Here are some of the most commonly used jQuery selectors:</p>
  <ul>
    <li><code>$("element")</code>: Selects all elements of the given type (e.g., <code>p</code>, <code>div</code>, etc.).</li>
    <li><code>$("#id")</code>: Selects an element by its <code>id</code> attribute.</li>
    <li><code>$(".class")</code>: Selects all elements with a specific class.</li>
    <li><code>$("*")</code>: Selects all elements on the page.</li>
  </ul>

  <h3>Attribute Selectors</h3>
  <p>jQuery also allows you to select elements by attributes:</p>
  <ul>
  <li><code>$("[type='text']")</code>: Selects all <code>&lt;input&gt;</code> elements with <code>type="text"</code>.</li>
    <li><code>$("[href^='https']")</code>: Selects all links that start with <code>https</code>.</li>
  </ul>

  <pre>{`$("p").css("color", "blue"); // Change all <p> elements text color to blue`}</pre>
</section>


<section id="events">
  <h2>Event Handling in jQuery</h2>
  <p>Event handling in jQuery makes it easier to work with user interactions like clicks, mouse movements, or form submissions. jQuery provides a unified way of handling events across browsers.</p>

  <h3>Common Event Methods</h3>
  <ul>
    <li><code>.click()</code>: Triggers when an element is clicked.</li>
    <li><code>.dblclick()</code>: Triggers when an element is double-clicked.</li>
    <li><code>.hover()</code>: Triggers when the mouse pointer enters or leaves an element.</li>
    <li><code>.keydown()</code>: Triggers when a key is pressed down in an input field.</li>
    <li><code>.submit()</code>: Triggers when a form is submitted.</li>
  </ul>

  <h3>Example: Button Click Event</h3>
  <pre>{`$("button").click(function() {
  alert("Button clicked!");
});`}</pre>
  <p>This example shows how to bind a function to a button click. When the button is clicked, the function triggers an alert with a message.</p>
</section>


<section id="effects">
  <h2>jQuery Effects</h2>
  <p>jQuery provides built-in methods for animating elements, making it easy to add visual effects like fades, slides, and custom animations.</p>

  <h3>Common Effects</h3>
  <ul>
    <li><code>.hide()</code>: Hides the selected element.</li>
    <li><code>.show()</code>: Shows a hidden element.</li>
    <li><code>.fadeIn()</code>: Gradually changes the opacity of an element to 100%.</li>
    <li><code>.fadeOut()</code>: Gradually changes the opacity of an element to 0%.</li>
    <li><code>.slideUp()</code>: Slides an element up (hides it).</li>
    <li><code>.slideDown()</code>: Slides an element down (shows it).</li>
  </ul>

  <h3>Example: Fade In</h3>
  <pre>{`$("div").fadeIn();  // Fades in a hidden <div>`}</pre>
  <h3>Example: Slide Up</h3>
  <pre>{`$("div").slideUp();  // Slides up and hides the <div>`}</pre>
</section>


<section id="html">
  <h2>DOM Manipulation with jQuery</h2>
  <p>jQuery simplifies manipulating the DOM. You can easily change HTML content, set element attributes, and add new elements to the page.</p>

  <h3>Manipulating HTML</h3>
  <ul>
    <li><code>.html()</code>: Get or set the HTML content of an element.</li>
    <li><code>.text()</code>: Get or set the text content of an element.</li>
  </ul>

  <pre>{`$("#box").html("<b>Updated</b>");  // Sets the inner HTML of the #box element`}</pre>
  <pre>{`$("#box").text("Just text");  // Sets the inner text of the #box element`}</pre>

  <h3>Manipulating Attributes</h3>
  <ul>
    <li><code>.attr()</code>: Get or set an attribute's value.</li>
  </ul>

  <pre>{`$("#img").attr("src", "new-image.jpg");  // Changes the src attribute of the #img element`}</pre>
</section>


<section id="css">
  <h2>CSS Manipulation in jQuery</h2>
  <p>jQuery makes it easy to manipulate the CSS of elements dynamically. You can change styles directly, add/remove classes, and more.</p>

  <h3>Common CSS Methods</h3>
  <ul>
    <li><code>.css()</code>: Get or set the CSS property of an element.</li>
    <li><code>.addClass()</code>: Add a class to an element.</li>
    <li><code>.removeClass()</code>: Remove a class from an element.</li>
    <li><code>.toggleClass()</code>: Toggle a class on or off.</li>
  </ul>

  <h3>Example: Change Color</h3>
  <pre>{`$("p").css("color", "blue");  // Changes text color of <p> elements to blue`}</pre>
</section>


<section id="ajax">
  <h2>AJAX with jQuery</h2>
  <p>AJAX allows you to send and receive data from a server asynchronously, without refreshing the whole page. jQuery simplifies AJAX requests with methods like <code>$.ajax()</code>, <code>$.get()</code>, and <code>$.post()</code>.</p>

  <h3>Basic AJAX Request</h3>
  <pre>{`$.get("/data", function(response) {
  console.log(response);
});`}</pre>
  <p>This example sends a GET request to the server and logs the response to the console.</p>

  <h3>AJAX POST Request</h3>
  <pre>{`$.post("/submit", { name: "John", age: 30 }, function(response) {
  console.log(response);
});`}</pre>
</section>


<section id="chaining">
  <h2>Method Chaining in jQuery</h2>
  <p>Method chaining allows you to call multiple jQuery methods on the same element in a single line of code. It helps make code more concise and readable.</p>

  <pre>{`$("div")
  .css("color", "red")
  .slideUp(2000)
  .slideDown(2000);`}</pre>
  <p>This example changes the color of a <code>&lt;div&gt;</code> to red, slides it up, and then slides it back down—all in one chain of commands.</p>
</section>


</main>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/Contact">Contact Us</Link>
          <Link to="/AboutUs">About Us</Link>
        </div>
        <p>© 2025 FullStackAcademy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JQueryTutorial;
