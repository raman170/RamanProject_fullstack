import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const BootstrapTutorial = () => {
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
            <li><a href="/LearnmorePage">Services</a></li>
          </ul>
        </div>
        <div className="auth-buttons" ref={dropdownRef}>
          <div className="user-icon" onClick={() => setShowDropdown(prev => !prev)}>{userInitial}</div>
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
  <h2>Introduction</h2>
  <p>Bootstrap is a free and open-source front-end framework for developing responsive and mobile-first websites. Originally developed by Mark Otto and Jacob Thornton at Twitter, Bootstrap was released as an open-source project in August 2011. The goal of the framework is to simplify the development of web pages and applications through the use of reusable components and a consistent design system.
  
Bootstrap includes pre-designed HTML elements, CSS styles, and optional JavaScript plugins to make building modern web interfaces easier. It offers a standard grid system for layout, a responsive design philosophy that ensures compatibility across a range of screen sizes and devices, and built-in support for components such as navigation bars, dropdowns, forms, buttons, and modals.

The rise of mobile devices prompted a shift in web development strategies. Bootstrap embraced this trend by promoting a mobile-first design approach. This principle encourages developers to prioritize mobile designs first and then scale up for larger devices. It ensures better performance, usability, and user experience across platforms.

Bootstrap is maintained by a large community of developers and is hosted on GitHub, where contributors can report bugs, request features, and collaborate on the codebase. Over time, Bootstrap has undergone significant changes. Bootstrap 4 brought a Flexbox-based grid system, improved utilities, and modularity. Bootstrap 5 continued this modernization by removing jQuery as a dependency and embracing more vanilla JavaScript, which reduced dependencies and improved performance.

Many popular websites and applications have utilized Bootstrap due to its ease of use and consistency. It provides developers with a set of common design patterns and components, reducing the need to write custom CSS and JavaScript for standard UI elements. This leads to faster development cycles and more maintainable codebases.

One key advantage of using Bootstrap is the consistency it offers across projects. The design language, spacing, typography, and component behaviors are standardized, ensuring that developers working on different parts of a website maintain a cohesive look and feel. This is particularly beneficial for teams and large-scale applications.

Moreover, Bootstrap supports extensive customization. Developers can override default styles, use Sass variables, and configure Bootstrap to meet specific branding needs. Bootstrap’s documentation is comprehensive and includes usage examples, code snippets, and guidelines for each component.

In addition to its built-in components, Bootstrap integrates well with third-party libraries and frameworks. It works seamlessly with jQuery, React, Angular, and Vue, among others. This allows developers to combine Bootstrap’s UI capabilities with modern front-end development practices.

From beginners to advanced developers, Bootstrap remains a go-to solution for building fast, responsive, and attractive user interfaces. Whether you're creating a simple portfolio website or a complex enterprise application, Bootstrap provides the tools and flexibility to accelerate your development process while adhering to modern design standards.

As technology continues to evolve, Bootstrap remains committed to staying relevant and efficient. The framework is continuously updated to align with the latest best practices in web development, browser compatibility, and accessibility.

By leveraging Bootstrap, developers gain access to a robust toolkit that enhances productivity, ensures design consistency, and supports rapid prototyping and deployment. It is no wonder that Bootstrap continues to be one of the most widely adopted front-end frameworks in the world.</p>
</section>

          <section id="setup">
  <h2>Setup</h2>
  <p>Setting up Bootstrap is the foundation of leveraging its full potential in modern web development. There are multiple ways to integrate Bootstrap into your project, each with its own use cases, benefits, and configurations. In this comprehensive guide, we’ll walk through the setup options in detail, including CDN, package managers (npm/yarn), compiling Sass for customization, and integrating Bootstrap with front-end frameworks like React, Vue, and Angular.
</p>
**1. Using Bootstrap via CDN**

The fastest way to start using Bootstrap is through a Content Delivery Network (CDN). This method doesn’t require installation and works by linking to Bootstrap’s hosted CSS and JavaScript files. Add the following lines to your HTML:

```html
{/* Bootstrap CSS*/}
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
{/* Bootstrap Bundle JS (includes Popper)*/}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

This approach is perfect for quick prototypes, educational projects, and when you don’t need much customization.

**2. Installing Bootstrap via npm or yarn**

For more control and integration in modern front-end environments, using a package manager like npm or yarn is ideal:

```bash
npm install bootstrap
# or
yarn add bootstrap
```

After installation, import Bootstrap in your JavaScript entry file:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
```

This method is suitable for modular applications where you may want to tree-shake unused parts or integrate with frameworks.

**3. Compiling Sass for Custom Builds**

Bootstrap provides all its source code in Sass files, which allows deep customization. This is best for branding or changing default variables. To use Sass, you’ll need Node.js, npm/yarn, and a build tool like Webpack or Vite:

```bash
npm install bootstrap sass
```

You can override Bootstrap’s default variables before importing its SCSS:

```scss
$primary: #ff5733;
$font-family-base: 'Roboto', sans-serif;
@import 'bootstrap/scss/bootstrap';
```

Compile it using your preferred Sass processor or bundler.

**4. Integration with React**

In React projects created using Create React App:

```bash
npm install bootstrap
```

Then import it in your `index.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

You can use Bootstrap’s classNames in JSX:

```jsx
<button className="btn btn-primary">Click me</button>
```

**5. Integration with Vue.js and Angular**

In Vue:
```bash
npm install bootstrap
```
Then in `main.js`:
```js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
```

In Angular:
```bash
npm install bootstrap
```
And update `angular.json`:
```json
"styles": ["node_modules/bootstrap/dist/css/bootstrap.min.css"],
"scripts": ["node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"]
```

**6. Bootstrap Icons**

For iconography, you can use Bootstrap Icons:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet"/>
```
Or install:
```bash
npm install bootstrap-icons
```
Then use like:
```html
<i class="bi bi-alarm"></i>
```

**7. Hosting Bootstrap Locally**

Download from https://getbootstrap.com and include the CSS/JS files from your local server. This offers control over versions and offline access.

**8. Environment Considerations**

- **Performance**: CDN is faster for users globally due to caching.
- **Customization**: npm + Sass is better for custom builds.
- **Security**: Local hosting avoids reliance on external sources.
- **Updates**: CDN always provides latest versions; local requires manual updating.

**Conclusion**
<p>
Choose a Bootstrap setup method based on project size, complexity, and whether you need customization. CDNs are great for speed and ease, npm/yarn offer flexibility, and compiling Sass allows full control over styling. Framework integration steps further streamline development for SPAs. Regardless of how you choose to install it, Bootstrap’s setup process is beginner-friendly and scales beautifully with more advanced workflows.</p>
</section>

          <section id="grid">
  <h2>Grid System</h2>
  <p>Bootstrap’s grid system is one of its core features and the foundation of responsive layout design. It uses a flexible and robust system based on a 12-column layout that enables developers to design complex interfaces that automatically adjust to various screen sizes and devices. With Bootstrap, it’s easy to build responsive layouts that look great on phones, tablets, laptops, and desktops alike.

**1. How the Grid Works**

At its heart, the grid system in Bootstrap is based on Flexbox, introduced in Bootstrap 4 and refined in Bootstrap 5. It provides a clean and flexible way to structure layout elements horizontally and vertically. The system is composed of containers, rows, and columns:

```html
<div class="container">
  <div class="row">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
  </div>
</div>
```

**2. Containers**

Containers are the most basic layout element and are required when using the grid system. There are two types of containers:
- `.container`: A responsive fixed-width container.
- `.container-fluid`: Always takes up 100% of the width of the viewport.

**3. Rows and Columns**

Rows are horizontal groups of columns that ensure your columns are aligned properly. Columns within a row must add up to 12 for each row. You can use auto-layout columns, or specify the column size explicitly:

```html
<div class="row">
  <div class="col-6">Half Width</div>
  <div class="col-6">Half Width</div>
</div>
```

**4. Responsive Breakpoints**

Bootstrap provides six breakpoints for responsive design:
- `col-` (extra small &gt 576px)
- `col-sm-` (≥576px)
- `col-md-` (≥768px)
- `col-lg-` (≥992px)
- `col-xl-` (≥1200px)
- `col-xxl-` (≥1400px)

This allows for highly customizable layouts that adapt gracefully to screen sizes:

```html
<div class="row">
  <div class="col-md-4 col-sm-6 col-12">Responsive Column</div>
</div>
```

**5. Nesting Grids**

You can nest grids by placing rows inside columns:

```html
<div class="row">
  <div class="col">
    <div class="row">
      <div class="col">Nested Column 1</div>
      <div class="col">Nested Column 2</div>
    </div>
  </div>
</div>
```

**6. Auto Layout Columns**

Bootstrap automatically divides space evenly between columns with `.col`:

```html
<div class="row">
  <div class="col">1</div>
  <div class="col">2</div>
  <div class="col">3</div>
</div>
```

**7. Column Ordering and Alignment**

You can reorder and align columns using utilities such as `order`, `align-self`, and `justify-content`:

```html
<div class="row">
  <div class="col order-2">Second</div>
  <div class="col order-1">First</div>
</div>
```

**8. Offset Columns**

Use offset classes to move columns to the right:

```html
<div class="row">
  <div class="col-md-4 offset-md-4">Centered Column</div>
</div>
```

**9. Gutter Spacing**

Control spacing between columns using Bootstrap’s gutter classes. Set vertical and horizontal spacing using `.g-0` to `.g-5`:

```html
<div class="row g-3">
  <div class="col">Guttered</div>
  <div class="col">Layout</div>
</div>
```

**10. Customizing the Grid**

With Sass variables, you can customize grid breakpoints, container widths, gutter size, and more. This provides flexibility to tailor the grid to your design system.

**Conclusion**

Bootstrap’s grid system is powerful, intuitive, and highly customizable. It simplifies responsive design by providing ready-to-use layout options while supporting advanced customization. By mastering the grid system, developers can create professional layouts that adapt beautifully across devices, ensuring a seamless user experience everywhere.</p>
</section>

          <section id="typography">
  <h2>Typography</h2>
  <p>Typography in Bootstrap is one of the most fundamental aspects of UI design. Bootstrap provides a robust and flexible set of typography utilities and components designed to make content readable, accessible, and visually appealing. Typography encompasses headings, paragraphs, inline text elements, alignment, responsive text utilities, and contextual emphasis.
</p>
**1. Headings**

Bootstrap supports all standard HTML headings from `<h1/>` to `<h6/>`, each with its own font size and margin. These headings automatically follow the typographic hierarchy:

```html
<h1>h1. Bootstrap heading</h1>
<h2>h2. Bootstrap heading</h2>
<h3>h3. Bootstrap heading</h3>
<h4>h4. Bootstrap heading</h4>
<h5>h5. Bootstrap heading</h5>
<h6>h6. Bootstrap heading</h6>
```

To apply heading styles to any element (like a `<div/>` or `<span/>`), use the `.h1` through `.h6` classes:

```html
<p class="h1">Styled as h1</p>
```

**2. Display Headings**

Bootstrap offers display heading classes for larger, more prominent titles:

```html
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
```

**3. Lead Paragraphs**

Use `.lead` to make a paragraph stand out by increasing its font size and line height:

```html
<p class="lead">This is a lead paragraph. It stands out from regular paragraphs.</p>
```

**4. Inline Text Elements**

Bootstrap includes styling for standard HTML inline elements like:
- `<mark/>` for highlighting
- `<small/>` for fine print
- `<strong/>` for bold text
- `<em/>` for italic text

```html
<p>You can use <mark>highlight</mark> to draw attention.</p>
```

**5. Blockquotes**

To quote external content:

```html
<blockquote class="blockquote">
  <p class="mb-0">A well-known quote, contained in a blockquote element.</p>
</blockquote>
```

**6. Text Alignment**

Use Bootstrap utility classes to align text:
- `.text-start`
- `.text-center`
- `.text-end`

```html
<p class="text-center">This text is centered.</p>
```

**7. Text Transformation and Weight**

Transform text using:
- `.text-lowercase`
- `.text-uppercase`
- `.text-capitalize`

Change weight using:
- `.fw-bold`, `.fw-normal`, `.fw-light`
- `.fst-italic`, `.fst-normal`

**8. Responsive Font Sizes**
<p>
Boo tstrap 5 introduced responsive typography. Set base font size using html ( font-size: 1rem; ), and scale using media queries or utility classes. The `.fs-1` through `.fs-6` classes provide scalable font sizes:
</p>
```html
<p class="fs-1">Extra large text</p>
<p class="fs-6">Smallest text</p>
```

**9. Lists and Description Lists**

Bootstrap resets default list styles and provides options for inline and unstyled lists:

```html
<ul class="list-unstyled">
  <li>Item without bullets</li>
</ul>

<ul class="list-inline">
  <li class="list-inline-item">One</li>
  <li class="list-inline-item">Two</li>
</ul>
```

**10. Code and Keyboard Input**

Style inline code and keyboard input:

```html
<p>Use <code>&lt;section&gt;</code> to define a section.</p>
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
```

**11. Text Colors and Backgrounds**

Use contextual classes like `.text-primary`, `.text-success`, `.bg-light`, `.bg-dark`, etc., to apply color emphasis to text and backgrounds.

**Conclusion**
<p>
Typography in Bootstrap is more than just text. It’s a system designed to maintain a visual hierarchy, accessibility, and usability. It helps you communicate effectively with your users by ensuring that text is readable, aesthetically pleasing, and consistent across platforms and browsers. With Bootstrap’s typography utilities, developers can build interfaces that are clean, professional, and responsive without writing extensive custom CSS.</p>
</section>

          <section id="colors">
  <h2>Colors</h2>
  <p>Bootstrap provides a powerful and flexible color system that enables developers to apply consistent color schemes across their UI elements. With utility classes, background and text colors can be applied with minimal effort, offering both functional and aesthetic customization. Bootstrap’s color palette includes predefined contextual colors and the ability to extend or customize these using Sass.

**1. Contextual Text Colors**

Bootstrap includes several contextual color classes that can be applied to text:
- `.text-primary`
- `.text-secondary`
- `.text-success`
- `.text-danger`
- `.text-warning`
- `.text-info`
- `.text-light`
- `.text-dark`
- `.text-muted`
- `.text-white`

Example:
```html
<p class="text-success">This is a success message.</p>
```

**2. Background Colors**

To style the background of elements, Bootstrap provides corresponding `.bg-*` utility classes:
- `.bg-primary`, `.bg-secondary`, `.bg-success`, etc.

```html
<div class="p-3 mb-2 bg-info text-white">Informational background</div>
```

**3. Color Contrast and Accessibility**

Accessibility is critical when dealing with colors. Bootstrap ensures good contrast between text and background. Developers should verify color combinations using tools like the WebAIM Contrast Checker. For lighter background shades, consider using `.text-dark` for readability, and `.text-light` on darker backgrounds.

**4. State Colors in Components**

These contextual colors are used in alerts, buttons, badges, and other components:
```html
<div class="alert alert-warning">This is a warning alert</div>
<button class="btn btn-danger">Delete</button>
<span class="badge bg-success">Approved</span>
```

**5. Custom Colors Using Sass**

Bootstrap allows developers to extend or override the default color palette. For example:
```scss
$theme-colors: (
  "custom-blue": #005f99,
  "custom-green": #44cc44
);
```
After adding this, you can use `.bg-custom-blue` or `.text-custom-green` after compiling Bootstrap with Sass.

**6. Opacity Utilities**

Bootstrap 5 includes text and background opacity utilities like `.bg-opacity-50`, `.text-opacity-75` to adjust transparency levels without writing custom CSS:
```html
<div class="bg-primary bg-opacity-50 text-white">Half transparent primary</div>
```

**7. Color and Background Utility Combinations**

Combine background and text colors:
```html
<div class="bg-dark text-white p-3">Dark background with white text</div>
```

**8. Color Modes and Dark Mode Considerations**

Although Bootstrap does not ship with a full dark mode out of the box, it provides tools and variables to build one. You can define custom themes using CSS variables or toggle between light/dark classes using JavaScript.

**9. Link Colors**

Links automatically adapt to text colors. You can also modify them manually using `.link-*` classes:
```html
<a href="#" class="link-primary">Primary link</a>
```

**10. Text and Background Gradient Utilities**

Bootstrap also supports background gradients using `.bg-gradient` combined with any background color class:
```html
<div class="p-3 bg-primary bg-gradient text-white">Gradient example</div>
```

**Conclusion**

The Bootstrap color system is comprehensive and built for flexibility, accessibility, and rapid development. Whether using predefined contextual colors, customizing your palette with Sass, or building a full theme with dynamic toggling, Bootstrap makes color management simple and consistent across all your components and pages.</p>
</section>

          <section id="tables">
  <h2>Tables</h2>
  <p>Bootstrap provides a comprehensive and highly customizable set of classes for working with tables. Whether you're displaying simple datasets or complex tabular data with interactive features, Bootstrap’s table utilities offer an efficient and clean way to render and style your tables.
</p>
**1. Basic Table Structure**

A basic table in Bootstrap uses the `.table` class to add styling to the HTML `<table/>` element:
```html
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Alice</td>
      <td>alice@example.com</td>
    </tr>
  </tbody>
</table>
```

**2. Table Variants and Modifiers**

Bootstrap allows several modifiers to change the appearance of your tables:
- `.table-striped`: Adds zebra-striping to rows.
- `.table-bordered`: Adds borders to all cells.
- `.table-hover`: Adds a hover effect on rows.
- `.table-sm`: Makes the table more compact by cutting cell padding.

```html
<table class="table table-striped table-hover table-sm">
  ...
</table>
```

**3. Contextual Classes**

Add contextual classes to rows or individual cells to convey meaning through color:
- `.table-primary`, `.table-success`, `.table-danger`, `.table-warning`, `.table-info`, etc.

```html
<tr class="table-success">
  <td>2</td><td>Bob</td><td>bob@example.com</td>
</tr>
```

**4. Dark Tables**

Use `.table-dark` to invert table colors for dark-themed UIs:
```html
<table class="table table-dark">
  ...
</table>
```

**5. Responsive Tables**

For horizontal scrolling on smaller screens, wrap your table in `.table-responsive`:
```html
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```

**6. Captions and Table Head Options**

Add captions to tables with `<caption/>`:
```html
<table class="table">
  <caption>List of users</caption>
  ...
</table>
```

You can also darken the header using `.table-dark` on `<thead/>`:
```html
<thead class="table-dark"/>
```

**7. Alignment and Sizing**

Align content using text utilities:
```html
<td class="text-end">$250</td>
```

You can also use `.w-25`, `.w-50`, etc., to control column widths.

**8. Nesting Tables**

You can nest tables inside table cells, although it's not common:
```html
<td>
  <table class="table table-sm">
    <tr><td>Nested</td></tr>
  </table>
</td>
```

**9. Combining with JavaScript**

Tables can be enhanced with JavaScript for sorting, pagination, and searching using plugins like DataTables. Although not a part of Bootstrap, it's often used alongside:
```html
<pre>
        <code>
          {`<script>
  $(document).ready(function() {
    $('#myTable').DataTable();
  });
</script>`}
        </code>
      </pre>



**10. Custom Styling and Theming**

With Sass, you can override Bootstrap’s table variables like `$table-cell-padding`, `$table-border-color`, or create your own table variants. This allows full control over the appearance and behavior of tables.

**Conclusion**
<p>
Tables are essential for data display, and Bootstrap provides an accessible, elegant, and extendable way to manage them. From simple listings to dynamic, interactive tables, Bootstrap’s table utilities allow developers to maintain visual consistency and enhance user interaction across devices.</p>
</section>

<section id="forms">
  <h2>Forms</h2>
  <p>Bootstrap forms provide a wide range of features and utility classes that simplify the creation of consistent, accessible, and stylish form components. Whether you're building a login page, registration system, search bar, or full-featured dashboard, Bootstrap's form controls and layout tools offer a responsive, mobile-first approach to capturing user input.
</p>
**1. Basic Form Structure**

Bootstrap forms typically start with the `.form-group` (or just spacing utilities in Bootstrap 5) and `.form-control` classes:
```html
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
</form>
```

**2. Form Controls**

Input types supported include:
- `text`, `email`, `password`, `number`, `tel`, `url`, `search`, `range`, `color`, etc.

Checkboxes and radios use `.form-check`:
```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1"/>
  <label class="form-check-label" for="check1">Check me</label>
</div>
```

**3. Form Layout Options**

Bootstrap supports vertical, horizontal, and inline layouts:
- **Vertical**: default stacked layout.
- **Horizontal**: use grid classes to align labels/inputs.
- **Inline**: use `.row` and `.col` in the same line.

**4. Input Sizing and Validation**

Use `.form-control-sm` or `.form-control-lg` for input size. Built-in validation styles:
```html
<input type="text" class="form-control is-valid"/>
<div class="valid-feedback">Looks good!</div>

<input type="text" class="form-control is-invalid"/>
<div class="invalid-feedback">Please choose a username.</div>
```

**5. Floating Labels**

Floating labels animate placeholders into labels:
```html
<div class="form-floating">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label for="floatingInput">Email address</label>
</div>
```

**6. Select Menus and File Inputs**

Custom selects and file uploads:
```html
<select class="form-select">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
</select>

<input class="form-control" type="file"/>
```

**7. Form Grid and Row Layout**

Use `.row` and `.col-*` for responsive multi-column forms:
```html
<div class="row">
  <div class="col-md-6">
    <input type="text" class="form-control" placeholder="First name"/>
  </div>
  <div class="col-md-6">
    <input type="text" class="form-control" placeholder="Last name"/>
  </div>
</div>
```

**8. Readonly and Disabled Fields**

```html
<input type="text" class="form-control" placeholder="Readonly input" readonly/>
<input type="text" class="form-control" placeholder="Disabled input" disabled/>
```

**9. Helper Text, Tooltips, and Feedback**

```html
<input type="text" class="form-control" aria-describedby="passwordHelp"/>
<small id="passwordHelp" class="form-text text-muted">Use 8-20 characters.</small>
```

**10. Accessibility and ARIA**

Bootstrap forms are built with accessibility in mind. Use `aria-*` attributes and semantic HTML. Every form control should be associated with a `<label/>`.

**Conclusion**
<p>
Bootstrap makes building and managing forms efficient and accessible. With built-in classes for every type of input and feedback, flexible layouts, and responsive tools, developers can create beautiful, usable, and performant forms that work seamlessly across devices.</p>
</section>

          <section id="buttons">
  <h2>Buttons</h2>
  <p>Buttons are essential components of any user interface. In Bootstrap, buttons are designed to be flexible, accessible, and easily customizable. With a wide variety of predefined button styles, sizes, states, and functionalities, developers can quickly implement consistent call-to-action elements throughout their websites.

**1. Basic Button Classes**

Use the `.btn` class along with a contextual class like `.btn-primary` to create buttons:
```html
<button type="button" class="btn btn-primary">Primary</button>
```

Bootstrap offers the following button types:
- `.btn-primary`
- `.btn-secondary`
- `.btn-success`
- `.btn-danger`
- `.btn-warning`
- `.btn-info`
- `.btn-light`
- `.btn-dark`
- `.btn-link`

**2. Outline Buttons**

Outline buttons provide a subtle alternative:
```html
<button class="btn btn-outline-success">Outline Success</button>
```

**3. Button Sizes**

Adjust button sizes using `.btn-lg` or `.btn-sm`:
```html
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-secondary btn-sm">Small</button>
```

**4. Block Buttons**

Make buttons full-width using `.d-grid` and `.w-100`:
```html
<div class="d-grid">
  <button class="btn btn-danger w-100">Full Width</button>
</div>
```

**5. Disabled Buttons**

Disable buttons by adding the `disabled` attribute:
```html
<button class="btn btn-primary" disabled>Disabled</button>
```

**6. Active States**

Toggle `.active` class to highlight selected buttons:
```html
<button class="btn btn-primary active">Active</button>
```

**7. Button Groups**

Group multiple buttons horizontally using `.btn-group`:
```html
<div class="btn-group" role="group">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```

**8. Toggle Buttons (Checkbox/Radio)**

Use buttons as toggle inputs:
```html
<input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off"/>
<label class="btn btn-outline-primary" for="btncheck1">Toggle</label>
```

**9. Customizing Buttons with Sass**

Bootstrap’s buttons can be customized by overriding Sass variables like `$btn-padding-y`, `$btn-border-radius`, `$btn-font-weight`, and defining new contextual button variants:
```scss
<pre>
        <code>
          {`
$btn-custom-color: #6610f2;
.btn-custom {
  @include button-variant($btn-custom-color, darken($btn-custom-color, 10%));
}
`}
        </code>
      </pre>
```

**10. Accessibility Considerations**

Use proper semantic elements and ARIA labels for buttons used in dynamic interactions. Ensure color contrast and keyboard navigation compatibility for better accessibility.

**Conclusion**

Bootstrap’s button system is feature-rich and extremely versatile. From predefined styles to full customization using Sass, you can create buttons that match the design and functionality requirements of any project. Buttons play a key role in guiding users, and with Bootstrap, implementing them correctly is both easy and consistent.</p>
</section>

          <section id="images">
  <h2>Images</h2>
  <p>Images are an essential part of modern web design. Bootstrap provides utility classes and components that make working with images responsive, visually appealing, and easy to manage. From fluid image scaling to alignment, rounded corners, and figure captions, Bootstrap offers all the necessary tools for image presentation.</p>

**1. Responsive Images**

The `.img-fluid` class ensures that images scale with the parent element and do not exceed their container width:
```html
<img src="example.jpg" class="img-fluid" alt="Responsive image"/>
```
This class adds `max-width: 100%;` and `height: auto;` for responsiveness.

**2. Image Shapes**

Bootstrap includes classes for applying different border radius styles:
- `.rounded` - slightly rounded corners
- `.rounded-circle` - circular image
- `.rounded-pill` - pill-shaped image

```html
<img src="avatar.jpg" class="rounded-circle" alt="Avatar"/>
```

**3. Image Alignment**

Use text alignment or Flexbox utilities to align images horizontally:
```html
<img src="logo.png" class="float-start" alt="Left aligned"/>
<img src="logo.png" class="float-end" alt="Right aligned"/>
<img src="logo.png" class="mx-auto d-block" alt="Centered"/>
```

**4. Image with Text - Figure Component**

Use the `.figure` component to group images with captions:
```html
<figure class="figure">
  <img src="sample.jpg" class="figure-img img-fluid rounded" alt="Example image"/>
  <figcaption class="figure-caption">A caption for the image.</figcaption>
</figure>
```

**5. Responsive Behavior with Grid and Flex**

Combine image classes with Bootstrap's grid and utility classes to make image galleries and layout systems:
```html
<div class="row">
  <div class="col-md-4">
    <img src="1.jpg" class="img-fluid rounded" alt="Image 1"/>
  </div>
  <div class="col-md-4">
    <img src="2.jpg" class="img-fluid rounded" alt="Image 2"/>
  </div>
</div>
```

**6. Background Images**

Bootstrap doesn't have built-in background image classes but works well with custom CSS or utility classes like `bg-dark`, `text-white`, and `p-5` to style background image containers:
```html
<div class="bg-dark text-white p-5" style="background-image: url('bg.jpg'); background-size: cover;">
  <h1>Background Hero</h1>
</div>
```

**7. Overlay Text on Images**

Overlaying text using positioning utilities:
```html
<div class="position-relative">
  <img src="header.jpg" class="img-fluid" alt="Header"/>
  <h2 class="position-absolute top-50 start-50 translate-middle text-white">Overlay Heading</h2>
</div>
```

**8. Accessibility Best Practices**

Always include `alt` attributes on `<img/>` tags for accessibility and SEO. Use descriptive text for screen readers.

**9. Image Lazy Loading**

Use the `loading="lazy"` attribute to defer offscreen images, improving performance:
```html
<img src="gallery.jpg" loading="lazy" class="img-fluid" alt="Lazy loaded image"/>
```

**10. Integration with Carousel, Cards, and Modals**

Images can be easily inserted into other Bootstrap components such as carousels, cards, and modals to create rich user interfaces.

**Conclusion**
<p>
Bootstrap provides flexible tools for managing images in any layout. Whether you're working on responsive design, custom galleries, or decorative layouts with background overlays and captions, Bootstrap’s image utilities streamline the process while ensuring accessibility and responsiveness.</p>
</section>


          <section id="alerts">
  <h2>Alerts</h2>
  <p>Alerts are used to provide contextual feedback messages for typical user actions. Bootstrap provides a flexible alert component that can be easily customized for success messages, warnings, errors, or informational prompts.

**1. Basic Alert Structure**

Use the `.alert` class combined with contextual color classes like `.alert-primary`, `.alert-success`, `.alert-danger`, etc.:
```html
<div class="alert alert-success" role="alert">
  Your profile has been updated successfully!
</div>
```

**2. Contextual Alert Types**

Bootstrap offers a variety of contextual classes:
- `.alert-primary`
- `.alert-secondary`
- `.alert-success`
- `.alert-danger`
- `.alert-warning`
- `.alert-info`
- `.alert-light`
- `.alert-dark`

Each provides a distinct color and meaning for the alert.

**3. Dismissing Alerts**

Make alerts dismissible by adding the `.alert-dismissible` class and a close button:
```html
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Warning!</strong> You should check your inputs.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

**4. Links in Alerts**

Use `.alert-link` to highlight links inside alerts:
```html
<div class="alert alert-info">
  Check out our <a href="#" class="alert-link">latest updates</a>.
</div>
```

**5. Alert Content Formatting**

You can use headings and paragraphs inside alerts:
```html
<div class="alert alert-danger">
  <h4 class="alert-heading">Error!</h4>
  <p>There was an issue saving your data. Please try again.</p>
  <hr/>
  <p class="mb-0">Contact support if the problem persists.</p>
</div>
```

**6. Animating Alerts**

Use `.fade` and `.show` classes with dismissible alerts to animate them:
```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
  This alert will fade in.
</div>
```

**7. Alert Accessibility**

Include `role="alert"` to notify screen readers that this is a dynamic message. This improves accessibility for users with assistive technologies.

**8. Custom Alerts with Icons**

You can combine alerts with icon libraries such as Bootstrap Icons or Font Awesome:
```html
<div class="alert alert-warning d-flex align-items-center" role="alert">
  <i class="bi bi-exclamation-triangle-fill me-2"></i>
  <div>
    Warning! Please verify your email address.
  </div>
</div>
```

**9. Stacking Alerts**

Multiple alerts can be stacked vertically with spacing utilities:
```html
<div class="mb-2 alert alert-info">Info message</div>
<div class="mb-2 alert alert-danger">Danger message</div>
```

**10. Dynamic Alerts with JavaScript**

Use JavaScript (manually or via Bootstrap JS) to dynamically create or dismiss alerts:
```javascript
<pre>
        <code>
          {`const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const alert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    \`<div class="alert alert-\${type} alert-dismissible" role="alert">\`,
    \`   \${message}\`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');
  alertPlaceholder.append(wrapper);
};`}
        </code>
      </pre>

