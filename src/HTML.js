
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./signup";
import "./login";
import "./LearnMore";
import "./Home";
import "./c";
import "./Tutorial";
import "./Contact";
import "./Aboutus";
import "./C.css";
import "./Exercise";
import "./Codingtutorial.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';



const HTMLTutorial = () => {
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
    <div className="page-container">
      {/* Header */}
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

      {/* Layout: Sidebar + Content */}
      <div className="main-layout">
        <aside className="sidebar">
          <h3>HTML Tutorial</h3>
          <ul>
            <li><a href="#intro">HTML Introduction</a></li>
            <li><a href="#doc">HTML Document</a></li>
            <li><a href="#tags">HTML Tags</a></li>
            <li><a href="#elements">HTML Elements</a></li>
            <li><a href="#attributes">HTML Attributes</a></li>
            <li><a href="#headings">HTML Headings</a></li>
            <li><a href="#paragraphs">HTML Paragraphs</a></li>
            <li><a href="#styles">HTML Styles</a></li>
            <li><a href="#links">HTML Links</a></li>
            <li><a href="#images">HTML Images</a></li>
            <li><a href="#lists">HTML Lists</a></li>
            <li><a href="#tables">HTML Tables</a></li>
            <li><a href="#forms">HTML Forms</a></li>
            <li><a href="#media">HTML Media</a></li>
            <li><a href="#semantic">HTML Semantic</a></li>
            <li><a href="#iframes">HTML Iframes</a></li>
            <li><a href="#entities">HTML Entities</a></li>
            <li><a href="#symbols">HTML Symbols</a></li>
            <li><a href="#blockinline">HTML Block & Inline</a></li>
            <li><a href="#classes">HTML Classes</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
  <h2>HTML Introduction</h2>
  <p>HTML, or HyperText Markup Language, is the standard language used to create and design documents that are displayed in a web browser. It serves as the foundation of the World Wide Web and is used in conjunction with CSS (Cascading Style Sheets) and JavaScript to build comprehensive and dynamic websites.</p>
  <p>Developed initially by Tim Berners-Lee in 1991, HTML has undergone numerous iterations, each enhancing the language to adapt to modern needs. From basic text formatting and hyperlink creation to multimedia integration and semantic markup, HTML has evolved into a powerful tool for web developers.</p>
  <p>"HyperText" refers to the method of linking text and other resources together through hyperlinks. "Markup Language" indicates that HTML uses tags to "mark up" content, defining its structure and meaning. For instance, a paragraph is denoted with the <code>&lt;p&gt;</code> tag, a heading with <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>, and an image with the <code>&lt;img&gt;</code> tag.</p>

  <h3>Why HTML is Important</h3>
  <ul>
    <li><strong>Universal Standard:</strong> HTML is universally supported by all browsers and platforms.</li>
    <li><strong>Structure and Semantics:</strong> It provides the foundational structure for all web content, including text, images, links, and multimedia.</li>
    <li><strong>SEO and Accessibility:</strong> Proper HTML enhances Search Engine Optimization (SEO) and accessibility for users with disabilities.</li>
    <li><strong>Integration:</strong> HTML integrates seamlessly with CSS for styling and JavaScript for interactivity.</li>
  </ul>

  <h3>HTML Versions</h3>
  <p>Over time, HTML has evolved:</p>
  <ul>
    <li><strong>HTML 1.0 (1993):</strong> Basic structure of webpages.</li>
    <li><strong>HTML 2.0 (1995):</strong> Standardized all existing practices.</li>
    <li><strong>HTML 3.2 (1997):</strong> Included scripting and style elements.</li>
    <li><strong>HTML 4.01 (1999):</strong> Introduced more strict document structures.</li>
    <li><strong>HTML5 (2014 - Present):</strong> Adds semantic elements, multimedia support, APIs for offline apps, and mobile responsiveness.</li>
  </ul>

  <h3>Basic HTML Syntax</h3>
  <p>HTML syntax is simple and intuitive. Here's an example of a basic structure:</p>
  <pre>{`<!DOCTYPE html>
<html>
  <head>
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>`}</pre>

  <h3>HTML and Web Technologies</h3>
  <p>HTML works closely with:</p>
  <ul>
    <li><strong>CSS:</strong> For styling and visual layout.</li>
    <li><strong>JavaScript:</strong> For interactivity and logic.</li>
    <li><strong>Web APIs:</strong> For accessing browser features like geolocation, local storage, and multimedia.</li>
    <li><strong>Backend languages:</strong> Such as PHP, Node.js, Python (with Flask/Django), etc., for full-stack development.</li>
  </ul>

  <h3>Learning HTML</h3>
  <p>HTML is beginner-friendly and essential for anyone aspiring to be a web developer. It is the first step in understanding how websites are built and how they function. HTML is readable and logical, making it perfect for self-study and structured curriculum alike.</p>

  <h3>Conclusion</h3>
  <p>HTML is not just a programming language; it's the digital grammar of the internet. Whether you're building a personal blog or the front end of a complex web application, understanding HTML is crucial. As web technologies grow and evolve, HTML continues to be the steadfast foundation of all content online.</p>
</section>


          <section id="doc">
  <h2>HTML Document Structure</h2>
  <p>An HTML document is the blueprint for a web page. It defines what content appears in a browser and how it is organized. Every HTML document follows a hierarchical structure defined by tags and elements. Let's break it down.</p>

  <h3>Doctype Declaration</h3>
  <p>Every HTML5 document starts with a doctype declaration. It tells the browser to use HTML5 standards and ensures consistent rendering across browsers.</p>
  <pre>{`<!DOCTYPE html>`}</pre>

  <h3>&lt;html&gt; Element</h3>
  <p>The root element that wraps all other content. It has an optional attribute like <code>lang</code> to indicate language.</p>
  <pre>{`<html lang="en"> ... </html>`}</pre>

  <h3>&lt;head&gt; Section</h3>
  <p>This section contains metadata that is not visible on the page but is essential for the browser and search engines. It may include:</p>
  <ul>
    <li><code>&lt;title&gt;</code> - Sets the browser title</li>
    <li><code>&lt;meta charset="UTF-8"&gt;</code> - Character encoding</li>
    <li><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> - Responsive design</li>
    <li><code>&lt;link rel="stylesheet" href="style.css"&gt;</code> - Links to CSS</li>
    <li><code>&lt;script src="script.js"&gt;</code> - External scripts</li>
  </ul>

  <h3>&lt;body&gt; Section</h3>
  <p>This section holds the visible content, including text, images, links, buttons, forms, and more. Anything inside the body is rendered by the browser.</p>

  <h3>Sample Full Document</h3>
  <pre>{`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <h1>Welcome to My Website</h1>
    </header>
    <main>
      <p>This is the main content area.</p>
    </main>
    <footer>
      <p>© 2025 My Site</p>
    </footer>
  </body>
</html>`}</pre>

  <h3>HTML Page Rendering</h3>
  <p>When a browser loads an HTML file, it constructs the DOM (Document Object Model). This model represents all page elements as objects that JavaScript and CSS can manipulate.</p>

  <h3>Best Practices</h3>
  <ul>
    <li>Always use <code>&lt;!DOCTYPE html&gt;</code> at the top</li>
    <li>Define character encoding</li>
    <li>Use semantic tags where possible</li>
    <li>Organize your code with indentation and comments</li>
  </ul>

  <h3>Conclusion</h3>
  <p>Understanding the HTML document structure is critical for writing clean, scalable, and maintainable web pages. Once you grasp this structure, everything else in HTML becomes easier to manage.</p>
</section>

          <section id="tags">
  <h2>HTML Tags</h2>
  <p>HTML tags are the foundation of web page structure. Tags define elements and instruct the browser on how to display content. Tags are enclosed in angle brackets and often come in pairs: an opening tag and a closing tag. Some tags are self-closing.</p>

  <h3>Basic Syntax of a Tag</h3>
  <pre>{`<tagname>Content goes here</tagname>`}</pre>
  <p>For example, a paragraph would be written as:</p>
  <pre>{`<p>This is a paragraph.</p>`}</pre>

  <h3>Paired vs. Self-Closing Tags</h3>
  <ul>
    <li><strong>Paired tags:</strong> These have a start and end tag. E.g. <code>&lt;p&gt;...&lt;/p&gt;</code></li>
    <li><strong>Self-closing tags:</strong> These do not need a closing tag. E.g. <code>&lt;br /&gt;</code> or <code>&lt;img /&gt;</code></li>
  </ul>

  <h3>Commonly Used Tags</h3>
  <ul>
    <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> - Define headings</li>
    <li><code>&lt;p&gt;</code> - Paragraph</li>
    <li><code>&lt;a&gt;</code> - Anchor or hyperlink</li>
    <li><code>&lt;img&gt;</code> - Embed image</li>
    <li><code>&lt;br&gt;</code> - Line break</li>
    <li><code>&lt;hr&gt;</code> - Horizontal rule</li>
    <li><code>&lt;div&gt;</code> - Division or container</li>
    <li><code>&lt;span&gt;</code> - Inline container</li>
    <li><code>&lt;strong&gt;</code> / <code>&lt;em&gt;</code> - Emphasis</li>
    <li><code>&lt;ul&gt;</code> / <code>&lt;ol&gt;</code> / <code>&lt;li&gt;</code> - Lists</li>
  </ul>

  <h3>HTML Tag Nesting</h3>
  <p>Tags can be nested inside one another to create structure. Always close tags in the reverse order they are opened:</p>
  <pre>{`<p>This is a <strong>bold</strong> word.</p>`}</pre>

  <h3>Void Elements</h3>
  <p>Void elements are tags that do not require closing tags. Examples include:</p>
  <ul>
    <li><code>&lt;br&gt;</code> - Line break</li>
    <li><code>&lt;img&gt;</code> - Image</li>
    <li><code>&lt;input&gt;</code> - Form input field</li>
    <li><code>&lt;meta&gt;</code> - Metadata</li>
    <li><code>&lt;link&gt;</code> - Link external resources</li>
  </ul>

  <h3>Tag Attributes</h3>
  <p>Tags often include attributes that modify their behavior:</p>
  <pre>{`<a href="https://example.com" target="_blank">Visit Example</a>`}</pre>
  <ul>
    <li><strong>href:</strong> URL for the link</li>
    <li><strong>target:</strong> Specifies where to open the link</li>
  </ul>

  <h3>Semantic vs Non-Semantic Tags</h3>
  <p>Semantic tags clearly define their purpose, while non-semantic tags do not. Examples:</p>
  <ul>
    <li>Semantic: <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code></li>
    <li>Non-semantic: <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code></li>
  </ul>

  <h3>Conclusion</h3>
  <p>Understanding and using HTML tags properly is critical to building clean, accessible, and efficient web pages. As you practice more with HTML, you'll naturally begin to use tags to semantically structure your content and improve your site's functionality and SEO.</p>
</section>

          <section id="elements">
  <h2>HTML Elements</h2>
  <p>HTML elements are the core building blocks of all web pages. They are composed of a start tag, some content, and an end tag. Every visible component on a web page—like paragraphs, headings, images, links, and more—is an HTML element.</p>

  <h3>Basic Structure of an HTML Element</h3>
  <pre>{`<tagname attribute="value">Content</tagname>`}</pre>
  <p>Example:</p>
  <pre>{`<p>This is a paragraph.</p>`}</pre>

  <h3>Types of Elements</h3>
  <ul>
    <li><strong>Block-level elements:</strong> These occupy the entire width of the page. E.g. <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code></li>
    <li><strong>Inline elements:</strong> These only take up as much width as necessary. E.g. <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code></li>
    <li><strong>Empty (Void) elements:</strong> These do not have closing tags. E.g. <code>&lt;br&gt;</code>, <code>&lt;img&gt;</code></li>
  </ul>

  <h3>Nested Elements</h3>
  <p>HTML allows nesting elements inside others, which helps in structuring content:</p>
  <pre>{`<div>
  <h1>Title</h1>
  <p>This is a <strong>bold</strong> word in a paragraph.</p>
</div>`}</pre>

  <h3>Content Model</h3>
  <p>Each element has a content model defining what can go inside:</p>
  <ul>
    <li><strong>Flow content:</strong> Most elements that can be used in the body.</li>
    <li><strong>Metadata content:</strong> Elements used in the head, like <code>&lt;title&gt;</code> or <code>&lt;meta&gt;</code>.</li>
    <li><strong>Embedded content:</strong> Elements like <code>&lt;img&gt;</code>, <code>&lt;video&gt;</code>, <code>&lt;iframe&gt;</code>.</li>
    <li><strong>Interactive content:</strong> Elements like <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>.</li>
  </ul>

  <h3>Global Attributes</h3>
  <p>Most elements support global attributes such as:</p>
  <ul>
    <li><code>id</code> – Unique identifier</li>
    <li><code>class</code> – CSS class for styling</li>
    <li><code>style</code> – Inline styles</li>
    <li><code>title</code> – Tooltip text</li>
    <li><code>lang</code> – Language</li>
    <li><code>hidden</code> – Hides the element from view</li>
  </ul>

  <h3>HTML5 Sectioning Elements</h3>
  <p>HTML5 introduced semantic elements that define the structure more meaningfully:</p>
  <ul>
    <li><code>&lt;header&gt;</code></li>
    <li><code>&lt;nav&gt;</code></li>
    <li><code>&lt;main&gt;</code></li>
    <li><code>&lt;section&gt;</code></li>
    <li><code>&lt;article&gt;</code></li>
    <li><code>&lt;aside&gt;</code></li>
    <li><code>&lt;footer&gt;</code></li>
  </ul>

  <h3>Comments in HTML</h3>
  <p>Use comments to document your code:</p>
  <pre>{`<!-- This is a comment -->`}</pre>

  <h3>Best Practices</h3>
  <ul>
    <li>Use semantic elements when possible for clarity and accessibility.</li>
    <li>Keep nesting logical and not too deep.</li>
    <li>Separate structure (HTML), style (CSS), and behavior (JavaScript).</li>
  </ul>

  <h3>Conclusion</h3>
  <p>HTML elements are the building blocks of any webpage. Mastering them gives you control over the structure and semantics of your content. As you build more complex layouts, your understanding of elements and their relationships becomes increasingly important.</p>
</section>

          <section id="attributes">
  <h2>HTML Attributes</h2>
  <p>HTML attributes provide additional information about elements. They are always included in the opening tag and usually come in name/value pairs like <code>name="value"</code>.</p>

  <h3>Basic Attribute Syntax</h3>
  <pre>{`<element attribute="value">Content</element>`}</pre>
  <p>Example:</p>
  <pre>{`<a href="https://example.com" target="_blank">Visit Example</a>`}</pre>

  <h3>Commonly Used Attributes</h3>
  <ul>
    <li><strong>href:</strong> Specifies the URL in anchor tags.</li>
    <li><strong>src:</strong> Specifies the source for images, videos, etc.</li>
    <li><strong>alt:</strong> Alternative text for images.</li>
    <li><strong>title:</strong> Extra information on hover.</li>
    <li><strong>style:</strong> Inline CSS for styling.</li>
    <li><strong>class:</strong> Specifies one or more class names for styling via CSS.</li>
    <li><strong>id:</strong> Unique identifier for the element.</li>
    <li><strong>target:</strong> Where to open a linked document (_blank, _self).</li>
    <li><strong>lang:</strong> Language of the document.</li>
    <li><strong>width/height:</strong> Size of media or input fields.</li>
  </ul>

  <h3>Global Attributes</h3>
  <p>Global attributes can be used on all HTML elements:</p>
  <ul>
    <li><code>accesskey</code> – Shortcut key</li>
    <li><code>contenteditable</code> – Whether content is editable</li>
    <li><code>draggable</code> – Whether element is draggable</li>
    <li><code>hidden</code> – Hides the element</li>
    <li><code>spellcheck</code> – Enables spell checking</li>
    <li><code>tabindex</code> – Tab order</li>
    <li><code>title</code> – Extra tooltip info</li>
  </ul>

  <h3>Boolean Attributes</h3>
  <p>Boolean attributes don’t require a value. If present, the attribute is true.</p>
  <pre>{`<input type="checkbox" checked>`}</pre>

  <h3>Custom Data Attributes</h3>
  <p>You can define custom attributes using the <code>data-*</code> prefix. Useful for JavaScript access.</p>
  <pre>{`<div data-user-id="123" data-role="admin">User Info</div>`}</pre>

  <h3>Event Attributes</h3>
  <p>Event attributes define JavaScript to run when events occur. Examples:</p>
  <pre>{`<button onclick="alert('Hello!')">Click Me</button>`}</pre>

  <h3>Attributes Best Practices</h3>
  <ul>
    <li>Use lowercase for attribute names.</li>
    <li>Enclose values in double quotes.</li>
    <li>Use classes for styling; IDs for scripting and targeting.</li>
    <li>Keep attribute values relevant and clean.</li>
  </ul>

  <h3>Conclusion</h3>
  <p>Attributes enrich HTML elements by adding extra meaning, control, and styling options. Mastery of attributes is essential for writing powerful, flexible, and interactive HTML documents.</p>
</section>

          <section id="headings">
  <h2>HTML Headings</h2>
  <p>Headings in HTML are defined with the <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> tags. These tags are used to create headings on a webpage, from most important (<code>&lt;h1&gt;</code>) to least important (<code>&lt;h6&gt;</code>).</p>

  <h3>Structure and Usage</h3>
  <p>Headings are not just for visual impact but also serve semantic purposes, informing search engines and assistive technologies about the hierarchy and structure of content.</p>

  <pre>{`
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
<h4>Fourth level</h4>
<h5>Fifth level</h5>
<h6>Sixth level</h6>
`}</pre>

  <h3>Importance in SEO</h3>
  <p>Search engines use headings to understand the content of a page. Proper heading structure improves readability, accessibility, and SEO ranking.</p>

  <h3>Best Practices</h3>
  <ul>
    <li>Use only one <code>&lt;h1&gt;</code> per page to define the main topic.</li>
    <li>Use headings in order. Do not skip from <code>&lt;h1&gt;</code> to <code>&lt;h4&gt;</code> without intermediate steps.</li>
    <li>Do not use headings solely for styling. Use CSS for visual styling instead.</li>
    <li>Ensure headings convey meaningful structure and help users navigate content.</li>
  </ul>

  <h3>Styling Headings</h3>
  <p>By default, headings are bold and have varying sizes. You can customize them using CSS:</p>
  <pre>{`h1 {
  font-size: 32px;
  color: #333;
  text-align: center;
}`}</pre>

  <h3>Accessibility</h3>
  <p>Assistive technologies like screen readers rely on heading levels to help users navigate the page. A well-structured heading outline makes the site easier to use for people with disabilities.</p>

  <h3>Conclusion</h3>
  <p>HTML headings are vital not only for organizing content but also for enhancing user experience, SEO, and accessibility. Using them appropriately ensures that both users and machines understand your content's structure.</p>
</section>

<section id="paragraphs">
  <h2>HTML Paragraphs</h2>
  <p>Paragraphs in HTML are used to structure text content into readable blocks. They allow content to be broken into logical sections and are one of the most commonly used elements on any webpage. HTML paragraphs are defined using the <code>&lt;p&gt;</code> tag.</p>

  <h3>Basic Syntax</h3>
  <pre>{`<p>This is a paragraph.</p>`}</pre>
  <p>Each <code>&lt;p&gt;</code> element represents a distinct paragraph of text. Paragraph tags automatically include spacing above and below the text block.</p>

  <h3>Example</h3>
  <pre>{`
<p>This is the first paragraph on the page.</p>
<p>This is a second paragraph. It is separated from the first by vertical spacing.</p>
`}</pre>

  <h3>Line Breaks vs Paragraphs</h3>
  <p>To add a single line break within a paragraph, use the <code>&lt;br&gt;</code> tag:</p>
  <pre>{`
<p>This is a line.<br>This is a new line.</p>`}</pre>
  <p><code>&lt;br&gt;</code> is not the same as a new paragraph. It's a forced line break without the vertical spacing of a new block element.</p>

  <h3>Styling Paragraphs</h3>
  <p>You can style paragraphs using CSS:</p>
  <pre>{`
p {
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
}`}</pre>

  <h3>Best Practices</h3>
  <ul>
    <li>Use one paragraph tag for each logical unit of text.</li>
    <li>Do not nest other block-level elements inside <code>&lt;p&gt;</code>.</li>
    <li>Use <code>&lt;br&gt;</code> only for line breaks in poems, addresses, etc.</li>
    <li>Use CSS for spacing and text styles rather than hardcoding them into the HTML.</li>
  </ul>

  <h3>Accessibility</h3>
  <p>Paragraphs improve accessibility by dividing content into digestible chunks. Screen readers handle paragraphs effectively and allow users to navigate by them.</p>

  <h3>Common Errors</h3>
  <ul>
    <li>Placing a <code>&lt;div&gt;</code> or <code>&lt;section&gt;</code> inside a <code>&lt;p&gt;</code> tag (invalid).</li>
    <li>Forgetting to close a <code>&lt;p&gt;</code> tag (modern browsers will auto-close it but it's not good practice).</li>
  </ul>

  <h3>Conclusion</h3>
  <p>HTML paragraphs help organize your content and make it readable and accessible. By using the <code>&lt;p&gt;</code> tag correctly and combining it with CSS for styling, you ensure that your web content is both user-friendly and visually appealing.</p>
</section>

          <section id="semantic">
  <h2>HTML Semantic Elements</h2>
  <p>Semantic HTML refers to the use of HTML tags that convey the meaning—or semantics—of the content enclosed within them. Semantic tags clearly define their purpose both to the developer and to the browser or assistive technology like screen readers.</p>

  <h3>Why Use Semantic Elements?</h3>
  <ul>
    <li><strong>Accessibility:</strong> Semantic elements help screen readers and other assistive devices understand page content.</li>
    <li><strong>SEO Benefits:</strong> Search engines give higher priority to content inside semantic tags.</li>
    <li><strong>Code Clarity:</strong> Developers can more easily read and understand code structure.</li>
    <li><strong>Browser Behavior:</strong> Browsers apply default styles and behaviors that match the semantic meaning of elements.</li>
  </ul>

  <h3>Common Semantic Tags</h3>
  <ul>
    <li><code>&lt;header&gt;</code> – Defines the introductory content or navigational links.</li>
    <li><code>&lt;nav&gt;</code> – Defines a set of navigation links.</li>
    <li><code>&lt;main&gt;</code> – Specifies the dominant content of the <code>&lt;body&gt;</code>.</li>
    <li><code>&lt;section&gt;</code> – Defines a section in a document, such as chapters or groups of content.</li>
    <li><code>&lt;article&gt;</code> – Represents a self-contained piece of content.</li>
    <li><code>&lt;aside&gt;</code> – Defines content outside the main flow (e.g., sidebars).</li>
    <li><code>&lt;footer&gt;</code> – Defines a footer for a document or section.</li>
    <li><code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code> – Used for images, illustrations, and their captions.</li>
    <li><code>&lt;mark&gt;</code> – Highlights or marks text.</li>
    <li><code>&lt;time&gt;</code> – Specifies a time or date.</li>
  </ul>

  <h3>Non-Semantic Tags (for comparison)</h3>
  <ul>
    <li><code>&lt;div&gt;</code> – A generic container for flow content.</li>
    <li><code>&lt;span&gt;</code> – A generic inline container for phrasing content.</li>
  </ul>

  <h3>Example</h3>
  <pre>{`
<main>
  <article>
    <header>
      <h1>HTML Semantic Elements</h1>
    </header>
    <section>
      <p>This section contains semantic elements in practice.</p>
    </section>
    <footer>
      <p>Published: <time datetime="2025-04-06">April 6, 2025</time></p>
    </footer>
  </article>
</main>`}</pre>

  <h3>Best Practices</h3>
  <ul>
    <li>Use semantic tags whenever possible for better readability and structure.</li>
    <li>Avoid overusing <code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> for layout.</li>
    <li>Use ARIA roles only when semantic elements are not sufficient.</li>
  </ul>

  <h3>Conclusion</h3>
  <p>Semantic HTML helps build web pages that are more accessible, maintainable, and search-engine friendly. It's a foundational skill for writing clean and professional web code.</p>
</section>

<section id="ids">
  <h2>HTML IDs</h2>
  <p>The <code>id</code> attribute in HTML uniquely identifies an element on a page. Unlike classes, which can be shared across multiple elements, an <code>id</code> must be unique within a single document. IDs are often used for styling, navigation, and DOM manipulation.</p>

  <h3>Syntax</h3>
  <pre>{`<element id="unique-id">Content</element>`}</pre>

  <h3>Using IDs in CSS</h3>
  <p>To style an element with a specific ID, use a hash <code>#</code> followed by the ID name in your CSS:</p>
  <pre>{`
#header {
  background-color: #333;
  color: white;
  padding: 20px;
}`}</pre>

  <h3>Using IDs in JavaScript</h3>
  <p>IDs are the most common way to select and manipulate elements with JavaScript:</p>
  <pre>{`
const header = document.getElementById("header");
header.style.fontSize = "24px";`}</pre>

  <h3>Using IDs for Navigation</h3>
  <p>IDs can be used to create anchor links within a page:</p>
  <pre>{`
<a href="#contact">Go to Contact</a>
...
<section id="contact">
  <h2>Contact Us</h2>
</section>`}</pre>


  <h3>Best Practices</h3>
  <ul>
    <li>Use unique and descriptive ID names (e.g., <code>main-nav</code>).</li>
    <li>Do not use the same ID on more than one element.</li>
    <li>Use IDs for single elements and classes for groups of elements.</li>
    <li>Reserve IDs for important structural or functional elements.</li>
  </ul>

  <h3>ID vs Class</h3>
  <ul>
    <li><strong>ID:</strong> Unique, used once per page, referenced with <code>#</code>.</li>
    <li><strong>Class:</strong> Reusable, used multiple times, referenced with <code>.</code>.</li>
  </ul>

  <h3>Example</h3>
  <pre>{`
<!DOCTYPE html>
<html>
  <head>
    <style>
      #banner {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="banner">Welcome to Our Website</div>
  </body>
</html>`}</pre>
</section>
 <div className="html-page">
        <main>
          <section id="links">
            <h2>HTML Links</h2>
            <p>Links are created using the <code>&lt;a&gt;</code> tag in HTML. They allow navigation between pages, resources, or external sites.</p>

            <h3>Basic Link Syntax</h3>
            <pre>{`<a href="https://example.com">Visit Example</a>`}</pre>

            <h3>Target Attribute</h3>
            <p>Use the <code>target</code> attribute to open links in a new tab:</p>
            <pre>{`<a href="https://example.com" target="_blank">Open in New Tab</a>`}</pre>

            <h3>Link Styling</h3>
            <p>By default, links are underlined and blue. You can style them using CSS:</p>
            <pre>{`a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}`}</pre>

            <h3>Linking to Downloads</h3>
            <p>Add the <code>download</code> attribute to initiate file downloads:</p>
            <pre>{`<a href="file.pdf" download>Download PDF</a>`}</pre>

            <h3>Accessibility Tips</h3>
            <ul>
              <li>Use descriptive link text, not "click here".</li>
              <li>Ensure links are easily distinguishable (e.g., underlined, different color).</li>
              <li>Use <code>aria-label</code> for more descriptive screen reader text if needed.</li>
            </ul>

            <h3>Conclusion</h3>
            <p>Links are essential for web navigation. Understanding how to use and style them effectively improves user experience and accessibility across your site.</p>
          </section>
        </main>
      </div>
</main>
</div>

      {/* Footer */}
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

export default HTMLTutorial;