import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const ReactTutorial = () => {
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
          <h2>React Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Environment Setup</a></li>
            <li><a href="#jsx">JSX</a></li>
            <li><a href="#components">Components</a></li>
            <li><a href="#props">Props</a></li>
            <li><a href="#state">State</a></li>
            <li><a href="#events">Event Handling</a></li>
            <li><a href="#hooks">Hooks</a></li>
            <li><a href="#useeffect">useEffect</a></li>
            <li><a href="#forms">Forms</a></li>
            <li><a href="#router">React Router</a></li>
            <li><a href="#context">Context API</a></li>
            <li><a href="#axios">Axios & API Calls</a></li>
            <li><a href="#redux">Redux Basics</a></li>
            <li><a href="#quiz">Exercises</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          
          <section id="intro">
            <h2>Introduction</h2>
            <p>
              React is a JavaScript library for building user interfaces, developed by Facebook in 2013. React allows developers to create fast, scalable, and interactive web applications. Its key feature is the Virtual DOM, which makes React applications highly performant by efficiently updating only the parts of the UI that need to change when the data changes.
            </p>
            <p>
              React follows a component-based architecture where the user interface is broken down into small, reusable components. These components can be composed into larger structures, making development modular and maintainable. React components can be functional or class-based, but with the introduction of Hooks in React 16.8, functional components became the preferred choice for most developers.
            </p>
            <p>
              **React's Key Features:**
              <ul>
                <li>Virtual DOM: Optimizes rendering by only updating changed components.</li>
                <li>Component-Based Architecture: Encourages the reuse of code by building small, isolated components.</li>
                <li>Declarative Syntax: Makes code more readable by describing the UI in terms of its state.</li>
                <li>Unidirectional Data Flow: Data in React flows in one direction, which makes it easier to debug and maintain.</li>
              </ul>
            </p>
            <p>
              React enables developers to build modern web applications with reusable components, efficient rendering, and a smooth user experience. It allows you to focus on building rich user interfaces by abstracting away complex details like DOM manipulation.
            </p>
            <p>
              **Evolution of React:**
              React was created by Jordan Walke, a software engineer at Facebook, and first released in 2013. Since its release, React has revolutionized frontend development. Its introduction of a declarative syntax, Virtual DOM, and component-based architecture made it an attractive option for building large-scale applications.
            </p>
            <p>
              React’s Virtual DOM uses a lightweight in-memory representation of the actual DOM, which allows React to compare and update only the changed parts of the DOM when the state or data changes, improving performance. With React, developers can create complex UIs from small, independent components that each manage their own state. This leads to better code reuse and easier testing and debugging.
            </p>
          </section>

          {/* Environment Setup */}
          <section id="setup">
            <h2>Environment Setup</h2>
            <pre>{`npx create-react-app my-app
cd my-app
npm start`}</pre>
            <p>
              Setting up the React development environment involves a few steps. First, you need to install Node.js and npm (Node Package Manager), which is used to install dependencies. Once Node.js is installed, you can use the `create-react-app` tool to quickly scaffold a new React project.
            </p>
            <p>
              **Steps to Set Up React:**
              <ol>
                <li>Install Node.js from the official website: https://nodejs.org/</li>
                <li>Open your terminal or command prompt and run the following command to install `create-react-app`: `npm install -g create-react-app`.</li>
                <li>Create a new React app by running: `npx create-react-app my-app`.</li>
                <li>Navigate to the project directory: `cd my-app`.</li>
                <li>Start the development server: `npm start`.</li>
              </ol>
            </p>
            <p>
              After completing these steps, you will be able to open your browser and access the app at `http://localhost:3000`. This is where you can begin building your React application.
            </p>
            <p>
              **Additional Tools You May Need:**
              <ul>
                <li><strong>Code Editor:</strong> Use a code editor like Visual Studio Code (VSCode) for writing your React code.</li>
                <li><strong>Chrome Developer Tools:</strong> Essential for debugging your React applications.</li>
                <li><strong>Prettier & ESLint:</strong> These tools help maintain clean, consistent code and avoid common mistakes.</li>
              </ul>
            </p>
          </section>

          {/* JSX Section */}
          <section id="jsx">
            <h2>JSX</h2>
            <pre>{`const element = <h1>Hello, world!</h1>;`}</pre>
            <p>
              JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It is used in React to describe what the UI should look like. JSX makes it easier to create React components by combining JavaScript and HTML syntax.
            </p>
            <p>
              JSX allows developers to write code that closely resembles HTML. It is then transformed into JavaScript using the React Babel compiler. React uses JSX to describe the structure of the UI components. Instead of using `document.createElement()` and manually appending DOM nodes, JSX allows you to declare the structure directly in your JavaScript code.
            </p>
            <p>
              **Why JSX is Useful:**
              <ul>
                <li>It allows you to write code that is more intuitive and closer to HTML.</li>
                <li>JSX makes it easier to create React components by embedding HTML directly inside JavaScript functions.</li>
                <li>It improves the readability of your code, making it easier to debug and maintain.</li>
              </ul>
            </p>
            <p>
              **JSX Example:**
              Here’s a simple example of JSX used inside a React component:
              <pre>{`function Welcome() {
  return <h1>Hello, world!</h1>;
}`}</pre>
              This code represents a functional React component that returns JSX, which will be rendered to the screen.
            </p>
            <p>
              React uses a virtual DOM to compare the JSX with the actual DOM and update only the parts that have changed. This process allows React to be highly efficient.
            </p>
          </section>

          {/* Components Section */}
          <section id="components">
            <h2>Components</h2>
            <pre>{`function Welcome() {
  return <h1>Welcome</h1>;
}`}</pre>
            <p>
              Components are the building blocks of React applications. A React app is built by composing components, which are reusable UI elements that can be nested inside one another. Components can either be functional or class-based, and they can accept inputs (props) and maintain internal state.
            </p>
            <p>
              **Types of Components:**
              1. **Functional Components:** These are simpler components defined as JavaScript functions. They do not require the `this` keyword and are ideal for presentational or stateless components.
              2. **Class Components:** These are older components that require the use of the `this` keyword. They can manage state and lifecycle methods but have been largely replaced by functional components with hooks.
            </p>
            <p>
              **Why Use Components:**
              Components enable code reusability, modularity, and maintainability. They make it easier to break down complex UIs into smaller, manageable chunks of code. React applications are designed to be composed of many small components, each managing a specific part of the UI.
            </p>
            <p>
              **Props and State in Components:**
              - **Props:** Props are the inputs passed to a component from its parent. They are immutable, meaning the component receiving the props cannot modify them.
              - **State:** State is the internal data of a component, which can be modified using React's state management methods. When the state of a component changes, React re-renders the component to reflect the new state.
            </p>
          </section>

          {/* Props Section */}
          <section id="props">
            <h2>Props</h2>
            <pre>{`function Greet(props) {
  return <h1>Hello, {props.name}</h1>;
}`}</pre>
            <p>
              Props (short for properties) are the mechanism by which data is passed from a parent component to a child component in React. Props are immutable, meaning that a component cannot modify its own props. They are used to customize the behavior and appearance of components.
            </p>
            <p>
              Props allow you to create reusable components that can be customized by passing different values. For example, you might have a `Button` component that can accept a `color` prop to determine its background color.
            </p>
            <p>
              **Example of Props Usage:**
              In the following example, the `Greet` component accepts a `name` prop, which is displayed inside an `h1` element:
              <pre>{`<Greet name="John" />`}</pre>
              This will render: "Hello, John".
            </p>
            <p>
              **Prop Validation and Default Props:**
              - **PropTypes:** React provides a `PropTypes` module to validate the props passed to a component. This helps catch bugs early by ensuring that the correct data types are passed.
              - **Default Props:** You can also set default props for components in case no props are passed.
            </p>
          </section>

          {/* State Section */}
          <section id="state">
            <h2>State</h2>
            <pre>{`const [count, setCount] = useState(0);`}</pre>
            <p>
              State is a fundamental concept in React that allows components to manage their own data. While props are used to pass data from parent to child components, state is used to store and update data that affects a component's rendering.
            </p>
            <p>
              State is mutable, meaning that it can be changed by calling the `setState` method or using the `useState` hook in functional components. Whenever state changes, React re-renders the component to reflect the updated data.
            </p>
            <p>
              **Managing State in Class Components:**
              In class components, state is managed using the `this.state` object and updated using `this.setState()`. For example:
              <pre>{`this.setState({ count: this.state.count + 1 })`}</pre>
            </p>
            <p>
              **Managing State in Functional Components:**
              In functional components, state is managed using the `useState` hook:
              <pre>{`const [count, setCount] = useState(0);`}</pre>
              The `useState` hook returns an array with the current state value and a function to update it.
            </p>
            <p>
              **State Updates:**
              State updates are asynchronous in React. This means that multiple state updates may be batched together, which can sometimes lead to unexpected results if you try to read state immediately after setting it.
            </p>
          </section>

          {/* Event Handling Section */}
          <section id="events">
            <h2>Event Handling</h2>
            <pre>{`<button onClick={() => alert('Clicked!')}>Click Me</button>`}</pre>
            <p>
              In React, events are handled using a synthetic event system, which is a cross-browser wrapper around the browser's native events. React’s event system is designed to work consistently across all browsers, making it easier for developers to manage events.
            </p>
            <p>
              React provides several built-in event handlers, such as `onClick`, `onChange`, `onSubmit`, `onKeyPress`, etc., which are passed to components as props. These event handlers are triggered when the corresponding event occurs.
            </p>
            <p>
              **Custom Events:**
              React allows you to define custom event handlers for specific interactions in your components. For example, you might have a custom event handler for a form submission:
              <pre>{`<form onSubmit={handleSubmit}>`}</pre>
            </p>
            <p>
              **Event Propagation:**
              React's synthetic event system allows events to propagate through the DOM. You can stop event propagation using the `event.stopPropagation()` method if you don’t want the event to bubble up to other components.
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

export default ReactTutorial;