**Conclusion**

Bootstrap alerts are versatile components for providing user feedback. With options for styling, dismissing, adding links, and animation, they allow developers to keep users informed and engaged with minimal effort. Their accessibility and integration with JavaScript make them a staple for interactive and user-friendly interfaces.</p>
</section>

// Cards Section
<section id="cards">
  <h2>Cards</h2>
  <p>The Card component in Bootstrap is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, images, and powerful layout tools.

**1. Basic Card Example**
```html
<div class="card" style="width: 18rem;">
  <img src="image.jpg" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

**2. Card Header and Footer**
```html
<div class="card">
  <div class="card-header">Featured</div>
  <div class="card-body">
    <p>Content</p>
  </div>
  <div class="card-footer">Footer info</div>
</div>
```

**3. Card Layouts**
Use card groups, decks, and columns:
```html
<div class="card-group">
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

**4. Cards with List Groups**
```html
<div class="card">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Item 1</li>
    <li class="list-group-item">Item 2</li>
  </ul>
</div>
```

**5. Image Overlays**
```html
<div class="card bg-dark text-white">
  <img src="..." class="card-img" alt="..."/>
  <div class="card-img-overlay">
    <h5 class="card-title">Title</h5>
  </div>
</div>
```

**6. Card Alignment and Utilities**
Cards support padding, alignment, margins, background, border, and shadow utilities:
```html
<div class="card text-center shadow-lg border-0"></div>
```

