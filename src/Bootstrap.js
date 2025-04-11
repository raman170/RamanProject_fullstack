import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const BootstrapTutorial = () => {
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
          <h2>Bootstrap Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Setup</a></li>
            <li><a href="#grid">Grid System</a></li>
            <li><a href="#typography">Typography</a></li>
            <li><a href="#colors">Colors</a></li>
            <li><a href="#tables">Tables</a></li>
            <li><a href="#forms">Forms</a></li>
            <li><a href="#buttons">Buttons</a></li>
            <li><a href="#images">Images</a></li>
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#cards">Cards</a></li>
            <li><a href="#navbar">Navbar</a></li>
            <li><a href="#modal">Modals</a></li>
            <li><a href="#collapse">Collapse</a></li>
            <li><a href="#carousel">Carousel</a></li>
            <li><a href="#utilities">Utility Classes</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
        <section id="intro">
  <h2>Introduction to Bootstrap</h2>
  <p>
    Bootstrap is a powerful, open-source front-end framework developed by Twitter. It enables developers to quickly design and customize responsive mobile-first websites using pre-defined HTML, CSS, and JavaScript components.
  </p>
  <p>
    First released in 2011, Bootstrap has become one of the most popular CSS frameworks due to its simplicity, flexibility, and responsive grid system. It helps developers build consistent user interfaces with minimal effort and ensures that web pages look great on all devices, from phones to desktops.
  </p>
  <h3>Why Use Bootstrap?</h3>
  <ul>
    <li><strong>Responsive Design:</strong> Built-in mobile-first approach with flexible grid layout.</li>
    <li><strong>Pre-designed Components:</strong> Includes buttons, forms, navbars, modals, and more.</li>
    <li><strong>Cross-browser Compatibility:</strong> Works seamlessly on all major browsers.</li>
    <li><strong>Customizable:</strong> Easily override styles or use Bootstrap’s utility classes.</li>
    <li><strong>Extensive Documentation:</strong> Well-documented with examples and explanations.</li>
  </ul>
  <p>
    Whether you're building a simple landing page or a full-fledged application, Bootstrap streamlines your development process and allows for consistent, clean design.
  </p>
</section>

        <section id="setup">
  <h2>Setting Up Bootstrap</h2>
  <p>
    You can set up Bootstrap in your project in multiple ways. The most common methods include using a CDN or downloading the files locally.
  </p>

  <h3>1. Using Bootstrap via CDN (Recommended for Beginners)</h3>
  <p>
    Simply add the following links to your HTML file’s <code>&lt;head&gt;</code> and before the closing <code>&lt;/body&gt;</code> tag:
  </p>
  <pre>
    <code>
&lt;!-- Bootstrap CSS --&gt;
&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"&gt;

&lt;!-- Bootstrap JS (with Popper) --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;
    </code>
  </pre>

  <h3>2. Installing with npm (For React or Angular Projects)</h3>
  <pre>
    <code>
npm install bootstrap
    </code>
  </pre>
  <p>
    Then import it in your main JS file:
  </p>
  <pre>
    <code>
import 'bootstrap/dist/css/bootstrap.min.css';
    </code>
  </pre>

  <h3>3. Downloading Bootstrap Locally</h3>
  <p>
    You can download the compiled CSS and JS files from the official Bootstrap website and include them locally in your project:
  </p>
  <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">https://getbootstrap.com</a>

  <h3>4. Bootstrap Starter Template</h3>
  <pre>
    <code>
&lt;!doctype html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"&gt;
    &lt;title&gt;Bootstrap Example&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1 class="text-center"&gt;Hello, Bootstrap!&lt;/h1&gt;

    &lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
    </code>
  </pre>
</section>

<section id="grid">
  <h2>Bootstrap Grid System</h2>
  <p>
    The grid system is the heart of Bootstrap’s layout design. It uses a series of containers, rows, and columns to layout and align content responsively.
  </p>

  <h3>Key Concepts</h3>
  <ul>
    <li><strong>Container:</strong> The root element to hold rows and columns.</li>
    <li><strong>Row:</strong> Wrapper for columns, used to align them horizontally.</li>
    <li><strong>Column:</strong> Divides space in a row; uses classes like <code>.col-*</code> to control width.</li>
    <li><strong>12-column layout:</strong> Each row is divided into 12 units.</li>
  </ul>

  <h3>Basic Grid Example</h3>
  <pre>
    <code>
&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-4"&gt;Column 1&lt;/div&gt;
    &lt;div class="col-4"&gt;Column 2&lt;/div&gt;
    &lt;div class="col-4"&gt;Column 3&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
    </code>
  </pre>

  <h3>Responsive Breakpoints</h3>
  <ul>
    <li><code>.col-sm-*</code> – ≥576px</li>
    <li><code>.col-md-*</code> – ≥768px</li>
    <li><code>.col-lg-*</code> – ≥992px</li>
    <li><code>.col-xl-*</code> – ≥1200px</li>
    <li><code>.col-xxl-*</code> – ≥1400px</li>
  </ul>

  <h3>Auto Layout</h3>
  <p>
    Columns without a specified number will automatically share the row:
  </p>
  <pre>
    <code>
&lt;div class="row"&gt;
  &lt;div class="col"&gt;One&lt;/div&gt;
  &lt;div class="col"&gt;Two&lt;/div&gt;
&lt;/div&gt;
    </code>
  </pre>

  <h3>Nesting Columns</h3>
  <p>You can nest rows inside columns for complex layouts:</p>
  <pre>
    <code>
&lt;div class="col-6"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-6"&gt;Nested 1&lt;/div&gt;
    &lt;div class="col-6"&gt;Nested 2&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
    </code>
  </pre>
</section>


<section id="typography">
  <h2>Bootstrap Typography</h2>
  <p>
    Typography in Bootstrap helps you create beautiful, readable, and responsive text content. Bootstrap includes styles for headings, paragraphs, lists, blockquotes, and more.
  </p>

  <h3>Headings</h3>
  <p>Use standard HTML heading tags:</p>
  <pre>
    <code>
&lt;h1&gt;h1. Bootstrap heading&lt;/h1&gt;
&lt;h2&gt;h2. Bootstrap heading&lt;/h2&gt;
&lt;h3&gt;h3. Bootstrap heading&lt;/h3&gt;
...
    </code>
  </pre>
  <p>Bootstrap also provides the <code>.h1</code> through <code>.h6</code> classes for inline headings.</p>

  <h3>Display Headings</h3>
  <p>Use <code>.display-1</code> to <code>.display-6</code> for larger headings:</p>
  <pre>
    <code>
&lt;h1 class="display-1"&gt;Display 1&lt;/h1&gt;
&lt;h1 class="display-4"&gt;Display 4&lt;/h1&gt;
    </code>
  </pre>

  <h3>Lead Paragraph</h3>
  <pre>
    <code>
&lt;p class="lead"&gt;
  This is a lead paragraph that stands out.
&lt;/p&gt;
    </code>
  </pre>

  <h3>Text Utilities</h3>
  <ul>
    <li><code>.text-start</code>, <code>.text-center</code>, <code>.text-end</code> – Align text</li>
    <li><code>.text-lowercase</code>, <code>.text-uppercase</code>, <code>.text-capitalize</code> – Transform text</li>
    <li><code>.fw-bold</code>, <code>.fw-light</code>, <code>.fst-italic</code> – Font weight and style</li>
    <li><code>.text-muted</code> – Light gray text</li>
  </ul>

  <h3>Blockquotes</h3>
  <pre>
    <code>
&lt;blockquote class="blockquote"&gt;
  &lt;p&gt;This is a blockquote.&lt;/p&gt;
&lt;/blockquote&gt;
    </code>
  </pre>
</section>

<section id="colors">
  <h2>Bootstrap Colors</h2>
  <p>
    Bootstrap includes a robust color palette for text, backgrounds, borders, and UI elements. These colors are consistent and customizable.
  </p>

  <h3>Text Colors</h3>
  <ul>
    <li><code>.text-primary</code></li>
    <li><code>.text-secondary</code></li>
    <li><code>.text-success</code></li>
    <li><code>.text-danger</code></li>
    <li><code>.text-warning</code></li>
    <li><code>.text-info</code></li>
    <li><code>.text-light</code></li>
    <li><code>.text-dark</code></li>
    <li><code>.text-muted</code></li>
  </ul>

  <h3>Background Colors</h3>
  <ul>
    <li><code>.bg-primary</code></li>
    <li><code>.bg-secondary</code></li>
    <li><code>.bg-success</code></li>
    <li><code>.bg-danger</code></li>
    <li><code>.bg-warning</code></li>
    <li><code>.bg-info</code></li>
    <li><code>.bg-light</code></li>
    <li><code>.bg-dark</code></li>
    <li><code>.bg-white</code></li>
  </ul>

  <h3>Contextual Examples</h3>
  <pre>
    <code>
&lt;p class="text-danger"&gt;Error: Something went wrong!&lt;/p&gt;
&lt;div class="bg-success text-white p-3"&gt;Operation successful!&lt;/div&gt;
    </code>
  </pre>
</section>

<section id="tables">
  <h2>Bootstrap Tables</h2>
  <p>
    Bootstrap makes styling HTML tables easy with its <code>.table</code> class. You can also use contextual classes, borders, stripes, and more.
  </p>

  <h3>Basic Table</h3>
  <pre>
    <code>
&lt;table class="table"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;#&lt;/th&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Email&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;1&lt;/td&gt;
      &lt;td&gt;Alice&lt;/td&gt;
      &lt;td&gt;alice@example.com&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;2&lt;/td&gt;
      &lt;td&gt;Bob&lt;/td&gt;
      &lt;td&gt;bob@example.com&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
    </code>
  </pre>

  <h3>Table Variants</h3>
  <ul>
    <li><code>.table-striped</code> – Adds zebra-striping</li>
    <li><code>.table-bordered</code> – Adds borders to all cells</li>
    <li><code>.table-hover</code> – Highlights rows on hover</li>
    <li><code>.table-dark</code> – Dark theme</li>
    <li><code>.table-responsive</code> – Adds horizontal scrolling on small screens</li>
  </ul>

  <h3>Responsive Table</h3>
  <pre>
    <code>
&lt;div class="table-responsive"&gt;
  &lt;table class="table table-striped"&gt;
    ...
  &lt;/table&gt;
&lt;/div&gt;
    </code>
  </pre>
</section>

<section id="forms">
  <h2>Bootstrap Forms</h2>
  <p>
    Bootstrap makes creating stylish, responsive forms easy using utility classes and form-specific components. It supports different layouts, validation states, and input types.
  </p>

  <h3>Basic Form Example</h3>
  <pre>
    <code>
&lt;form&gt;
  &lt;div class="mb-3"&gt;
    &lt;label for="email" class="form-label"&gt;Email address&lt;/label&gt;
    &lt;input type="email" class="form-control" id="email" placeholder="name@example.com" /&gt;
  &lt;/div&gt;
  &lt;div class="mb-3"&gt;
    &lt;label for="message" class="form-label"&gt;Message&lt;/label&gt;
    &lt;textarea class="form-control" id="message" rows="3"&gt;&lt;/textarea&gt;
  &lt;/div&gt;
  &lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
    </code>
  </pre>

  <h3>Form Layouts</h3>
  <ul>
    <li><code>.form-control</code> – Applies Bootstrap styles to inputs</li>
    <li><code>.form-label</code> – Properly styles form labels</li>
    <li><code>.form-check</code> – For checkboxes and radio buttons</li>
    <li><code>.form-select</code> – For dropdown menus</li>
  </ul>

  <h3>Inline Forms</h3>
  <pre>
    <code>
&lt;form class="d-flex"&gt;
  &lt;input class="form-control me-2" type="search" placeholder="Search" /&gt;
  &lt;button class="btn btn-outline-success" type="submit"&gt;Search&lt;/button&gt;
&lt;/form&gt;
    </code>
  </pre>

  <h3>Form Validation</h3>
  <p>Use <code>.is-valid</code> and <code>.is-invalid</code> classes with feedback messages.</p>
</section>

<section id="buttons">
  <h2>Bootstrap Buttons</h2>
  <p>
    Buttons in Bootstrap are easy to implement and style. Use predefined classes to set colors, sizes, outlines, and states.
  </p>

  <h3>Basic Button</h3>
  <pre>
    <code>
&lt;button type="button" class="btn btn-primary"&gt;Primary&lt;/button&gt;
&lt;button type="button" class="btn btn-secondary"&gt;Secondary&lt;/button&gt;
    </code>
  </pre>

  <h3>Button Variants</h3>
  <ul>
    <li><code>btn-primary</code></li>
    <li><code>btn-secondary</code></li>
    <li><code>btn-success</code></li>
    <li><code>btn-danger</code></li>
    <li><code>btn-warning</code></li>
    <li><code>btn-info</code></li>
    <li><code>btn-light</code></li>
    <li><code>btn-dark</code></li>
    <li><code>btn-link</code></li>
  </ul>

  <h3>Outline Buttons</h3>
  <pre>
    <code>
&lt;button class="btn btn-outline-success"&gt;Outline Success&lt;/button&gt;
    </code>
  </pre>

  <h3>Button Sizes</h3>
  <pre>
    <code>
&lt;button class="btn btn-primary btn-lg"&gt;Large&lt;/button&gt;
&lt;button class="btn btn-primary btn-sm"&gt;Small&lt;/button&gt;
    </code>
  </pre>

  <h3>Disabled Button</h3>
  <pre>
    <code>
&lt;button class="btn btn-primary" disabled&gt;Disabled&lt;/button&gt;
    </code>
  </pre>
</section>

<section id="images">
  <h2>Bootstrap Images</h2>
  <p>
    Bootstrap provides helpful classes for working with images responsively and stylishly.
  </p>

  <h3>Responsive Images</h3>
  <p>
    Use <code>.img-fluid</code> to make images scale with the parent element.
  </p>
  <pre>
    <code>
&lt;img src="example.jpg" class="img-fluid" alt="Responsive image" /&gt;
    </code>
  </pre>

  <h3>Image Shapes</h3>
  <ul>
    <li><code>.rounded</code> – Slightly rounded corners</li>
    <li><code>.rounded-circle</code> – Circular image</li>
    <li><code>.img-thumbnail</code> – Adds a border and padding</li>
  </ul>
  <pre>
    <code>
&lt;img src="avatar.jpg" class="rounded-circle" alt="Avatar" /&gt;
    </code>
  </pre>

  <h3>Aligning Images</h3>
  <ul>
    <li><code>.float-start</code> / <code>.float-end</code></li>
    <li><code>.mx-auto d-block</code> – Center an image</li>
  </ul>
    <h3>Best Practices</h3>
  <ul>
    <li>Always use the <code>alt</code> attribute for accessibility.</li>
    <li>Use modern formats (WebP) for better performance.</li>
    <li>Set fixed dimensions if layout shifting is an issue.</li>
  </ul></section>

<section id="alerts">
  <h2>Bootstrap Alerts</h2>
  <p>
    Alerts in Bootstrap are used to display feedback messages for user actions, such as success messages, warnings, errors, or general information.
  </p>

  <h3>Basic Alert</h3>
  <pre>
    <code>
&lt;div class="alert alert-success" role="alert"&gt;
  Your form has been submitted successfully!
&lt;/div&gt;
    </code>
  </pre>

  <h3>Alert Variants</h3>
  <ul>
    <li><code>alert-primary</code></li>
    <li><code>alert-secondary</code></li>
    <li><code>alert-success</code></li>
    <li><code>alert-danger</code></li>
    <li><code>alert-warning</code></li>
    <li><code>alert-info</code></li>
    <li><code>alert-light</code></li>
    <li><code>alert-dark</code></li>
  </ul>
  <h3>Dismissible Alerts</h3>
  <p>Add a close button using <code>.alert-dismissible</code> and <code>data-bs-dismiss="alert"</code>.</p>
  <pre>
    <code>
&lt;div class="alert alert-warning alert-dismissible fade show" role="alert"&gt;
  Warning! Please double-check your input.
  &lt;button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"&gt;&lt;/button&gt;
&lt;/div&gt;
    </code>
  </pre>
</section>
<section id="cards">
  <h2>Bootstrap Cards</h2>
  <p>
    Cards are flexible and extensible content containers. They include options for headers, footers, images, and various content alignment settings.
  </p>

  <h3>Basic Card</h3>
  <pre>
    <code>
&lt;div class="card" style="width: 18rem;"&gt;
  &lt;img src="image.jpg" class="card-img-top" alt="..." /&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;Card Title&lt;/h5&gt;
    &lt;p class="card-text"&gt;Some quick text to build the card content.&lt;/p&gt;
    &lt;a href="#" class="btn btn-primary"&gt;Go somewhere&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
    </code>
  </pre>

  <h3>Card Header & Footer</h3>
  <pre>
    <code>
&lt;div class="card"&gt;
  &lt;div class="card-header"&gt;Featured&lt;/div&gt;
  &lt;div class="card-body"&gt;Main content here&lt;/div&gt;
  &lt;div class="card-footer text-muted"&gt;2 days ago&lt;/div&gt;
&lt;/div&gt;
    </code>
  </pre>

  <h3>Card Layouts</h3>
  <ul>
    <li><code>.card-deck</code> (Bootstrap 4) or <code>.row .col</code> layout (Bootstrap 5)</li>
    <li>Use <code>.card-group</code> for grouped cards</li>
    <li>Cards can also be horizontal with <code>.d-flex</code></li>
  </ul>
</section>

<section id="navbar">
  <h2>Bootstrap Navbar</h2>
  <p>
    The navbar component is used to create navigation headers. It supports branding, links, dropdowns, and can be fixed or collapsible.
  </p>

  <h3>Basic Navbar</h3>
  <pre>
    <code>
&lt;nav class="navbar navbar-expand-lg navbar-light bg-light"&gt;
  &lt;div class="container-fluid"&gt;
    &lt;a class="navbar-brand" href="#"&gt;Brand&lt;/a&gt;
    &lt;button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"&gt;
      &lt;span class="navbar-toggler-icon"&gt;&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="collapse navbar-collapse" id="navbarNav"&gt;
      &lt;ul class="navbar-nav"&gt;
        &lt;li class="nav-item"&gt;
          &lt;a class="nav-link active" href="#"&gt;Home&lt;/a&gt;
        &lt;/li&gt;
        &lt;li class="nav-item"&gt;
          &lt;a class="nav-link" href="#"&gt;Features&lt;/a&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/nav&gt;
    </code>
  </pre>

  <h3>Color Schemes</h3>
  <ul>
    <li><code>.navbar-light bg-light</code></li>
    <li><code>.navbar-dark bg-dark</code></li>
    <li><code>.bg-primary</code>, <code>.bg-success</code>, etc. for themed backgrounds</li>
  </ul>

  <h3>Fixed and Sticky Navbars</h3>
  <ul>
    <li><code>.fixed-top</code> – Fixes the navbar to the top</li>
    <li><code>.fixed-bottom</code> – Fixes the navbar to the bottom</li>
    <li><code>.sticky-top</code> – Sticks the navbar on scroll</li>
  </ul>
</section>

<section id="modals">
  <h2>Bootstrap Modals</h2>
  <p>
    Modals are dialog boxes or pop-ups used to display content over the current page. Bootstrap provides a flexible modal component with built-in styles and JavaScript behavior.
  </p>

  <h3>Basic Modal Structure</h3>
  <pre>
    <code>
&lt;!-- Button to trigger modal --&gt;
&lt;button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"&gt;
  Launch Modal
&lt;/button&gt;

&lt;!-- Modal --&gt;
&lt;div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true"&gt;
  &lt;div class="modal-dialog"&gt;
    &lt;div class="modal-content"&gt;
      &lt;div class="modal-header"&gt;
        &lt;h5 class="modal-title" id="modalLabel"&gt;Modal Title&lt;/h5&gt;
        &lt;button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="modal-body"&gt;
        This is a Bootstrap modal!
      &lt;/div&gt;
      &lt;div class="modal-footer"&gt;
        &lt;button type="button" class="btn btn-secondary" data-bs-dismiss="modal"&gt;Close&lt;/button&gt;
        &lt;button type="button" class="btn btn-primary"&gt;Save changes&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
    </code>
  </pre>

  <h3>Modal Options</h3>
  <ul>
    <li><code>fade</code>: Adds animation</li>
    <li><code>modal-lg</code>, <code>modal-sm</code>: Sizes</li>
    <li><code>data-bs-backdrop="static"</code>: Prevents modal from closing when clicking outside</li>
  </ul>
</section>

<section id="collapse">
  <h2>Bootstrap Collapse</h2>
  <p>
    The collapse component is used to show and hide content with a smooth animation. It's commonly used for toggling menus, FAQ sections, or any expandable/collapsible content.
  </p>

  <h3>Basic Collapse Example</h3>
  <pre>
    <code>
&lt;button class="btn btn-info" type="button" data-bs-toggle="collapse" data-bs-target="#demoCollapse"&gt;
  Toggle Content
&lt;/button&gt;

&lt;div id="demoCollapse" class="collapse mt-2"&gt;
  This is hidden content revealed by collapse!
&lt;/div&gt;
    </code>
  </pre>

  <h3>Accordion Example</h3>
  <pre>
    <code>
&lt;div class="accordion" id="accordionExample"&gt;
  &lt;div class="accordion-item"&gt;
    &lt;h2 class="accordion-header"&gt;
      &lt;button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"&gt;
        Accordion Item #1
      &lt;/button&gt;
    &lt;/h2&gt;
    &lt;div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample"&gt;
      &lt;div class="accordion-body"&gt;
        This is the body content.
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
    </code>
  </pre>
</section>
<section id="carousel">
  <h2>Bootstrap Carousel</h2>
  <p>
    Carousels are used to create image sliders. Bootstrap’s carousel component enables cycling through images, text, or custom markup with controls and indicators.
  </p>

  <h3>Basic Carousel Example</h3>
  <pre>
    <code>
&lt;div id="carouselExample" class="carousel slide" data-bs-ride="carousel"&gt;
  &lt;div class="carousel-indicators"&gt;
    &lt;button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"&gt;&lt;/button&gt;
    &lt;button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"&gt;&lt;/button&gt;
    &lt;button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"&gt;&lt;/button&gt;
  &lt;/div&gt;

  &lt;div class="carousel-inner"&gt;
    &lt;div class="carousel-item active"&gt;
      &lt;img src="image1.jpg" class="d-block w-100" alt="..." /&gt;
    &lt;/div&gt;
    &lt;div class="carousel-item"&gt;
      &lt;img src="image2.jpg" class="d-block w-100" alt="..." /&gt;
    &lt;/div&gt;
    &lt;div class="carousel-item"&gt;
      &lt;img src="image3.jpg" class="d-block w-100" alt="..." /&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev"&gt;
    &lt;span class="carousel-control-prev-icon"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next"&gt;
    &lt;span class="carousel-control-next-icon"&gt;&lt;/span&gt;
  &lt;/button&gt;
&lt;/div&gt;
    </code>
  </pre>

  <h3>Carousel Options</h3>
  <ul>
    <li><code>data-bs-interval</code> – Time between slides</li>
    <li><code>data-bs-pause</code> – Pause on hover</li>
    <li><code>.carousel-fade</code> – Fade effect instead of sliding</li>
  </ul>
</section>


<section id="utilities">
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

export default BootstrapTutorial;
