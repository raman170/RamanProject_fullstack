import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const CSSTutorial = () => {
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
          <h2>CSS Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#syntax">CSS Syntax</a></li>
            <li><a href="#selectors">Selectors</a></li>
            <li><a href="#colors">Colors</a></li>
            <li><a href="#backgrounds">Backgrounds</a></li>
            <li><a href="#borders">Borders</a></li>
            <li><a href="#margins">Margins</a></li>
            <li><a href="#padding">Padding</a></li>
            <li><a href="#boxmodel">Box Model</a></li>
            <li><a href="#text">Text</a></li>
            <li><a href="#fonts">Fonts</a></li>
            <li><a href="#flexbox">Flexbox</a></li>
            <li><a href="#grid">Grid</a></li>
            <li><a href="#media">Media Queries</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
  <h2>Introduction to CSS</h2>
  <p>
    CSS, short for Cascading Style Sheets, is one of the most vital technologies in web development. While HTML structures the content of a website, CSS controls its look and feel—everything from fonts, spacing, and colors to layouts, animations, and responsiveness. Imagine visiting a website without CSS—it would be a plain wall of text and images, no visual structure, and no design flow. CSS breathes life into HTML documents, allowing developers to create aesthetically pleasing and user-friendly interfaces that adapt across devices and screen sizes.
  </p>

  <p>
    The term "cascading" refers to how CSS applies styles in a hierarchical order based on multiple factors such as specificity, importance, and source order. This enables developers to control which styles take precedence when there are conflicting rules. The cascade also makes it possible to use external stylesheets that apply site-wide themes, internal styles that affect a single page, and inline styles for individual elements. This layered structure is what gives CSS its power and flexibility.
  </p>
  <p>
  The journey of CSS began in 1994 when Håkon Wium Lie proposed a mechanism to separate presentation from content in HTML. At the time, HTML was used for both structuring and styling web pages. Developers had to rely on 
  <span style={{ fontFamily: 'Arial', color: 'blue' }}>&#96;&lt;font&gt;&#96;</span>, 
  <span style={{ textAlign: 'center' }}>&#96;&lt;center&gt;&#96;</span>, and other deprecated tags to apply styling, which made code bulky and difficult to maintain. The W3C (World Wide Web Consortium) formally adopted CSS1 in 1996, followed by CSS2 in 1998, and CSS3 in the late 2000s. Today, CSS is modular and continuously evolving with specifications like CSS Grid, Flexbox, custom properties (variables), container queries, and more.
</p>



  <p>Learning CSS isn't just about memorizing properties and values.</p>
<p>One of CSS's strongest features is its ability to define responsive design.</p>

<p>
  One of CSS's strongest features is its ability to define responsive design. In the modern web, where users access sites from desktops, tablets, mobile phones, TVs, and even smartwatches, a website must look good and function properly on all devices. CSS makes this possible through units like 
  <code>em</code>, <code>rem</code>, <code>%</code>, <code>vh</code>, and <code>vw</code>, as well as media queries like 
  <code>@media (max-width: 768px) &#123; ... &#125;</code>. This mobile-first approach allows for a fluid experience across screen sizes without duplicating HTML or JavaScript.
</p>



  <p>
    The Box Model is another foundational concept in CSS. Every HTML element is a rectangular box composed of content, padding, border, and margin. These areas define how much space an element occupies and how it interacts with neighboring elements. Misunderstanding the box model is one of the leading causes of layout bugs, especially in the early stages of learning. Fortunately, modern browser developer tools let you inspect and experiment with box properties live, which aids in debugging and learning.
  </p>

  <p>
    CSS uses selectors to target HTML elements. There are many types of selectors: universal (`*`), element (`p`), class (`.menu`), ID (`#header`), attribute (`[type="text"]`), and pseudo-classes (`:hover`, `:nth-child`) among others. Each selector has a specificity value that affects how styles are applied. Understanding specificity helps you write clean, conflict-free styles and reduces the need for `!important` declarations, which should be avoided unless absolutely necessary.
  </p>

  <p>
    Modern CSS introduces layout systems like Flexbox and CSS Grid. Flexbox is excellent for one-dimensional layouts—either row or column. It helps align items, distribute space, and handle dynamic resizing. CSS Grid, on the other hand, is ideal for two-dimensional layouts with both rows and columns. It supports named areas, implicit and explicit tracks, auto-placement, and media responsiveness. Together, they make layout design more intuitive and drastically reduce reliance on third-party frameworks.
  </p>

  <p>
    Developers also benefit from CSS preprocessors such as Sass and Less. These tools extend CSS with features like variables, nesting, mixins, inheritance, and control directives (like `@if` and `@for`). Preprocessors compile into standard CSS but allow for better organization, code reuse, and maintainability, especially in large projects. CSS Modules and CSS-in-JS (like styled-components) provide encapsulation and scoping mechanisms that prevent style leaks and conflicts in React, Vue, and other component-based frameworks.
  </p>

  <p>
    Another exciting development is the introduction of custom properties (CSS variables). These variables allow you to define reusable values and switch themes dynamically—especially useful for implementing dark/light modes or branding across an application. A variable like `--main-color: #3498db` can be referenced using `var(--main-color)` anywhere in the CSS, making your design system scalable and easy to update.
  </p>

  <p>
    Lastly, learning CSS is also about developing an eye for design. You begin to understand spacing, proportions, color theory, typography, and visual hierarchy. CSS bridges the gap between logic and aesthetics. It enables developers to transform raw HTML into interactive, accessible, and elegant interfaces that delight users and meet real-world requirements.
  </p>

  <p>
    In the rest of this tutorial, we’ll cover essential concepts such as syntax and selectors, colors, fonts, spacing, borders, backgrounds, layout systems, media queries, and animations. Whether you're a complete beginner or brushing up your skills, this CSS tutorial will serve as a solid foundation for building modern, responsive web experiences.
  </p>

  <p>
    By the end, you'll be equipped to tackle complex layouts, build reusable component styles, debug styling issues efficiently, and write scalable, maintainable CSS code that aligns with industry best practices.
  </p>
</section>

<section id="syntax">
  <h2>Syntax & Selectors</h2>

  <p>
    CSS syntax is the foundation of how styles are applied to elements in HTML documents. Understanding the syntax and the many types of selectors is essential for writing powerful, reusable, and organized stylesheets. Once you master CSS syntax and the logic behind selectors, you can craft beautifully structured, dynamic layouts with confidence and efficiency.
  </p>

  <p>
    CSS is a rule-based language. Each rule or declaration block begins with a selector, followed by a pair of curly braces `{}` that contain one or more declarations. Each declaration consists of a property and a value, separated by a colon and ending with a semicolon. This structure may seem simple, but its flexibility and hierarchical behavior enable the creation of highly sophisticated designs and layouts.
  </p>

  <pre>{`
selector {
  property: value;
  property2: value2;
}
  `}</pre>

  <p>
    For example, the rule below targets all paragraph elements and makes their text blue and center-aligned:
  </p>

  <pre>{`
p {
  color: blue;
  text-align: center;
}
  `}</pre>

  <p>
    Let’s explore each part of this rule:
    <ul>
      <li><strong>Selector:</strong> The <code>p</code> selects all &lt;p&gt; elements.</li>
      <li><strong>Property:</strong> <code>color</code> and <code>text-align</code> are CSS properties.</li>
      <li><strong>Value:</strong> <code>blue</code> and <code>center</code> are the values assigned to those properties.</li>
    </ul>
  </p>

  <h3>🔹 CSS Syntax Rules</h3>

  <p>
    Some important syntax rules to remember:
    <ul>
      <li>Each declaration must end with a semicolon <code>;</code></li>
      <li>Blocks of declarations are wrapped in curly braces <code>{ }</code></li>
      <li>Whitespace and indentation are ignored by the browser but are essential for readability</li>
      <li>CSS is case-insensitive, but class and ID names are case-sensitive in HTML</li>
    </ul>
  </p>

  <h3>🔹 CSS Selectors: The Power of Targeting</h3>

  <p>
    Selectors define which elements the rules apply to. There are many types of selectors, ranging from simple to highly complex. Mastering selectors allows you to target any part of your HTML with precision.
  </p>

  <h4>1️⃣ Universal Selector</h4>
  <pre>{`* { margin: 0; padding: 0; }`}</pre>
  <p>Targets every element on the page.</p>

  <h4>2️⃣ Type (Element) Selector</h4>
  <pre>{`h1 { font-size: 24px; }`}</pre>
  <p>Targets all elements of a specific type, like <code>h1</code>, <code>p</code>, <code>ul</code>.</p>

  <h4>3️⃣ Class Selector</h4>
  <pre>{`.highlight { background-color: yellow; }`}</pre>
  <p>Targets elements with a specific class. A single class can be applied to multiple elements.</p>

  <h4>4️⃣ ID Selector</h4>
  <pre>{`#header { color: red; }`}</pre>
  <p>Targets a single element with a specific ID. IDs must be unique on the page.</p>

  <h4>5️⃣ Grouping Selectors</h4>
  <pre>{`h1, h2, h3 { font-family: 'Segoe UI'; }`}</pre>
  <p>Applies the same styles to multiple selectors.</p>

  <h4>6️⃣ Descendant Selectors</h4>
  <pre>{`nav ul li a { color: white; }`}</pre>
  <p>Targets elements that are nested within a certain structure.</p>

  <h4>7️⃣ Child Selectors</h4>
  <pre>{`div > p { font-size: 18px; }`}</pre>
  <p>Targets only immediate children.</p>

  <h4>8️⃣ Adjacent Sibling Selector</h4>
  <pre>{`h1 + p { margin-top: 0; }`}</pre>
  <p>Targets a sibling that directly follows another element.</p>

  <h4>9️⃣ General Sibling Selector</h4>
  <pre>{`h1 ~ p { color: grey; }`}</pre>
  <p>Targets all siblings that follow a specific element.</p>

  <h4>🔟 Attribute Selectors</h4>
  <pre>{`input[type="text"] { border: 1px solid black; }`}</pre>
  <p>Targets elements based on attributes and attribute values.</p>

  <h4>🅰️ Pseudo-classes</h4>
  <pre>{`a:hover { color: orange; }`}</pre>
  <p>Style elements based on state, such as <code>:hover</code>, <code>:focus</code>, <code>:nth-child()</code>.</p>

  <h4>🅱️ Pseudo-elements</h4>
  <pre>{`p::first-line { font-weight: bold; }`}</pre>
  <p>Target specific parts of elements like <code>::first-line</code>, <code>::before</code>, <code>::after</code>.</p>

  <h3>🎯 Specificity: Who Wins the Style War?</h3>
  <p>
    When multiple rules target the same element, CSS uses a system called specificity to determine which rule to apply. The more specific the selector, the higher its priority.
  </p>

  <p>
    Specificity values:
    <ul>
      <li>Inline styles: 1000</li>
      <li>ID selectors: 100</li>
      <li>Class, attributes, and pseudo-classes: 10</li>
      <li>Element and pseudo-elements: 1</li>
    </ul>
  </p>

  <p>
    Example:
    <pre>{`
    <div id="banner" class="highlight">Welcome</div>

    #banner { color: red; }        /* specificity = 100 */
    .highlight { color: blue; }    /* specificity = 10 */
    div { color: green; }          /* specificity = 1 */
    `}</pre>
    The final color will be red because the ID selector has the highest specificity.
  </p>

  <h3>⚠️ The !important Rule</h3>
  <p>
    Adding <code>!important</code> to a CSS rule forces it to override all other rules, including inline styles and higher specificity selectors. It should be used sparingly as it can make debugging difficult.
  </p>

  <pre>{`
.button {
  background-color: red !important;
}
  `}</pre>

  <h3>🔁 Combining Selectors</h3>
  <p>
  You can combine selectors to target more specific elements or create reusable patterns:
</p>
<ul>
  <li><code>ul li</code> - targets all <code>li</code> inside a <code>ul</code></li>
  <li><code>div#content &gt; p.highlight</code> - targets paragraphs with class "highlight" directly inside #content</li>
  <li><code>a:hover</code> - targets anchor tags when hovered</li>
</ul>



  <h3>🧠 Best Practices for Writing Selectors</h3>
  <ul>
    <li>Keep selectors short and descriptive</li>
    <li>Avoid deep nesting unless necessary</li>
    <li>Use class selectors for reusability</li>
    <li>Use IDs sparingly—only when you truly need uniqueness</li>
    <li>Group related rules together for maintainability</li>
    <li>Use tools like BEM (Block Element Modifier) for naming conventions</li>
  </ul>

  <h3>👨‍💻 Real-World Use Case</h3>
  <p>
    Suppose you’re building a navigation menu:
  </p>

  <pre>{`
<nav>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
  `}</pre>

  <p>
    You could style it like this:
  </p>

  <pre>{`
.menu {
  list-style: none;
  display: flex;
  gap: 20px;
  background: #333;
  padding: 10px;
}

.menu li a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}

.menu li a:hover {
  background: #555;
  border-radius: 4px;
}
  `}</pre>

  <p>
    This is a basic but realistic example of combining element, class, and pseudo-class selectors to build a functional and attractive navigation menu.
  </p>

  <h3>📌 Summary</h3>
  <p>
    - CSS rules consist of selectors and declaration blocks.  
    - Selectors determine which elements the rules apply to.  
    - There are many selector types, including class, ID, attribute, pseudo-class, and combinators.  
    - Specificity determines which rule takes precedence in conflicts.  
    - Use selectors responsibly for scalable, readable CSS.
  </p>

  <p>
    Mastering syntax and selectors is essential to understanding CSS at a deeper level. Once you can target any element and apply styles predictably, the rest of CSS — layout, design systems, animations — becomes much easier and more enjoyable.
  </p>
</section>


<section id="colors">
  <h2>Colors</h2>

  <p>
    Color is one of the most important elements in web design. It has the power to influence emotion, establish hierarchy, create branding consistency, and enhance accessibility. In CSS, color is used to define the appearance of text, backgrounds, borders, shadows, and virtually every visible part of a web page. Mastering how to use and apply colors correctly in CSS is essential for both aesthetic and functional purposes.
  </p>

  <p>
    CSS supports multiple color formats, including:
    <ul>
      <li>Named colors (like <code>red</code>, <code>blue</code>)</li>
      <li>Hexadecimal notation (like <code>#ff0000</code>)</li>
      <li>RGB and RGBA (like <code>rgb(255, 0, 0)</code>)</li>
      <li>HSL and HSLA (like <code>hsl(0, 100%, 50%)</code>)</li>
      <li>CSS variables (like <code>var(--primary-color)</code>)</li>
    </ul>
  </p>

  <h3>🔹 Named Colors</h3>
  <p>
    CSS includes a list of 140 predefined color names like <code>red</code>, <code>green</code>, <code>blue</code>, <code>gold</code>, <code>salmon</code>, etc. These are convenient and easy to use but limited in range.
  </p>

  <pre>{`p { color: tomato; }`}</pre>

  <h3>🔹 Hexadecimal Colors</h3>
  <p>
    A hex color code begins with <code>#</code> and is followed by either 3 or 6 hexadecimal digits. Each pair represents red, green, and blue components.
  </p>

  <pre>{`
/* Full hex */
h1 {
  color: #1e90ff;
}

/* Shorthand hex (equivalent to #ffcc00) */
h2 {
  background-color: #fc0;
}
`}</pre>

  <h3>🔹 RGB & RGBA</h3>
  <p>
    The <code>rgb()</code> function specifies a color using red, green, and blue components (0–255). <code>rgba()</code> adds an alpha channel for transparency (0–1).
  </p>

  <pre>{`
button {
  background-color: rgb(255, 99, 71);
}

button:hover {
  background-color: rgba(255, 99, 71, 0.5);
}
`}</pre>

  <h3>🔹 HSL & HSLA</h3>
  <p>
    HSL stands for Hue, Saturation, and Lightness. HSLA includes an alpha channel.
  </p>

  <pre>{`
div {
  color: hsl(240, 100%, 50%);
  background-color: hsla(240, 100%, 50%, 0.2);
}
`}</pre>

  <h3>🔹 CSS Variables for Colors</h3>
  <p>
    Define custom color values using CSS variables for reusable and theme-friendly designs:
  </p>

  <pre>{`
:root {
  --primary: #6200ea;
  --accent: #03dac6;
}

body {
  color: var(--primary);
  background: var(--accent);
}
`}</pre>

  <h3>🎨 Color Usage Best Practices</h3>
  <ul>
    <li>Use variables to create themeable systems (light/dark modes)</li>
    <li>Maintain color contrast for accessibility (WCAG AA/AAA)</li>
    <li>Minimize the number of base colors to keep the design clean</li>
    <li>Use tools like Adobe Color, ColorZilla, and Coolors for palettes</li>
    <li>Test on real devices and in different lighting conditions</li>
  </ul>

  <h3>🧠 Fun Fact: Psychology of Colors</h3>
  <p>
    Different colors evoke different emotions. For example:
    <ul>
      <li><strong>Red:</strong> passion, urgency, attention</li>
      <li><strong>Blue:</strong> trust, calm, professionalism</li>
      <li><strong>Green:</strong> health, nature, growth</li>
      <li><strong>Yellow:</strong> energy, happiness, alertness</li>
    </ul>
    These associations are useful when designing UI/UX with purpose.
  </p>

  <h3>⚠️ Accessibility & Contrast</h3>
  <p>
    Always ensure there is enough contrast between text and background. Tools like <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">WebAIM Contrast Checker</a> help verify this.
  </p>

  <pre>{`
/* Example with poor contrast */
.bad {
  color: #999;
  background: #aaa;
}

/* Example with high contrast */
.good {
  color: #fff;
  background: #000;
}
`}</pre>

  <h3>🌈 Color Gradients</h3>
  <p>
    Gradients are smooth transitions between two or more colors:
  </p>

  <pre>{`
body {
  background: linear-gradient(to right, red, orange, yellow);
}
`}</pre>

  <h3>🎯 Real-World Example: Button States</h3>
  <pre>{`
.button {
  background: #3498db;
  color: white;
}

.button:hover {
  background: #2980b9;
}

.button:active {
  background: #1f618d;
}
`}</pre>

  <p>
    This demonstrates how colors provide visual feedback during interaction.
  </p>

  <h3>📌 Summary</h3>
  <ul>
    <li>CSS supports named, hex, rgb, rgba, hsl, hsla, and variable-based colors</li>
    <li>Each format has its strengths depending on use case</li>
    <li>Use color to create hierarchy, mood, and usability</li>
    <li>Focus on contrast for accessibility</li>
    <li>Design consistent color systems using variables and themes</li>
  </ul>

  <p>
    Colors are more than just decoration—they guide users, evoke emotion, and ensure accessibility. A well-thought-out color strategy enhances the entire user experience and sets the tone for your website or application.
  </p>
</section>


<section id="backgrounds">
  <h2>Backgrounds</h2>

  <p>
    Backgrounds are a vital part of CSS styling that allow you to customize the look and feel of almost any element. With CSS, you can define colors, images, gradients, and even control their positioning, repetition, attachment, and sizing. The <code>background</code> property and its sub-properties offer a wide array of tools to visually enhance your layout and create unique design effects.
  </p>

  <p>
    Whether you’re trying to style a simple card component or create a full-screen hero banner, understanding how to manipulate background properties will give you the flexibility and control needed to create modern, responsive, and engaging designs. Let's take a deep dive into how CSS backgrounds work, covering both basic and advanced use cases.
  </p>

  <h3>🧱 Basic Background Properties</h3>
  <ul>
    <li><code>background-color</code> — sets a solid color</li>
    <li><code>background-image</code> — sets an image as the background</li>
    <li><code>background-repeat</code> — controls if and how the image repeats</li>
    <li><code>background-position</code> — sets the position of the image</li>
    <li><code>background-size</code> — resizes the image</li>
    <li><code>background-attachment</code> — determines if the image scrolls with content or is fixed</li>
    <li><code>background</code> — shorthand for combining the above</li>
  </ul>

  <h3>🎨 Background Color</h3>
  <p>
    The most basic background property is <code>background-color</code>. You can use any valid color format: named colors, hex, RGB, HSL, or variables.
  </p>

  <pre>{`
body {
  background-color: #f5f5f5;
}

section {
  background-color: rgba(0, 0, 0, 0.05);
}
`}</pre>

  <h3>🖼️ Background Image</h3>
  <p>
    To use an image as a background, apply the <code>background-image</code> property. You can use URLs to local files or external sources.
  </p>

  <pre>{`
.hero {
  background-image: url("images/banner.jpg");
}
`}</pre>

  <h3>🔁 Background Repeat</h3>
  <p>
    By default, background images repeat both vertically and horizontally. You can control this with <code>background-repeat</code>.
  </p>

  <pre>{`
background-repeat: repeat;      /* default */
background-repeat: no-repeat;
background-repeat: repeat-x;
background-repeat: repeat-y;
`}</pre>

  <h3>🎯 Background Position</h3>
  <p>
    Control where the image appears inside the element using <code>background-position</code>. You can use keywords or coordinate values.
  </p>

  <pre>{`
background-position: center;
background-position: top right;
background-position: 20px 30px;
`}</pre>

  <h3>📏 Background Size</h3>
  <p>
    This property defines the dimensions of the background image. The most useful value is <code>cover</code>, which ensures the image covers the entire container.
  </p>

  <pre>{`
background-size: auto;
background-size: cover;
background-size: contain;
background-size: 100px 80px;
`}</pre>

  <h3>📌 Background Attachment</h3>
  <p>
    This determines whether the background scrolls with the page or stays fixed.
  </p>

  <pre>{`
background-attachment: scroll;  /* default */
background-attachment: fixed;   /* sticks in place */
background-attachment: local;
`}</pre>

  <h3>🧩 Background Shorthand</h3>
  <p>
    Combine all background-related properties in one rule using the shorthand property:
  </p>

  <pre>{`
background: url("bg.jpg") no-repeat center/cover fixed;
`}</pre>

  <h3>🌈 CSS Gradients as Backgrounds</h3>
  <p>
    CSS allows linear and radial gradients to be used as background images. These are generated dynamically and do not require image files.
  </p>

  <pre>{`
/* Linear Gradient */
background: linear-gradient(to right, #ff9966, #ff5e62);

/* Radial Gradient */
background: radial-gradient(circle, #1e3c72, #2a5298);
`}</pre>

  <h3>📚 Multiple Background Layers</h3>
  <p>
    You can stack multiple backgrounds by separating them with commas. The first one is on top.
  </p>

  <pre>{`
background: 
  url("pattern.png") repeat,
  linear-gradient(to bottom, #ffffff, #e0e0e0);
`}</pre>

  <h3>🔒 Best Practices for Using Backgrounds</h3>
  <ul>
    <li>Use high-resolution images for large containers or full-screen designs</li>
    <li>Always define <code>background-size</code> to avoid stretching/distortion</li>
    <li>Set fallback <code>background-color</code> in case image fails to load</li>
    <li>Keep performance in mind — don’t overload pages with too many images</li>
    <li>Use SVGs or gradient backgrounds for lightweight visual enhancements</li>
  </ul>

  <h3>🧑‍💻 Real-World Example: Hero Section</h3>
  <pre>{`
.hero-banner {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url("banner.jpg") center/cover no-repeat;
  height: 400px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
`}</pre>

  <h3>🛠️ Tools for Background Design</h3>
  <ul>
    <li><a href="https://cssgradient.io" target="_blank" rel="noopener noreferrer">CSS Gradient Generator</a></li>
    <li><a href="https://www.heropatterns.com" target="_blank" rel="noopener noreferrer">Hero Patterns (SVG)</a></li>
    <li><a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash (Free Images)</a></li>
  </ul>

  <h3>🧠 Accessibility Consideration</h3>
  <p>
    Ensure that background images don’t reduce text readability. Avoid overlaying light text on light backgrounds, and consider using dark translucent overlays.
  </p>

  <pre>{`
.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* dark layer over image */
}
`}</pre>

  <h3>📌 Summary</h3>
  <ul>
    <li>CSS backgrounds offer powerful tools for visual design</li>
    <li>You can style backgrounds with colors, images, gradients, or layers</li>
    <li>Control repetition, size, position, and scrolling behavior</li>
    <li>Always consider performance and accessibility</li>
    <li>Use shorthand to reduce code repetition</li>
  </ul>

  <p>
    Background styling is a fundamental part of modern web design. From subtle textures to full-page hero images and animated gradients, CSS provides endless creative possibilities. Learning how to combine and control background layers allows you to create stunning visuals and polished interfaces that enhance user engagement and brand identity.
  </p>
</section>


<section id="borders">
  <h2>Borders</h2>

  <p>
    Borders in CSS are visual lines drawn around elements. They can define boundaries, create separation, enhance focus, or simply serve as decorative accents. CSS offers a powerful set of tools for controlling border style, width, color, radius, and more. Borders can be applied to any block or inline element and are fundamental to layout design, especially when working with cards, buttons, containers, input fields, and component boundaries.
  </p>

  <p>
    At the most basic level, a border is composed of:
    <ul>
      <li><strong>Style:</strong> Solid, dashed, dotted, double, etc.</li>
      <li><strong>Width:</strong> Thickness of the border</li>
      <li><strong>Color:</strong> Any valid CSS color</li>
    </ul>
    You can define each of these individually using <code>border-style</code>, <code>border-width</code>, and <code>border-color</code>, or all together using the <code>border</code> shorthand.
  </p>

  <h3>🔹 Basic Border Syntax</h3>

  <pre>{`
/* Individual properties */
div {
  border-width: 2px;
  border-style: solid;
  border-color: black;
}

/* Shorthand */
div {
  border: 2px solid black;
}
`}</pre>

  <h3>🎨 Border Styles</h3>
  <p>
    CSS offers several styles for borders:
    <ul>
      <li><code>none</code> – No border (default)</li>
      <li><code>solid</code> – A single solid line</li>
      <li><code>dashed</code> – A dashed line</li>
      <li><code>dotted</code> – A dotted line</li>
      <li><code>double</code> – Two solid lines</li>
      <li><code>groove</code>, <code>ridge</code>, <code>inset</code>, <code>outset</code> – 3D-style borders</li>
    </ul>
  </p>

  <pre>{`
.card {
  border: 3px dashed teal;
}
`}</pre>

  <h3>🧱 Border Width</h3>
  <p>
    You can set the width in pixels, ems, or other units. Keywords like <code>thin</code>, <code>medium</code>, and <code>thick</code> are also supported but less precise.
  </p>

  <pre>{`
input {
  border-width: 4px;
}
`}</pre>

  <h3>🎨 Border Color</h3>
  <p>
    You can use any valid CSS color format — hex, named color, RGB, HSL, or CSS variables.
  </p>

  <pre>{`
button {
  border-color: #ff5733;
}
`}</pre>

  <h3>📏 Borders on Individual Sides</h3>
  <p>
    CSS allows you to apply borders to individual sides:
  </p>

  <pre>{`
div {
  border-top: 2px solid red;
  border-right: 2px dashed green;
  border-bottom: 2px dotted blue;
  border-left: 2px double black;
}
`}</pre>

  <h3>📐 Rounded Borders (Border Radius)</h3>
  <p>
    <code>border-radius</code> is used to round the corners of an element. You can apply it globally or per-corner.
  </p>

  <pre>{`
.card {
  border: 2px solid #ccc;
  border-radius: 10px;
}

/* Per-corner */
.card {
  border-radius: 10px 0 10px 0;
}
`}</pre>

  <h3>🌀 Circular and Elliptical Borders</h3>
  <p>
    To create circles or ellipses, set the <code>border-radius</code> to 50% and use equal height and width.
  </p>

  <pre>{`
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #333;
}
`}</pre>

  <h3>💡 Border Shorthand Summary</h3>

  <pre>{`
/* All-in-one */
border: 2px dashed orange;

/* One side */
border-top: 5px solid red;

/* Radius */
border-radius: 12px;
`}</pre>

  <h3>🔁 Real-World Use: Form Styling</h3>
  <p>Forms are a common use case for borders, especially with input fields and buttons:</p>

  <pre>{`
input[type="text"] {
  border: 1px solid #999;
  border-radius: 4px;
  padding: 0.5rem;
  transition: border 0.2s ease-in-out;
}

input[type="text"]:focus {
  border-color: #3498db;
  outline: none;
}
`}</pre>

  <h3>🎨 Gradient Borders (Advanced)</h3>
  <p>
    CSS now supports more advanced techniques for gradient borders using <code>background-clip</code> and pseudo-elements:
  </p>

  <pre>{`
.gradient-border {
  position: relative;
  z-index: 0;
}

.gradient-border::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(to right, red, blue);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}
`}</pre>

  <h3>🧠 Best Practices</h3>
  <ul>
    <li>Use subtle borders for clean UI — avoid harsh contrast unless highlighting</li>
    <li>Keep border-radius consistent for branding and cohesion</li>
    <li>Use <code>border-bottom</code> only for minimalist forms and nav menus</li>
    <li>Avoid excessive border width which may interfere with padding/margins</li>
    <li>Use transitions for hover/focus to enhance interactivity</li>
  </ul>

  <h3>🧩 Border vs Outline</h3>
  <p>
    <code>outline</code> is another CSS property similar to borders but:
    <ul>
      <li>Does not take up space (not part of the box model)</li>
      <li>Cannot be styled as much (no radius)</li>
      <li>Mostly used for accessibility (focus indication)</li>
    </ul>

    <pre>{`
button:focus {
  outline: 2px solid #4caf50;
}
`}</pre>
  </p>

  <h3>🧠 Accessibility Consideration</h3>
  <p>
    Ensure focus styles are visible and legible. Don’t remove <code>outline</code> unless replacing it with a visible border or box shadow to maintain keyboard accessibility.
  </p>

  <h3>📌 Summary</h3>
  <ul>
    <li>CSS borders let you add lines around elements with control over color, width, and style</li>
    <li>Use border-radius for rounded corners, circular avatars, and elegant UI</li>
    <li>You can style each side independently for complex layouts</li>
    <li>Use gradient borders and animations for advanced UI techniques</li>
    <li>Always prioritize accessibility when overriding default focus styles</li>
  </ul>

  <p>
    Borders are one of the simplest yet most versatile tools in CSS. From subtle accents on form fields to full-blown design enhancements with gradients and animations, mastering borders will empower you to create layouts that are clean, professional, and visually pleasing.
  </p>
</section>


<section id="margins">
  <h2>Margins & Padding</h2>

  <p>
    Margins and padding are two of the most fundamental concepts in CSS layout design. They belong to the CSS Box Model — a conceptual framework that determines how elements are displayed on a webpage. Together, margins and padding define how elements are spaced apart and how their internal content is positioned. Mastering these two properties is critical for creating responsive, accessible, and visually balanced designs.
  </p>

  <p>
    Here's a quick way to differentiate them:
    <ul>
      <li><strong>Margin:</strong> Space <em>outside</em> the element (pushing it away from others)</li>
      <li><strong>Padding:</strong> Space <em>inside</em> the element (pushing content inward from the border)</li>
    </ul>
  </p>

  <h3>📦 The CSS Box Model Refresher</h3>

  <p>
    The box model includes four components:
    <ol>
      <li><strong>Content</strong> – The actual text or image</li>
      <li><strong>Padding</strong> – Space between the content and the border</li>
      <li><strong>Border</strong> – The outline surrounding the padding</li>
      <li><strong>Margin</strong> – Space between this element and its neighbors</li>
    </ol>
  </p>

  <img src="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/box-model.png" alt="CSS Box Model Diagram" style={{maxWidth: '100%', marginBottom: '20px'}} />

  <h3>🔹 Padding</h3>
  <p>
    Padding is used to add spacing <strong>inside</strong> an element’s border. This is especially useful for making buttons, text boxes, cards, and containers look more spacious and readable.
  </p>

  <pre>{`
.button {
  padding: 10px;          /* applies to all sides */
  padding: 10px 20px;     /* vertical | horizontal */
  padding: 10px 15px 5px; /* top | left & right | bottom */
  padding: 5px 10px 15px 20px; /* top | right | bottom | left */
}
`}</pre>

  <h3>🔹 Margin</h3>
  <p>
    Margins control the space <strong>outside</strong> the border of an element, pushing it away from adjacent elements. It’s great for positioning blocks or separating sections in your layout.
  </p>

  <pre>{`
.card {
  margin: 20px;              /* all sides */
  margin: 10px 30px;         /* vertical | horizontal */
  margin: 10px 20px 30px 40px; /* top | right | bottom | left */
}
`}</pre>

  <h3>🧠 Margin Collapsing</h3>
  <p>
    One tricky concept is <strong>margin collapsing</strong>. When two vertical margins meet (such as two stacked block elements), only the larger of the two margins will be used. This behavior does not apply to padding.
  </p>

  <pre>{`
/* If h1 has 30px margin-bottom and p has 20px margin-top,
   the total vertical space is NOT 50px, but 30px. */
h1 {
  margin-bottom: 30px;
}

p {
  margin-top: 20px;
}
`}</pre>

  <h3>📐 Padding vs Margin Use Cases</h3>
  <ul>
    <li>Use <code>padding</code> to control internal spacing of content inside an element.</li>
    <li>Use <code>margin</code> to control spacing between elements in the layout.</li>
    <li><code>padding</code> affects background area and border size.</li>
    <li><code>margin</code> does not affect the background color or border.</li>
  </ul>

  <h3>📏 Padding and Margin on Individual Sides</h3>
  <p>
    Just like borders, you can control padding and margin on each side separately:
  </p>

  <pre>{`
section {
  padding-top: 20px;
  padding-right: 15px;
  padding-bottom: 25px;
  padding-left: 10px;

  margin-top: 30px;
  margin-bottom: 30px;
}
`}</pre>

  <h3>📦 Box-Sizing Property</h3>
  <p>
    By default, <code>padding</code> and <code>border</code> add to the element’s total width and height. Use <code>box-sizing: border-box;</code> to include padding and border inside the defined width/height.
  </p>

  <pre>{`
* {
  box-sizing: border-box;
}
`}</pre>

  <h3>🔁 Responsive Layout with Margin & Padding</h3>
  <p>
    Use relative units like <code>%</code>, <code>em</code>, <code>rem</code>, or media queries to ensure spacing works across screen sizes.
  </p>

  <pre>{`
.container {
  padding: 2rem;
  margin: auto;
  max-width: 1200px;
}
`}</pre>

  <h3>💡 Best Practices</h3>
  <ul>
    <li>Use consistent spacing systems (8px or 4px scale is common)</li>
    <li>Avoid excessive margin nesting — use spacing utilities or classes</li>
    <li>Use CSS Grid or Flexbox to manage spacing between items instead of chaining margin/padding rules</li>
    <li>Keep typography legible by adding sufficient <code>padding</code> around text blocks</li>
    <li>Test in both desktop and mobile breakpoints</li>
  </ul>

  <h3>🧠 Utility Class Approach</h3>
  <p>
    Frameworks like Bootstrap and Tailwind provide utility classes for spacing like:
    <ul>
      <li><code>m-4</code> = <code>margin: 1rem;</code></li>
      <li><code>pt-2</code> = <code>padding-top: 0.5rem;</code></li>
      <li><code>mx-auto</code> = horizontal centering</li>
    </ul>
    You can apply these ideas to your own class naming system for consistency.
  </p>

  <h3>🧑‍💻 Real-World Example: Card Component</h3>
  <pre>{`
.card {
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
`}</pre>

  <h3>📌 Summary</h3>
  <ul>
    <li><strong>Padding</strong> controls spacing inside the element, and affects background/border area</li>
    <li><strong>Margin</strong> controls spacing outside the element, and does not affect background</li>
    <li><code>box-sizing: border-box</code> simplifies layout management by keeping size calculations predictable</li>
    <li>Use relative units for responsive design and consistent spacing</li>
    <li>Avoid margin collapsing surprises by using spacing patterns and spacing utility classes</li>
  </ul>

  <p>
    Understanding margins and padding gives you the control to space content exactly how you want. As your layouts get more complex — especially when working with grid or flexbox — getting your spacing strategy right is what takes your site from amateur to professional.
  </p>
</section>


<section id="text">
  <h2>Text Styling</h2>

  <p>
    Text is one of the most fundamental elements of any website. Whether you're reading a blog post, filling out a form, or interacting with navigation links, you're engaging with styled text. CSS gives you a wide range of properties to control the appearance of text, including alignment, decoration, transformation, spacing, shadow, and overflow. Knowing how to properly style text is key to ensuring readability, accessibility, and aesthetic balance across all screen sizes and devices.
  </p>

  <p>
    Good typography goes beyond choosing a nice font. It’s about line height, alignment, spacing, emphasis, and creating a clear visual hierarchy that guides users through content. CSS makes this possible with declarative properties that allow you to build highly readable and accessible interfaces.
  </p>

  <h3>📍 Basic Text Properties</h3>

  <ul>
    <li><strong><code>color</code></strong> — sets the font color</li>
    <li><strong><code>text-align</code></strong> — aligns text (left, right, center, justify)</li>
    <li><strong><code>text-decoration</code></strong> — applies underline, overline, line-through</li>
    <li><strong><code>text-transform</code></strong> — controls capitalization (uppercase, lowercase, capitalize)</li>
    <li><strong><code>letter-spacing</code></strong> — spacing between characters</li>
    <li><strong><code>word-spacing</code></strong> — spacing between words</li>
    <li><strong><code>line-height</code></strong> — spacing between lines of text</li>
    <li><strong><code>text-indent</code></strong> — adds indentation to the first line</li>
    <li><strong><code>text-shadow</code></strong> — adds shadow effects to text</li>
    <li><strong><code>white-space</code></strong> — controls text wrapping and spacing</li>
    <li><strong><code>direction</code></strong> — sets text direction (LTR or RTL)</li>
  </ul>

  <h3>🎯 Text Alignment</h3>

  <pre>{`
p {
  text-align: left;      /* default */
  text-align: center;
  text-align: right;
  text-align: justify;
}
`}</pre>

  <p>
    Use <code>justify</code> for evenly distributed text like newspapers or article columns. Centered text is best for headlines or limited content.
  </p>

  <h3>🖍️ Text Decoration</h3>

  <pre>{`
a {
  text-decoration: none;      /* removes underline */
}

p {
  text-decoration: underline;
  text-decoration: line-through;
  text-decoration: overline;
}
`}</pre>

  <p>
    This property is especially useful for links and visual emphasis like strikethrough prices.
  </p>

  <h3>🔠 Text Transformation</h3>

  <pre>{`
h1 {
  text-transform: uppercase;
}

h2 {
  text-transform: lowercase;
}

p {
  text-transform: capitalize;
}
`}</pre>

  <p>
    Use transformations to maintain consistency in case without changing the actual content in the HTML.
  </p>

  <h3>📏 Letter and Word Spacing</h3>

  <pre>{`
p {
  letter-spacing: 0.05em;
  word-spacing: 0.2em;
}
`}</pre>

  <p>
    Use spacing carefully to improve readability and rhythm. Overdoing it can make the text feel disjointed or hard to scan.
  </p>

  <h3>📐 Line Height</h3>

  <p>
    One of the most important properties for improving readability:
  </p>

  <pre>{`
p {
  line-height: 1.5; /* or in px/rem/em */
}
`}</pre>

  <p>
    A good rule of thumb is 1.4 to 1.6 for paragraphs. Use unitless values for scalability with font size.
  </p>

  <h3>🧾 Text Indentation</h3>

  <pre>{`
p {
  text-indent: 30px;
}
`}</pre>

  <p>
    Often used in editorial layouts to mimic traditional print paragraph indentation.
  </p>

  <h3>🌫️ Text Shadows</h3>

  <pre>{`
h1 {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
`}</pre>

  <p>
    The <code>text-shadow</code> property takes horizontal offset, vertical offset, blur radius, and color. You can even stack multiple shadows.
  </p>

  <h3>🔄 White Space and Overflow</h3>

  <pre>{`
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`}</pre>

  <p>
    This is commonly used for truncating text in UI components like buttons or previews.
  </p>

  <h3>🧠 Advanced Use: Responsive Typography</h3>

  <p>
    Use relative units like <code>em</code>, <code>rem</code>, and viewport units (<code>vw</code>) to ensure scalable, mobile-friendly typography:
  </p>

  <pre>{`
html {
  font-size: 16px;
}

h1 {
  font-size: 2.5rem; /* = 40px */
}

p {
  font-size: 1rem; /* = 16px */
}
`}</pre>

  <h3>🎨 Real-World Example: Article Styling</h3>

  <pre>{`
.article p {
  font-size: 1.125rem;
  line-height: 1.75;
  text-align: justify;
  text-indent: 2em;
  color: #333;
}

.article blockquote {
  font-style: italic;
  border-left: 4px solid #ccc;
  padding-left: 1rem;
  margin: 1.5rem 0;
}
`}</pre>

  <p>
    This mimics a well-structured magazine or blog article for better reading flow.
  </p>

  <h3>🧑‍🎨 Typography Best Practices</h3>

  <ul>
    <li>Use readable font sizes (16px is the minimum standard)</li>
    <li>Apply sufficient line-height for body text</li>
    <li>Use a max line width of ~60–75 characters for comfortable reading</li>
    <li>Limit the use of <code>text-transform: uppercase</code> to small content like buttons</li>
    <li>Use contrast ratios for accessibility (WCAG: minimum 4.5:1 for text)</li>
  </ul>

  <h3>📌 Summary</h3>

  <ul>
    <li>Text styling includes alignment, spacing, transformation, decoration, shadows, and more</li>
    <li>Readability, accessibility, and hierarchy should guide your typography decisions</li>
    <li>Always use responsive units to scale text across devices</li>
    <li>Consider semantic HTML (like <code>&lt;blockquote&gt;</code>, <code>&lt;cite&gt;</code>, <code>&lt;strong&gt;</code>) alongside CSS</li>
  </ul>

  <p>
    Mastering text styling in CSS allows you to build highly legible, visually pleasing, and user-centered web interfaces. Text is often 90% of your website’s content — make it count.
  </p>
</section>


<section id="fonts">
  <h2>Fonts</h2>

  <p>
    Fonts are a vital component of any website's design system. The right font selection can enhance readability, establish brand identity, evoke emotion, and significantly impact user experience. CSS allows you to customize font family, size, weight, style, and more. Whether you’re designing a minimal blog or a bold ecommerce platform, font styling gives you the tools to bring typography to life.
  </p>

  <h3>📚 The Font Stack</h3>
  <p>
    A font stack is a list of fonts that serve as fallbacks in case the first one isn't available on the user’s device. Font stacks are critical for maintaining consistency across platforms and devices.
  </p>

  <pre>{`
p {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
`}</pre>

  <ul>
    <li><strong>First</strong>: Preferred font (e.g., "Helvetica Neue")</li>
    <li><strong>Fallbacks</strong>: Similar fonts</li>
    <li><strong>Generic family</strong>: Category like <code>serif</code>, <code>sans-serif</code>, or <code>monospace</code></li>
  </ul>

  <h3>🎨 Font Families in CSS</h3>
  <p>
    There are five generic font families:
    <ul>
      <li><strong>serif</strong> – fonts with small decorative lines (e.g., Times New Roman)</li>
      <li><strong>sans-serif</strong> – clean, modern fonts (e.g., Arial, Helvetica)</li>
      <li><strong>monospace</strong> – fixed-width fonts (e.g., Courier New)</li>
      <li><strong>cursive</strong> – decorative script fonts</li>
      <li><strong>fantasy</strong> – stylized, novelty fonts</li>
    </ul>
  </p>

  <pre>{`
code {
  font-family: monospace;
}
`}</pre>

  <h3>🌍 Using Web Fonts with @font-face</h3>
  <p>
    You can use custom fonts with the <code>@font-face</code> rule. It allows you to host your own fonts and ensures consistent typography across browsers.
  </p>

  <pre>{`
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2'),
       url('/fonts/MyFont.woff') format('woff');
}

body {
  font-family: 'MyFont', sans-serif;
}
`}</pre>

  <h3>🔠 Google Fonts</h3>
  <p>
    Google Fonts is a popular free service for adding high-quality web fonts to your site.
  </p>

  <p>Add to your HTML:</p>
  <pre>{`
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
`}</pre>

  <p>Then in CSS:</p>
  <pre>{`
body {
  font-family: 'Roboto', sans-serif;
}
`}</pre>

  <h3>📏 Font Size</h3>
  <p>
    Font size determines how large your text appears. Use scalable units such as <code>rem</code>, <code>em</code>, or <code>%</code> instead of fixed <code>px</code> values for better responsiveness.
  </p>

  <pre>{`
html {
  font-size: 16px;
}

h1 {
  font-size: 2rem; /* = 32px */
}
`}</pre>

  <ul>
    <li><strong>px</strong>: Absolute size — not scalable</li>
    <li><strong>em</strong>: Relative to parent element</li>
    <li><strong>rem</strong>: Relative to root element (html)</li>
    <li><strong>%</strong>: Relative to parent element’s font size</li>
  </ul>

  <h3>🧱 Font Weight</h3>
  <p>
    Controls the thickness of the characters.
  </p>

  <pre>{`
p {
  font-weight: normal;   /* 400 */
}

strong {
  font-weight: bold;     /* 700 */
}

h1 {
  font-weight: 300;      /* Light */
}
`}</pre>

  <p>
    Common weight values: <code>100</code> (thin) → <code>900</code> (extra bold). Not all fonts support all weights.
  </p>

  <h3>✨ Font Style</h3>
  <pre>{`
blockquote {
  font-style: italic;
}
`}</pre>

  <p>Options include <code>normal</code>, <code>italic</code>, and <code>oblique</code>.</p>

  <h3>🔤 Font Variant</h3>
  <p>
    Used to style text in small caps:
  </p>

  <pre>{`
p {
  font-variant: small-caps;
}
`}</pre>

  <h3>📐 Line Height and Readability</h3>
  <pre>{`
body {
  line-height: 1.6;
}
`}</pre>

  <p>
    Ideal line height improves readability and should typically be between 1.4 and 1.8 for paragraphs.
  </p>

  <h3>🧠 System Font Stack</h3>
  <p>
    Using system fonts can increase performance by avoiding font loading:
  </p>

  <pre>{`
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
`}</pre>

  <h3>🖍️ Typography Tools</h3>
  <ul>
    <li><a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">Google Fonts</a></li>
    <li><a href="https://type-scale.com" target="_blank" rel="noopener noreferrer">Type Scale Calculator</a></li>
    <li><a href="https://fontjoy.com" target="_blank" rel="noopener noreferrer">Font Pair Generator</a></li>
  </ul>

  <h3>📌 Typography Best Practices</h3>
  <ul>
    <li>Use a maximum of 2–3 font families per project</li>
    <li>Maintain contrast between headings and body text</li>
    <li>Use <code>rem</code> for scalable font sizing</li>
    <li>Balance aesthetics with performance and accessibility</li>
    <li>Choose fonts that support the necessary character sets (especially for multilingual sites)</li>
  </ul>

  <h3>🧑‍💻 Real-World Example: Webpage Font System</h3>

  <pre>{`
:root {
  --font-base: 'Open Sans', sans-serif;
  --font-heading: 'Poppins', sans-serif;
}

body {
  font-family: var(--font-base);
  font-size: 1rem;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 600;
}
`}</pre>

  <h3>📌 Summary</h3>

  <ul>
    <li>Use <code>font-family</code> to create a font stack and define fallback options</li>
    <li>Utilize <code>@font-face</code> or Google Fonts for custom fonts</li>
    <li>Use relative units like <code>rem</code> for responsive font sizing</li>
    <li>Set <code>font-weight</code>, <code>font-style</code>, and <code>line-height</code> for better hierarchy and readability</li>
    <li>Test fonts across devices and screen sizes for visual consistency</li>
  </ul>

  <p>
    Typography is the heart of visual communication on the web. Learning to style fonts properly ensures your content is readable, your message is clear, and your brand is consistent.
  </p>
</section>


<section id="boxmodel">
  <h2>Box Model</h2>

  <p>
    The CSS <strong>Box Model</strong> is one of the most fundamental concepts in web development and layout design. Every element on a web page is a rectangular box, and understanding how these boxes behave is essential to building responsive, structured, and visually appealing layouts. The box model determines how padding, borders, and margins affect the overall size and position of an element, which in turn influences spacing, alignment, and flow within a document.
  </p>

  <h3>📦 Components of the Box Model</h3>

  <p>
    The CSS box model consists of four distinct layers:
    <ul>
      <li><strong>Content</strong> – The text, image, or other actual content inside the element.</li>
      <li><strong>Padding</strong> – The space between the content and the border.</li>
      <li><strong>Border</strong> – The outer boundary surrounding the padding and content.</li>
      <li><strong>Margin</strong> – The space between the element’s border and adjacent elements.</li>
    </ul>
  </p>

  <img src="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/box-model.png" alt="Box Model Diagram" style={{ maxWidth: '100%', margin: '1rem 0' }} />

  <pre>{`
/* Visual representation */
.element {
  margin: 20px;
  border: 5px solid #333;
  padding: 15px;
  width: 200px;
}
`}</pre>

  <p>
    In this example, the total space that the element occupies is:
  </p>
  <pre>{`Total Width = margin + border + padding + content width
           = 20 + 5 + 15 + 200 + 15 + 5 + 20 = 280px`}</pre>

  <h3>📏 Calculating Element Size</h3>

  <p>
    By default, the <code>width</code> and <code>height</code> properties apply only to the <strong>content</strong> area. Padding, borders, and margins are added to this size, which means the actual rendered size is larger than the value you define.
  </p>

  <h3>🔧 Fixing with box-sizing</h3>

  <pre>{`
/* This tells the browser to include padding and border in total width/height */
* {
  box-sizing: border-box;
}
`}</pre>

  <p>
    With <code>box-sizing: border-box;</code>, the width you define <strong>includes</strong> content, padding, and border — which makes layout design significantly easier and more predictable.
  </p>

  <h3>🧪 Box Model Debugging Tools</h3>
  <p>
    All modern browsers include developer tools that let you inspect and visualize the box model. Right-click an element → "Inspect" in Chrome or Firefox → Layout tab.
  </p>

  <h3>📐 Padding vs Margin Revisited</h3>

  <p><strong>Padding</strong> adds space inside the box (and inherits background).</p>
  <p><strong>Margin</strong> adds space outside the box (transparent by default).</p>

  <h3>🧠 Margin Collapsing (Important)</h3>

  <p>
    When vertical margins of two elements meet, only the larger one is used. This is known as margin collapsing.
  </p>

  <pre>{`
h1 {
  margin-bottom: 40px;
}

p {
  margin-top: 30px;
}

/* Total vertical space between h1 and p = 40px, not 70px */
`}</pre>

  <h3>🛠️ Real-World Example: Card Layout</h3>

  <pre>{`
.card {
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
`}</pre>

  <h3>📌 Summary of Best Practices</h3>

  <ul>
    <li>Always use <code>box-sizing: border-box</code> globally to simplify size calculations</li>
    <li>Remember that padding increases element size unless border-box is used</li>
    <li>Use margins to space elements apart, and padding to give inner breathing room</li>
    <li>Use dev tools to debug spacing, especially with nested elements</li>
    <li>Set <code>overflow</code> to <code>auto</code> or <code>hidden</code> to avoid content spilling</li>
  </ul>

  <h3>🚀 Advanced Concepts</h3>

  <ul>
    <li><strong>Overflow:</strong> Determines what happens when content exceeds the box size</li>
    <li><strong>min/max-width:</strong> Constrains box size during resizing</li>
    <li><strong>aspect-ratio:</strong> Helps maintain box proportions (e.g., videos)</li>
  </ul>

  <pre>{`
.container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 1.5rem;
  box-sizing: border-box;
}
`}</pre>

  <h3>📐 Box Model + Flexbox/Grid</h3>

  <p>
    When using layout systems like Flexbox or CSS Grid, understanding box sizing is even more important. Improper padding or margins can break alignment or overflow containers.
  </p>

  <h3>🎯 Real Use: Responsive Boxes</h3>

  <pre>{`
.responsive-box {
  width: 90%;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 800px;
  box-sizing: border-box;
}
`}</pre>

  <p>
    This makes a centered box that adjusts to screen width but respects a maximum size and readable spacing.
  </p>

  <h3>🔎 Performance Tips</h3>

  <ul>
    <li>Use border-box to reduce layout shifts</li>
    <li>Set consistent padding/margin scale (e.g., multiples of 4 or 8px)</li>
    <li>Avoid nested margin collapse by applying padding instead</li>
  </ul>

  <h3>📌 Summary</h3>

  <ul>
    <li>The Box Model consists of content, padding, border, and margin</li>
    <li><code>box-sizing: border-box</code> simplifies sizing calculations</li>
    <li>Padding affects the interior; margin affects exterior spacing</li>
    <li>Use dev tools to understand how CSS is applying box properties</li>
    <li>Avoid unexpected layout bugs by mastering how these layers interact</li>
  </ul>

  <p>
    Understanding the CSS Box Model is like learning how to frame and place your content. Once you grasp it, you can confidently design layout structures that are flexible, consistent, and intuitive. Every element you style is a box — once you master the box model, you master the layout.
  </p>
</section>


<section id="positioning">
  <h2>Positioning</h2>

  <p>
    CSS positioning is the technique that allows developers to control how and where elements are placed within a document. While most web elements follow the normal document flow — stacking vertically and appearing one after another — CSS positioning offers methods to override this flow. With the right use of positioning properties, you can create flexible, layered, interactive layouts such as fixed headers, tooltips, sidebars, popups, and complex page structures.
  </p>

  <h3>📌 Types of Positioning</h3>
  <p>
    The <code>position</code> property in CSS defines how an element is positioned in the document and which additional properties — like <code>top</code>, <code>left</code>, <code>bottom</code>, or <code>right</code> — will affect it. CSS offers five primary positioning types:
  </p>

  <ul>
    <li><strong>static</strong> — Default behavior (element follows normal flow)</li>
    <li><strong>relative</strong> — Offsets element relative to its normal position</li>
    <li><strong>absolute</strong> — Removes element from flow, positions relative to closest positioned ancestor</li>
    <li><strong>fixed</strong> — Positions element relative to the viewport</li>
    <li><strong>sticky</strong> — Switches between relative and fixed based on scroll</li>
  </ul>

  <h3>1️⃣ <code>static</code> Positioning</h3>
  <p>
    This is the default positioning mode for all elements. Elements appear in the natural document flow and are not affected by <code>top</code>, <code>right</code>, <code>bottom</code>, or <code>left</code>.
  </p>

  <pre>{`
div {
  position: static;
}
`}</pre>

  <h3>2️⃣ <code>relative</code> Positioning</h3>
  <p>
    <code>relative</code> positions an element relative to its original location in the document flow. It stays in the flow but is visually offset.
  </p>

  <pre>{`
.box {
  position: relative;
  top: 20px;
  left: 10px;
}
`}</pre>

  <p>
    This is especially useful when creating container reference points for absolutely positioned child elements.
  </p>

  <h3>3️⃣ <code>absolute</code> Positioning</h3>
  <p>
    This removes the element from normal flow and positions it relative to the nearest ancestor with <code>position: relative</code>, <code>absolute</code>, or <code>fixed</code>. If no such ancestor exists, it will position relative to the <code>&lt;html&gt;</code> element (document root).
  </p>

  <pre>{`
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
`}</pre>

  <p>
    This is widely used for overlays, dropdowns, tooltips, and image captions.
  </p>

  <h3>4️⃣ <code>fixed</code> Positioning</h3>
  <p>
    <code>fixed</code> positions an element relative to the <strong>viewport</strong> (the visible area of the screen), and it does not scroll with the page.
  </p>

  <pre>{`
.sticky-header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
}
`}</pre>

  <p>
    Commonly used for sticky navigation bars, floating buttons, and persistent messages.
  </p>

  <h3>5️⃣ <code>sticky</code> Positioning</h3>
  <p>
    <code>sticky</code> is a hybrid of <code>relative</code> and <code>fixed</code>. It behaves like <code>relative</code> until it hits a threshold (e.g., <code>top: 0</code>), then becomes <code>fixed</code>.
  </p>

  <pre>{`
.sticky-note {
  position: sticky;
  top: 10px;
}
`}</pre>

  <p>
    Great for table headers, sidebar widgets, and section labels that need to stay in view temporarily.
  </p>

  <h3>📐 Common Properties Used With Positioning</h3>
  <ul>
    <li><code>top</code> – distance from the top edge of the containing block</li>
    <li><code>right</code> – distance from the right edge</li>
    <li><code>bottom</code> – distance from the bottom edge</li>
    <li><code>left</code> – distance from the left edge</li>
    <li><code>z-index</code> – controls the stacking order of overlapping elements</li>
  </ul>

  <h3>🎯 <code>z-index</code> and Stacking Context</h3>
  <p>
    When elements overlap, the <code>z-index</code> property defines which element appears on top. A higher value means it’s layered above others.
  </p>

  <pre>{`
.modal {
  position: absolute;
  z-index: 1000;
}
`}</pre>

  <p>
    Note: <code>z-index</code> only works on positioned elements (not static).
  </p>

  <h3>🧑‍💻 Real-World Use: Tooltip Component</h3>

  <pre>{`
.tooltip-container {
  position: relative;
}

.tooltip-text {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #000;
  color: white;
  padding: 0.5rem;
  white-space: nowrap;
  z-index: 10;
}
`}</pre>

  <h3>💡 Best Practices</h3>
  <ul>
    <li>Use <code>relative</code> on containers when using <code>absolute</code> for inner elements</li>
    <li>Reserve <code>fixed</code> and <code>sticky</code> for key UI components like navbars or CTAs</li>
    <li>Keep <code>z-index</code> ranges logical to avoid layering bugs</li>
    <li>Try to avoid over-positioning — sometimes Flexbox/Grid is more appropriate</li>
  </ul>

  <h3>🔎 Common Pitfalls</h3>
  <ul>
    <li><strong>Absolute positioned elements</strong> require a reference point. Without a parent with a defined position, they’ll anchor to the page itself.</li>
    <li><strong>Sticky positioning</strong> won’t work if the parent’s overflow is hidden.</li>
    <li>Use <code>overflow</code> wisely when working with positioned elements that might expand beyond boundaries.</li>
  </ul>

  <h3>📌 Summary</h3>
  <ul>
    <li>CSS positioning lets you override the normal document flow</li>
    <li><code>static</code> is the default; <code>relative</code> offsets without removing from flow</li>
    <li><code>absolute</code> and <code>fixed</code> remove the element from flow and allow precise placement</li>
    <li><code>sticky</code> enables scroll-based dynamic positioning</li>
    <li>Use <code>z-index</code> to control which elements appear above others</li>
  </ul>

  <p>
    Positioning is a powerful tool when used effectively. Combined with layout systems like Flexbox or Grid, CSS positioning allows you to build intuitive, dynamic, and responsive interfaces that guide the user’s attention and improve usability.
  </p>
</section>


<section id="display">
  <h2>Display & Visibility</h2>

  <p>
    The <strong>display</strong> property is one of the most fundamental and powerful properties in CSS. It determines how an element is visually rendered in the document — whether it appears as a block, inline, grid, flex container, or is hidden entirely. Mastering the <code>display</code> property gives you full control over layout, element flow, and responsiveness.
  </p>

  <h3>🧱 Default Display Values</h3>
  <p>
    Every HTML element has a default display value. For example:
    <ul>
      <li><code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;section&gt;</code>: <strong>block</strong></li>
      <li><code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code>: <strong>inline</strong></li>
      <li><code>&lt;li&gt;</code>: <strong>list-item</strong></li>
      <li><code>&lt;table&gt;</code>: <strong>table</strong></li>
    </ul>
    You can override these using the <code>display</code> property to change how the element behaves.
  </p>

  <h3>🔹 Common Display Values</h3>

  <ul>
    <li><code>block</code> – Takes full width; starts on a new line</li>
    <li><code>inline</code> – Stays in the flow with other elements</li>
    <li><code>inline-block</code> – Flows inline but accepts width/height</li>
    <li><code>none</code> – Hides the element entirely (removed from flow)</li>
    <li><code>flex</code> – Turns element into a flex container</li>
    <li><code>grid</code> – Turns element into a grid container</li>
    <li><code>inline-flex</code> / <code>inline-grid</code> – Same as above but inline</li>
    <li><code>table</code>, <code>table-row</code>, <code>table-cell</code> – Mimic table structure</li>
  </ul>

  <h3>🧱 <code>block</code></h3>
  <p>
    Block-level elements occupy the full width of their container and start on a new line.
  </p>

  <pre>{`
h1 {
  display: block;
}
`}</pre>

  <h3>📏 <code>inline</code></h3>
  <p>
    Inline elements only take up as much width as needed. They do not accept width or height values.
  </p>

  <pre>{`
a {
  display: inline;
}
`}</pre>

  <h3>📐 <code>inline-block</code></h3>
  <p>
    Acts like inline but allows width and height to be set.
  </p>

  <pre>{`
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
}
`}</pre>

  <h3>🚫 <code>none</code></h3>
  <p>
    Completely removes the element from the layout and DOM flow.
  </p>

  <pre>{`
.modal {
  display: none;
}
`}</pre>

  <h3>📦 <code>flex</code> & <code>grid</code></h3>
  <p>
    Used to create modern layout systems. These display types turn the container into a powerful layout engine.
  </p>

  <pre>{`
.container {
  display: flex;
  gap: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
`}</pre>

  <h3>🧩 <code>table</code> Layouts</h3>
  <p>
    You can mimic table layouts using CSS display properties.
  </p>

  <pre>{`
.row {
  display: table-row;
}

.cell {
  display: table-cell;
}
`}</pre>

  <h3>🕵️ Visibility: The Companion to Display</h3>
  <p>
    The <code>visibility</code> property allows you to hide elements while keeping their space in the layout. Unlike <code>display: none</code>, it doesn’t remove the element from the flow.
  </p>

  <ul>
    <li><code>visible</code> – Default</li>
    <li><code>hidden</code> – Hides the element but keeps its space</li>
  </ul>

  <pre>{`
.alert {
  visibility: hidden;
}
`}</pre>

  <h3>📏 Difference: display vs visibility</h3>

  <ul>
    <li><code>display: none</code> – Hides element and removes from layout</li>
    <li><code>visibility: hidden</code> – Hides element but retains layout space</li>
  </ul>

  <h3>👨‍💻 Real-World Example: Toggle Menu</h3>

  <pre>{`
.menu {
  display: none;
}

.menu.open {
  display: block;
}
`}</pre>

  <p>
    This technique is commonly used with JavaScript or React state to toggle UI components.
  </p>

  <h3>🧠 Advanced Tips</h3>

  <ul>
    <li>Use <code>inline-block</code> for buttons that need sizing but stay in a row</li>
    <li>Set <code>display: none</code> for modals, dropdowns, and tabs to hide until triggered</li>
    <li>Use media queries with display values to build responsive designs</li>
  </ul>

  <h3>📌 Summary</h3>

  <ul>
    <li><code>display</code> controls how elements appear in the document flow</li>
    <li><code>block</code> and <code>inline</code> are foundational behaviors</li>
    <li><code>flex</code> and <code>grid</code> are used for advanced layouts</li>
    <li><code>display: none</code> removes an element entirely; <code>visibility: hidden</code> hides it while preserving space</li>
  </ul>

  <p>
    Mastering the display property is crucial for modern CSS development. It’s the key to building layouts that are flexible, clean, and adaptable across all device sizes. Whether you're hiding a mobile menu or designing a complex grid of components, the display property is always at the center of your CSS strategy.
  </p>
</section>

<section id="flexbox">
  <h2>Flexbox</h2>

  <p>
    Flexbox, or the <strong>CSS Flexible Box Layout Module</strong>, is one of the most powerful and widely used tools for layout in modern web development. It was created to improve the way we align, distribute, and space items in a container — especially when building responsive, one-dimensional layouts.
  </p>

  <p>
    Unlike traditional block and inline models that rely heavily on floats or positioning hacks, Flexbox offers an intuitive approach that automatically adjusts child items based on available space. Whether you're aligning buttons, centering content, or distributing navigation links evenly, Flexbox gives you precision and flexibility.
  </p>

  <h3>📦 Flex Container Basics</h3>

  <p>
    To use Flexbox, set <code>display: flex</code> on a container. Its immediate children become <strong>flex items</strong>.
  </p>

  <pre>{`
.flex-container {
  display: flex;
}
`}</pre>

  <p>
    Once an element is a flex container, a wide range of layout capabilities become available. These are controlled via properties applied to the container and its items.
  </p>

  <h3>🔧 Container Properties</h3>

  <ul>
    <li><code>flex-direction</code> – row | column | row-reverse | column-reverse</li>
    <li><code>flex-wrap</code> – nowrap | wrap | wrap-reverse</li>
    <li><code>justify-content</code> – main axis alignment</li>
    <li><code>align-items</code> – cross axis alignment</li>
    <li><code>align-content</code> – alignment of multiple lines</li>
    <li><code>gap</code> – spacing between flex items</li>
  </ul>

  <h3>1️⃣ <code>flex-direction</code></h3>

  <pre>{`
.flex-container {
  flex-direction: row;         /* default */
  flex-direction: column;
}
`}</pre>

  <p>
    This sets the direction of the main axis. Use <code>row</code> for horizontal and <code>column</code> for vertical alignment.
  </p>

  <h3>2️⃣ <code>flex-wrap</code></h3>

  <pre>{`
.flex-container {
  flex-wrap: wrap;
}
`}</pre>

  <p>
    This allows items to wrap to a new line if there isn't enough space in a single row or column.
  </p>

  <h3>3️⃣ <code>justify-content</code></h3>

  <pre>{`
.flex-container {
  justify-content: flex-start;     /* default */
  justify-content: center;
  justify-content: flex-end;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;
}
`}</pre>

  <p>
    This property aligns items along the main axis (horizontal by default).
  </p>

  <h3>4️⃣ <code>align-items</code></h3>

  <pre>{`
.flex-container {
  align-items: stretch;         /* default */
  align-items: flex-start;
  align-items: center;
  align-items: flex-end;
  align-items: baseline;
}
`}</pre>

  <p>
    Aligns items along the cross axis (vertical by default). Great for vertical centering.
  </p>

  <h3>5️⃣ <code>gap</code></h3>

  <pre>{`
.flex-container {
  gap: 1rem;
}
`}</pre>

  <p>
    Adds spacing between flex items — a clean alternative to using margins.
  </p>

  <h3>🔧 Flex Item Properties</h3>

  <ul>
    <li><code>flex</code> – shorthand for <code>flex-grow</code>, <code>flex-shrink</code>, and <code>flex-basis</code></li>
    <li><code>order</code> – sets the order in which items appear</li>
    <li><code>align-self</code> – overrides <code>align-items</code> for a single item</li>
  </ul>

  <h3>1️⃣ <code>flex</code> (shorthand)</h3>

  <pre>{`
.item {
  flex: 1;  /* grow, shrink, basis */
}
`}</pre>

  <p>
    Makes all items share available space evenly. You can also write:
  </p>

  <pre>{`
.item {
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 100px;
}
`}</pre>

  <h3>2️⃣ <code>order</code></h3>

  <pre>{`
.item:nth-child(3) {
  order: -1;  /* appears first */
}
`}</pre>

  <p>
    Reorders items visually without changing HTML structure.
  </p>

  <h3>3️⃣ <code>align-self</code></h3>

  <pre>{`
.item {
  align-self: flex-end;
}
`}</pre>

  <p>
    Overrides alignment set by <code>align-items</code> for a single item.
  </p>

  <h3>🧠 Real-World Example: Responsive Nav Bar</h3>

  <pre>{`
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
`}</pre>

  <p>
    This layout places your logo on the left and navigation links on the right, perfectly spaced.
  </p>

  <h3>📏 Responsive Column Layout</h3>

  <pre>{`
.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.column {
  flex: 1 1 300px;
}
`}</pre>

  <p>
    This creates flexible columns that adjust to screen size without breaking.
  </p>

  <h3>📌 Summary</h3>

  <ul>
    <li><code>display: flex</code> creates a flex container</li>
    <li>Use <code>flex-direction</code> and <code>wrap</code> to control layout flow</li>
    <li>Align items with <code>justify-content</code> and <code>align-items</code></li>
    <li>Use <code>flex</code> and <code>gap</code> to create proportional, spaced layouts</li>
    <li>Make layouts responsive by combining Flexbox with media queries or relative units</li>
  </ul>

  <p>
    Flexbox is a game-changer for layout in CSS. Its simplicity, combined with powerful control over alignment, spacing, and distribution, makes it an essential tool in any front-end developer’s toolkit. Once you master Flexbox, creating responsive and dynamic layouts becomes not just possible — but enjoyable.
  </p>
</section>



<section id="grid">
  <h2>CSS Grid</h2>

  <p>
    CSS Grid Layout — often referred to simply as <strong>Grid</strong> — is a two-dimensional layout system that allows you to build web interfaces with rows and columns. It is one of the most powerful and game-changing features of modern CSS. While Flexbox is great for one-dimensional layouts (either horizontal or vertical), Grid allows for full control over both dimensions simultaneously, making it ideal for dashboards, galleries, cards, page sections, and more.
  </p>

  <h3>🧱 Grid Basics</h3>
  <p>
    A grid container is created by setting <code>display: grid</code> or <code>display: inline-grid</code> on an element. Then, you define columns and rows using properties like <code>grid-template-columns</code> and <code>grid-template-rows</code>.
  </p>

  <pre>{`
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 1rem;
}
`}</pre>

  <p>
    This creates a layout with three equal-width columns and automatic row heights, with a 1rem gap between grid cells.
  </p>

  <h3>📐 Key Properties of Grid Containers</h3>

  <ul>
    <li><code>grid-template-columns</code></li>
    <li><code>grid-template-rows</code></li>
    <li><code>grid-column-gap</code> / <code>grid-row-gap</code> / <code>gap</code></li>
    <li><code>grid-auto-rows</code> / <code>grid-auto-columns</code></li>
    <li><code>grid-template-areas</code></li>
    <li><code>justify-items</code> / <code>align-items</code> / <code>place-items</code></li>
  </ul>

  <h3>🔢 Fractional Units (fr)</h3>

  <p>
    The <code>fr</code> unit represents a fraction of the available space. It's incredibly useful for responsive layouts.
  </p>

  <pre>{`
grid-template-columns: 1fr 2fr;  /* two columns, second one is twice as wide */
`}</pre>

  <h3>🔁 Repeat() Function</h3>

  <p>
    Use <code>repeat()</code> to reduce repetition in your code.
  </p>

  <pre>{`
grid-template-columns: repeat(4, 1fr);  /* Four equal columns */
`}</pre>

  <h3>🧍‍♂️ Placing Items on the Grid</h3>

  <p>
    You can manually place items using:
  </p>

  <ul>
    <li><code>grid-column-start</code> / <code>grid-column-end</code></li>
    <li><code>grid-row-start</code> / <code>grid-row-end</code></li>
    <li><code>grid-area</code></li>
  </ul>

  <pre>{`
.item {
  grid-column: 1 / 3;  /* spans columns 1 and 2 */
  grid-row: 2 / 4;     /* spans rows 2 and 3 */
}
`}</pre>

  <h3>📦 Implicit vs Explicit Grid</h3>

  <p>
    The explicit grid is what you define via <code>grid-template</code> properties. Implicit rows/columns are created when you place items beyond what’s defined.
  </p>

  <pre>{`
.grid-container {
  grid-auto-rows: 100px;
}
`}</pre>

  <h3>🧩 Named Areas</h3>

  <p>
    You can define layout areas with semantic names:
  </p>

  <pre>{`
.grid-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.content {
  grid-area: content;
}
.footer {
  grid-area: footer;
}
`}</pre>

  <h3>📍 Alignment in Grid</h3>

  <ul>
    <li><code>justify-items</code> – horizontal alignment within cells</li>
    <li><code>align-items</code> – vertical alignment within cells</li>
    <li><code>justify-content</code> – horizontal alignment of the entire grid</li>
    <li><code>align-content</code> – vertical alignment of the entire grid</li>
  </ul>

  <pre>{`
.grid-container {
  justify-items: center;
  align-items: start;
}
`}</pre>

  <h3>🧠 Real-World Example: Responsive Image Gallery</h3>

  <pre>{`
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
`}</pre>

  <p>
    This creates a responsive grid where each item takes at least 200px, but grows if space is available.
  </p>

  <h3>📏 Grid vs Flexbox</h3>

  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Feature</th>
        <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Flexbox</th>
        <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Grid</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Layout Type</td>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>1D</td>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>2D</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Best for</td>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Navbars, toolbars</td>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Page layouts, image grids</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Overlap/Layering</td>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Harder</td>
        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Easier</td>
      </tr>
    </tbody>
  </table>

  <h3>🔁 Nested Grids</h3>

  <p>
    You can use Grid inside Grid! Define a grid inside any child item.
  </p>

  <pre>{`
.parent {
  display: grid;
}

.child {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
`}</pre>

  <h3>🧩 Accessibility & Semantic Tips</h3>

  <ul>
    <li>Use landmarks (e.g., <code>&lt;main&gt;</code>, <code>&lt;header&gt;</code>) with grid areas</li>
    <li>Don’t rely solely on visual order — screen readers follow DOM order</li>
  </ul>

  <h3>📌 Summary</h3>

  <ul>
    <li>CSS Grid allows for two-dimensional layouts (rows and columns)</li>
    <li>Use <code>grid-template-columns</code>, <code>repeat()</code>, and <code>fr</code> units for flexible design</li>
    <li>Align and place elements precisely using <code>grid-column</code>, <code>grid-area</code>, and alignment properties</li>
    <li>Combine with media queries for fully responsive, scalable interfaces</li>
  </ul>

  <p>
    CSS Grid is a must-have tool for modern web layouts. Whether you’re building complex admin panels or responsive photo galleries, Grid gives you the control and clarity to structure your content beautifully across any screen size.
  </p>
</section>


<section id="media">
  <h2>Media Queries</h2>

  <p>
    <strong>Media queries</strong> are one of the most powerful features in CSS for building responsive designs. They enable developers to apply styles based on the characteristics of the device, screen size, resolution, orientation, and even color capabilities. Without media queries, adapting layouts for desktops, tablets, and smartphones would require duplicating styles or complex JavaScript — with media queries, it's seamless and elegant.
  </p>

  <p>
    Media queries are the backbone of <strong>responsive web design (RWD)</strong>, allowing you to create flexible and fluid layouts that change dynamically as the viewport changes. They're essential in today’s multi-device world.
  </p>

  <h3>📐 Basic Syntax</h3>

  <pre>{`
@media media-type and (condition) {
  /* CSS rules here */
}
`}</pre>

  <p>
    Most commonly used media type is <code>screen</code>, but others include <code>print</code>, <code>speech</code>, and <code>all</code> (default).
  </p>

  <h3>🧪 Example</h3>

  <pre>{`
/* Styles for tablets and smaller */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    flex-direction: column;
  }
}
`}</pre>

  <p>
    This rule will only apply when the screen width is 768 pixels or less.
  </p>

  <h3>🔹 Media Features</h3>

  <ul>
    <li><code>width</code>, <code>min-width</code>, <code>max-width</code></li>
    <li><code>height</code>, <code>min-height</code>, <code>max-height</code></li>
    <li><code>orientation</code>: <code>portrait</code> or <code>landscape</code></li>
    <li><code>resolution</code>: dpi, dppx, etc.</li>
    <li><code>prefers-color-scheme</code>: <code>light</code> or <code>dark</code></li>
    <li><code>hover</code>, <code>pointer</code>, <code>aspect-ratio</code></li>
  </ul>

  <h3>📱 Common Breakpoints (Responsive Design)</h3>

  <pre>{`
/* Mobile First */
@media (max-width: 480px) { ... }
@media (min-width: 481px) and (max-width: 768px) { ... }
@media (min-width: 769px) and (max-width: 1024px) { ... }
@media (min-width: 1025px) { ... }
`}</pre>

  <p>
    These breakpoints are not set in stone — tailor them to your design needs and device analytics.
  </p>

  <h3>💡 Mobile-First Design</h3>

  <p>
    With a mobile-first approach, you define base styles for smaller devices first, then use media queries to scale up for larger viewports. This approach aligns with modern development best practices.
  </p>

  <pre>{`
.button {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .button {
    font-size: 1.25rem;
  }
}
`}</pre>

  <h3>🎨 Dark Mode Support</h3>

  <p>
    Use the <code>prefers-color-scheme</code> media feature to adapt styles for users with dark mode enabled.
  </p>

  <pre>{`
@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212;
    color: #f5f5f5;
  }
}
`}</pre>

  <h3>🧠 Orientation-based Layouts</h3>

  <p>
    Target landscape or portrait devices using <code>orientation</code>.
  </p>

  <pre>{`
@media (orientation: landscape) {
  .hero {
    flex-direction: row;
  }
}

@media (orientation: portrait) {
  .hero {
    flex-direction: column;
  }
}
`}</pre>

  <h3>🔁 Combining Multiple Conditions</h3>

  <p>
    You can use <code>and</code>, <code>or</code>, and <code>not</code> operators to build complex queries.
  </p>

  <pre>{`
@media screen and (min-width: 600px) and (max-width: 1024px) {
  .sidebar {
    display: block;
  }
}
`}</pre>

  <h3>🧩 Real-World Example: Responsive Grid</h3>

  <pre>{`
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
`}</pre>

  <p>
    This changes the number of grid columns based on screen width.
  </p>

  <h3>📏 Unit Considerations</h3>

  <p>
    Use <code>em</code> or <code>rem</code> instead of <code>px</code> in media queries for better scaling with user accessibility settings.
  </p>

  <pre>{`
@media (max-width: 40em) { ... }
`}</pre>

  <h3>🧠 Performance & Best Practices</h3>

  <ul>
    <li>Keep your media queries organized — group them or place them near related components</li>
    <li>Use <code>min-width</code> queries for a mobile-first strategy</li>
    <li>Don’t overuse breakpoints — use flexible units like <code>fr</code> and <code>%</code></li>
    <li>Test on real devices and emulators for accuracy</li>
    <li>Use DevTools in Chrome, Firefox, etc. to simulate screen sizes easily</li>
  </ul>

  <h3>📌 Summary</h3>

  <ul>
    <li>Media queries allow your site to adapt to different screen sizes and conditions</li>
    <li>Use them to build mobile-first, responsive layouts</li>
    <li>Support dark mode, landscape/portrait changes, and accessibility features</li>
    <li>Keep styles scalable, test thoroughly, and maintain clear breakpoints</li>
  </ul>

  <p>
    Media queries are the backbone of responsive web design. Mastering them will allow your layouts to gracefully adapt to smartphones, tablets, laptops, 4K monitors, and even future devices we haven't imagined yet.
  </p>
</section>


<section id="animations">
  <h2>Transitions & Animations</h2>

  <p>
    CSS Transitions and Animations allow developers to breathe life into web pages. They enable smooth, dynamic interactions that respond to user actions such as hovering, clicking, or scrolling. Instead of abruptly changing styles, transitions and animations provide movement and feedback — which enhances usability, provides visual cues, and creates engaging experiences.
  </p>

  <h3>🔄 What’s the Difference?</h3>
  <ul>
    <li><strong>Transitions</strong> — animate changes between two states (e.g., hover to normal)</li>
    <li><strong>Animations</strong> — define keyframes to animate across multiple stages or loops</li>
  </ul>

  <h3>🔁 CSS Transitions</h3>
  <p>
    Transitions occur when a property changes from one value to another, like when hovering over a button or toggling a class. To apply transitions:
  </p>

  <pre>{`
.button {
  transition: all 0.3s ease;
}
`}</pre>

  <p>Then apply a new state using pseudo-classes or JS:</p>

  <pre>{`
.button:hover {
  background-color: #3498db;
  color: white;
}
`}</pre>

  <h4>📌 Properties to Animate with Transitions</h4>
  <ul>
    <li><code>background-color</code></li>
    <li><code>color</code></li>
    <li><code>opacity</code></li>
    <li><code>transform</code></li>
    <li><code>margin</code>, <code>padding</code></li>
    <li><code>border</code></li>
  </ul>

  <h4>🕰️ Transition Shorthand</h4>

  <pre>{`
transition: [property] [duration] [timing-function] [delay];
`}</pre>

  <pre>{`
.card {
  transition: background-color 0.5s ease-in 0.1s;
}
`}</pre>

  <h3>🎬 CSS Animations</h3>
  <p>
    Unlike transitions, animations do not rely on a change in state. Instead, you define <strong>keyframes</strong> that specify multiple stages of animation.
  </p>

  <pre>{`
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.panel {
  animation: slideIn 1s ease-out forwards;
}
`}</pre>

  <h4>📌 Key Properties of Animations</h4>
  <ul>
    <li><code>animation-name</code></li>
    <li><code>animation-duration</code></li>
    <li><code>animation-timing-function</code></li>
    <li><code>animation-delay</code></li>
    <li><code>animation-iteration-count</code></li>
    <li><code>animation-direction</code></li>
    <li><code>animation-fill-mode</code></li>
    <li><code>animation-play-state</code></li>
  </ul>

  <h3>🔁 Infinite Animation</h3>

  <pre>{`
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.icon {
  animation: bounce 1s infinite;
}
`}</pre>

  <h3>📐 animation-fill-mode</h3>

  <p>
    Controls how styles apply before and after animation:
  </p>

  <ul>
    <li><code>none</code> – default</li>
    <li><code>forwards</code> – applies styles from last keyframe</li>
    <li><code>backwards</code> – applies styles from first keyframe before animation starts</li>
    <li><code>both</code> – applies both</li>
  </ul>

  <h3>🔄 animation-direction</h3>

  <ul>
    <li><code>normal</code></li>
    <li><code>reverse</code></li>
    <li><code>alternate</code></li>
    <li><code>alternate-reverse</code></li>
  </ul>

  <pre>{`
.loader {
  animation: spin 2s linear infinite alternate;
}
`}</pre>

  <h3>🧠 Real-World Examples</h3>

  <h4>🚪 Fade In</h4>
  <pre>{`
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal {
  animation: fadeIn 0.5s ease forwards;
}
`}</pre>

  <h4>🔁 Loading Spinner</h4>
  <pre>{`
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
`}</pre>

  <h4>🎯 Tooltip Slide</h4>
  <pre>{`
.tooltip {
  animation: slideIn 0.3s ease forwards;
}
`}</pre>

  <h3>🔧 Performance Tips</h3>

  <ul>
    <li>Animate <code>transform</code> and <code>opacity</code> — they're GPU-accelerated</li>
    <li>Avoid animating <code>width</code>, <code>height</code>, <code>top</code>, or <code>left</code></li>
    <li>Use <code>will-change</code> for optimizing heavy animations</li>
  </ul>

  <pre>{`
.element {
  will-change: transform;
}
`}</pre>

  <h3>⚠️ Accessibility Considerations</h3>

  <ul>
    <li>Minimize motion for users who request it using <code>prefers-reduced-motion</code></li>
  </ul>

  <pre>{`
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
`}</pre>

  <h3>🧩 Animation Libraries</h3>

  <ul>
    <li><a href="https://animate.style/" target="_blank" rel="noreferrer">Animate.css</a></li>
    <li><a href="https://greensock.com/" target="_blank" rel="noreferrer">GSAP (GreenSock)</a></li>
    <li><a href="https://hover.dev/" target="_blank" rel="noreferrer">Hover.css</a></li>
  </ul>

  <h3>📌 Summary</h3>

  <ul>
    <li><code>transition</code> is for smooth changes on interaction</li>
    <li><code>animation</code> is for complex, keyframed sequences</li>
    <li>Use <code>transform</code> and <code>opacity</code> for best performance</li>
    <li>Include accessibility fallback with <code>prefers-reduced-motion</code></li>
    <li>Keep animations subtle, purposeful, and user-friendly</li>
  </ul>

  <p>
    CSS animations bring your designs to life. When used effectively, they guide attention, enhance usability, and add polish. Whether it’s a microinteraction or a full-page animation, CSS gives you the tools to create smooth, engaging, and performant user experiences.
  </p>
</section>


<section id="responsive">
  <h2>Responsive Design</h2>

  <p>
    Responsive Design is the practice of creating websites that look and function well across all devices — from small mobile screens to large desktop monitors. Rather than designing separate versions of a site, responsive design uses flexible layouts, images, and CSS techniques (especially media queries) to adapt content dynamically to the screen’s size, resolution, and capabilities.
  </p>

  <p>
    With the vast diversity of devices today — phones, tablets, laptops, watches, TVs — responsive design is no longer optional. It's the foundation of modern web development and a core expectation of users. A responsive site ensures accessibility, usability, and performance no matter where or how it's accessed.
  </p>

  <h3>📐 Core Principles of Responsive Design</h3>
  <ul>
    <li><strong>Fluid Grids</strong> – Use percentages and flexible units instead of fixed widths</li>
    <li><strong>Flexible Media</strong> – Images and videos should scale with the screen</li>
    <li><strong>Media Queries</strong> – Apply styles conditionally based on viewport size</li>
    <li><strong>Mobile First</strong> – Design for smaller screens first, then scale up</li>
  </ul>

  <h3>🔢 Units for Responsive Design</h3>
  <ul>
    <li><code>%</code> – Percentage of parent element</li>
    <li><code>vw</code> / <code>vh</code> – Viewport width/height units</li>
    <li><code>em</code> / <code>rem</code> – Relative to font size</li>
    <li><code>min()</code> / <code>max()</code> / <code>clamp()</code> – Modern, fluid control</li>
  </ul>

  <pre>{`
.container {
  width: 80%;
  max-width: 1200px;
  padding: 2vw;
}
`}</pre>

  <h3>📱 Media Query Examples</h3>

  <pre>{`
/* Small screens */
@media (max-width: 480px) {
  .nav {
    flex-direction: column;
  }
}

/* Tablets */
@media (min-width: 481px) and (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
`}</pre>

  <h3>🧩 Mobile-First Approach</h3>

  <p>
    This strategy starts with base styles for mobile screens, then adds enhancements for larger screens. It ensures lightweight performance on mobile and avoids unnecessary overrides.
  </p>

  <pre>{`
.button {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .button {
    font-size: 1.25rem;
  }
}
`}</pre>

  <h3>🎨 Responsive Typography</h3>

  <p>
    Use relative units and scaling techniques:
  </p>

  <pre>{`
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
`}</pre>

  <h3>🖼️ Responsive Images</h3>

  <pre>{`
img {
  max-width: 100%;
  height: auto;
}
`}</pre>

  <p>
    This ensures that images scale down within containers without distortion or overflow.
  </p>

  <h3>🔄 Flexbox & Grid for Responsive Layouts</h3>

  <pre>{`
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
`}</pre>

  <h3>🧠 Accessibility Considerations</h3>
  <ul>
    <li>Use sufficient contrast and large, scalable text</li>
    <li>Ensure focus states and interactive elements are tap-friendly</li>
    <li>Test with keyboard navigation and screen readers</li>
    <li>Use viewport meta tag for mobile optimization</li>
  </ul>

  <pre>{`
<meta name="viewport" content="width=device-width, initial-scale=1.0">
`}</pre>

  <h3>🛠️ Real-World Example: Responsive Card Layout</h3>

  <pre>{`
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}
`}</pre>

  <p>
    This grid automatically adapts the number of columns to the screen width.
  </p>

  <h3>🔧 Tools for Testing Responsiveness</h3>
  <ul>
    <li>Chrome DevTools → Device Toolbar</li>
    <li>Responsively App</li>
    <li>BrowserStack or LambdaTest (Cross-browser testing)</li>
    <li>Google Lighthouse (performance & accessibility)</li>
  </ul>

  <h3>📌 Summary</h3>

  <ul>
    <li>Responsive design ensures your site adapts to all screen sizes</li>
    <li>Use fluid units, flexible images, and media queries to create adaptive layouts</li>
    <li>Design mobile-first to prioritize usability and performance</li>
    <li>Combine CSS Grid, Flexbox, and utility classes to build responsive systems</li>
    <li>Test thoroughly across devices to ensure quality UX</li>
  </ul>

  <p>
    Responsive design isn't just a technique — it's a mindset. It's about creating inclusive, accessible, and efficient web experiences for every user, regardless of their device or connection. Mastering responsiveness sets the foundation for a future-proof and professional website.
  </p>
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

export default CSSTutorial;