**7. Custom Card Styles**
With Sass, customize border radius, shadows, padding, or add new classes for specific card types like product cards, testimonials, or team member bios.

**8. Responsive Cards**
Use the grid or flex utilities to make cards responsive and adaptive to screen size.

**Conclusion**
Bootstrap cards provide an easy way to build complex UIs. From blog previews to pricing plans and product showcases, cards offer clean organization, consistent structure, and beautiful styling — all with minimal markup and no custom CSS required.</p>
</section>

// Navbar Section
<section id="navbar">
  <h2>Navbar</h2>
  <p>The Navbar component in Bootstrap is a powerful and flexible responsive navigation header, including support for branding, navigation, and more. It helps structure the main menu or top navigation of a website and adapts beautifully to different screen sizes.</p>

**1. Basic Structure**
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Brand</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link active" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
    </ul>
  </div>
</nav>
```

**2. Color Schemes**
Use `.navbar-light` with light backgrounds or `.navbar-dark` with dark backgrounds:
```html
<nav class="navbar navbar-dark bg-dark"></nav>
```

**3. Responsive Behavior**
`.navbar-expand-lg` determines when the navbar becomes horizontal. You can use different breakpoints: `sm`, `md`, `lg`, `xl`, `xxl`.

**4. Brand Logo or Name**
The `.navbar-brand` class is used for a company name, logo, or both:
```html
<a class="navbar-brand" href="#">
  <img src="logo.png" width="30" height="30" class="d-inline-block align-top" alt=""/>
  Company
</a>
```

**5. Collapsible Content**
Navigation links, forms, buttons, or other content can be placed inside `.collapse.navbar-collapse`. The button with `navbar-toggler` toggles it on smaller screens.

**6. Nav Alignment**
Use `ms-auto` to right-align items:
```html
<ul class="navbar-nav ms-auto"/>
```

**7. Dropdown Menus**
```html
<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
  </ul>
</li>
```

**8. Navbar Forms and Search**
```html
<form class="d-flex">
  <input class="form-control me-2" type="search" placeholder="Search"/>
  <button class="btn btn-outline-success" type="submit">Search</button>
</form>
```

**9. Sticky and Fixed Navbars**
- `.fixed-top` makes the navbar stick to the top of the screen.
- `.sticky-top` sticks only on scroll.

**10. Integration Tips**
- Use `aria-*` for accessibility.
- Consider collapse behavior on mobile.
- Style links with `active`, `disabled`, or utility classes.

**Conclusion**
<p>
The Bootstrap navbar is a highly configurable and responsive UI component. It forms the backbone of user navigation and ensures an intuitive experience across devices. Whether using a simple horizontal menu or a fully featured responsive navbar with dropdowns, search, and forms, Bootstrap’s navbar component offers everything needed to build a seamless user interface.</p>
</section>



// Modal Section
<section id="modal">
  <h2>Modals</h2>
  <p>Bootstrap modals are dialog boxes or pop-up windows that appear over the current page. They are widely used to display interactive content such as forms, confirmations, images, and notifications, without requiring the user to leave the current page.</p>

**1. Basic Modal Structure**
```html
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Your content goes here.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

**2. Triggering a Modal**
Use a button or link to trigger the modal:
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch Modal
</button>
```

**3. Modal Sizes**
Modals can be resized with classes:
- `.modal-sm`
- `.modal-lg`
- `.modal-xl`

**4. Vertically Centered Modal**
Use `.modal-dialog-centered` to center vertically:
```html
<div class="modal-dialog modal-dialog-centered"></div>
```

**5. Scrollable Modal**
For lengthy content:
```html
<div class="modal-dialog modal-dialog-scrollable"></div>
```

**6. Fullscreen Modal**
Add `.modal-fullscreen` for 100% viewport:
```html
<div class="modal-dialog modal-fullscreen"></div>
```

**7. Static Backdrop Modal**
Prevent closing when clicking outside:
```html
<div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false"></div>
```

**8. Using JavaScript**
```javascript
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
myModal.show();
```

**9. Accessibility**
Bootstrap automatically handles roles and focus management, but you can add `aria-*` attributes to enhance usability.

**10. Use Cases**
- Login/Register forms
- Confirmation dialogs
- Image/lightbox views
- Dynamic AJAX content

**Conclusion**
<p>
Modals in Bootstrap are powerful, easy to implement, and highly customizable. They enhance user experience by enabling interaction within a contained UI overlay, keeping users focused without navigating away from the current page.</p>
</section>


          // Collapse Section
<section id="collapse">
  <h2>Collapse</h2>
  <p>The Collapse component in Bootstrap allows developers to toggle the visibility of content with smooth animations. It’s commonly used for accordions, expandable content sections, and toggling menus.</p>

**1. Basic Collapse Example**
```html
<p>
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Toggle Content
  </a>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    This content is hidden by default and revealed when the button is clicked.
  </div>
</div>
```

**2. Using Buttons or Links**
Both `<a/>` and `<button/>` elements can be used to toggle collapse elements using `data-bs-toggle="collapse"` and `data-bs-target` or `href` attributes.

**3. Multiple Targets**
One trigger can toggle multiple elements by separating the targets with commas:
```html
<button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#first, #second">
  Toggle Both
</button>
```

**4. Accordion Example**
```html
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        This is the content of the first accordion item.
      </div>
    </div>
  </div>
</div>
```

**5. Controlled Collapsing**
Add `.show` to keep an item expanded by default. Remove it to start collapsed.

**6. Animations**
Bootstrap handles height transitions automatically using `max-height`. You can combine with utility classes for padding, margins, etc.

**7. Accessibility**
Use `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes for accessibility. Bootstrap automatically manages most of this when using proper markup.

**8. Horizontal Collapse**
Bootstrap 5.2 introduced experimental horizontal collapse with `.collapse-horizontal`:
```html
<div class="collapse collapse-horizontal" id="collapseWidthExample">
  <div class="card card-body" style="width: 300px;">
    Horizontal collapsible content.
  </div>
</div>
```

**9. JavaScript Control**
You can programmatically show/hide collapse components:
```javascript
var collapseElement = document.getElementById('collapseExample');
var collapseInstance = new bootstrap.Collapse(collapseElement);
collapseInstance.show();
```

**10. Use Cases**
- FAQs and accordions
- Collapsible navigation panels
- Hidden forms and advanced filters
- Toggleable content sections in dashboards

**Conclusion**
<p>
The Collapse component adds a clean, interactive way to reveal or hide content without the need for complex JavaScript. With excellent accessibility, responsive integration, and multiple triggering options, it’s ideal for dynamic layouts and user-driven interfaces.</p>
</section>


// Collapse Section
<section id="collapse">
  <h2>Collapse</h2>
  <p>The Collapse component in Bootstrap allows developers to toggle the visibility of content with smooth animations. It’s commonly used for accordions, expandable content sections, and toggling menus.
</p>
**1. Basic Collapse Example**
```html
<p>
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Toggle Content
  </a>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    This content is hidden by default and revealed when the button is clicked.
  </div>
</div>
```

**2. Using Buttons or Links**
Both `<a/>` and `<button/>` elements can be used to toggle collapse elements using `data-bs-toggle="collapse"` and `data-bs-target` or `href` attributes.

**3. Multiple Targets**
One trigger can toggle multiple elements by separating the targets with commas:
```html
<button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#first, #second">
  Toggle Both
</button>
```

**4. Accordion Example**
```html
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        This is the content of the first accordion item.
      </div>
    </div>
  </div>
</div>
```

**5. Controlled Collapsing**
Add `.show` to keep an item expanded by default. Remove it to start collapsed.

**6. Animations**
Bootstrap handles height transitions automatically using `max-height`. You can combine with utility classes for padding, margins, etc.

**7. Accessibility**
Use `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes for accessibility. Bootstrap automatically manages most of this when using proper markup.

**8. Horizontal Collapse**
Bootstrap 5.2 introduced experimental horizontal collapse with `.collapse-horizontal`:
```html
<div class="collapse collapse-horizontal" id="collapseWidthExample">
  <div class="card card-body" style="width: 300px;">
    Horizontal collapsible content.
  </div>
</div>
```

**9. JavaScript Control**
You can programmatically show/hide collapse components:
```javascript
var collapseElement = document.getElementById('collapseExample');
var collapseInstance = new bootstrap.Collapse(collapseElement);
collapseInstance.show();
```

**10. Use Cases**
- FAQs and accordions
- Collapsible navigation panels
- Hidden forms and advanced filters
- Toggleable content sections in dashboards

**Conclusion**
<p>
The Collapse component adds a clean, interactive way to reveal or hide content without the need for complex JavaScript. With excellent accessibility, responsive integration, and multiple triggering options, it’s ideal for dynamic layouts and user-driven interfaces.</p>
</section>

// Carousel Section
<section id="carousel">
  <h2>Carousel</h2>
  <p>The Bootstrap Carousel component is a slideshow for cycling through a series of content—images, text, or custom markup. It includes support for indicators, controls, captions, and autoplaying content.</p>

**1. Basic Carousel Example**
```html
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="slide1.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="slide2.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
```

**2. Indicators**
Add carousel indicators using `<div class="carousel-indicators"/>`:
```html
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
  <button type="button" data-bs-slide-to="1" data-bs-target="#carouselExample"></button>
</div>
```

**3. Captions**
Include captions with `.carousel-caption`:
```html
<div class="carousel-caption d-none d-md-block">
  <h5>First slide label</h5>
  <p>Description text here.</p>
</div>
```

**4. Crossfade Animation**
Use `.carousel-fade` for crossfade transitions:
```html
<div class="carousel slide carousel-fade"></div>
```

**5. Autoplay and Intervals**
Use `data-bs-ride="carousel"` and `data-bs-interval="3000"` for timing between slides.

**6. Pause on Hover**
Carousel automatically pauses when the user hovers over it. You can disable this via JS or attributes.

**7. JavaScript Control**
```javascript
<pre>
        <code>
          {`var carousel = new bootstrap.Carousel('#carouselExample', {
  interval: 2000,
  wrap: true
});`}
        </code>
      </pre>


**8. Accessibility**
Use `aria-labels`, `alt` text on images, and visually hidden elements for screen readers.

**9. Customizing with Sass**
Modify transition timing, indicator size, colors, and more with Bootstrap’s Sass variables.

**10. Use Cases**
- Image sliders
- Hero banners
- Product showcases
- Testimonials and review rotators

**Conclusion**
<p>
The Carousel component is a visually appealing way to highlight content dynamically. With rich features, touch support, accessibility, and customization options, it can serve as a central visual component on landing pages and galleries.</p>
</section>

// Utility Classes Section
<section id="utilities">
  <h2>Utility Classes</h2>
  <p>Bootstrap’s utility classes provide low-level, single-purpose helper classes that can be used to style elements directly without writing custom CSS. They are designed to offer speed, simplicity, and maintainability for common layout and design tasks.

**1. Spacing Utilities (Margin & Padding)**
Use `.m-*`, `.p-*`, `.mt-*`, `.mb-*`, `.ms-*`, `.me-*`, `.pt-*`, `.pb-*`, etc., where `*` can range from `0` to `5`, `auto`, or responsive variants:
```html
<div class="mt-3 mb-2 p-4">Box with margin top and bottom, and padding</div>
```

**2. Display Utilities**
Set display modes:
- `.d-block`, `.d-inline`, `.d-inline-block`
- `.d-flex`, `.d-inline-flex`, `.d-grid`, `.d-none`
- Responsive: `.d-sm-block`, `.d-md-flex`, etc.

**3. Text Utilities**
Text alignment, transformation, and wrapping:
```html
<p class="text-center text-uppercase text-truncate">Centered, uppercased, truncated text</p>
```

**4. Sizing Utilities**
Control width and height:
```html
<div class="w-25 h-50">Box with 25% width and 50% height</div>
```

**5. Background and Color Utilities**
```html
<div class="bg-primary text-white p-3">Colored background with white text</div>
```

**6. Borders and Shadows**
Add/remove borders, change border radius, apply shadows:
```html
<div class="border rounded shadow-sm">Box with border, rounded corners, and shadow</div>
```

**7. Position Utilities**
Control position and offsets:
```html
<div class="position-relative top-0 start-50 translate-middle">Centered element</div>
```

**8. Flexbox Utilities**
Quickly create flex layouts:
```html
<div class="d-flex justify-content-between align-items-center">...</div>
```

**9. Visibility & Overflow**
```html
<div class="invisible">This is hidden but still occupies space</div>
<div class="overflow-auto">Scrollable when content overflows</div>
```

**10. Responsive Helpers**
Combine utilities with breakpoints (`sm`, `md`, `lg`, `xl`, `xxl`) for responsiveness:
```html
<div class="d-none d-md-block">Hidden on small, visible on medium+</div>
```

**Conclusion**
Utility classes provide a powerful alternative to custom CSS for rapid styling, consistent layouts, and responsive designs. Mastering Bootstrap’s utility classes can significantly speed up development and reduce the need for writing additional style rules.</p>
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
