import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const JavaScriptTutorial = () => {
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
          <h2>JavaScript Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#syntax">Syntax & Comments</a></li>
            <li><a href="#variables">Variables & Data Types</a></li>
            <li><a href="#operators">Operators</a></li>
            <li><a href="#conditions">Conditionals</a></li>
            <li><a href="#loops">Loops</a></li>
            <li><a href="#functions">Functions</a></li>
            <li><a href="#arrays">Arrays</a></li>
            <li><a href="#objects">Objects</a></li>
            <li><a href="#dom">DOM Manipulation</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#es6">ES6 Features</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
        <section id="intro">
  <h2>Introduction to JavaScript</h2>
  <p>JavaScript is a powerful programming language that allows developers to create dynamic and interactive web pages. It is one of the three core technologies used in web development, alongside HTML and CSS.</p>

  <h3>How JavaScript Works</h3>
  <p>JavaScript is executed on the client-side (in the browser) as well as the server-side (using Node.js). It allows you to manipulate the content of a page without reloading it, which enhances the user experience. JavaScript engines such as Google's V8 (used in Chrome) and SpiderMonkey (used in Firefox) execute JavaScript code quickly and efficiently.</p>

  <h3>JavaScript in Action</h3>
  <p>JavaScript can be used to perform a wide range of tasks on web pages, such as:</p>
  <ul>
    <li>Validating user input in forms</li>
    <li>Creating interactive elements like sliders and dropdown menus</li>
    <li>Fetching and displaying data from an API (AJAX)</li>
    <li>Creating animations and transitions</li>
    <li>Building games and interactive applications</li>
  </ul>
</section>


<section id="syntax">
  <h2>JavaScript Syntax & Comments</h2>
  <p>JavaScript syntax is the set of rules that define a correctly structured JavaScript program. Syntax is the foundation of writing code, and understanding it is crucial for writing error-free code.</p>

  <h3>Single-line Comments</h3>
  <p>Single-line comments are written using two forward slashes <code>//</code>.</p>
  <pre>{`// This is a single-line comment`}</pre>

  <h3>Multi-line Comments</h3>
  <p>Multi-line comments are written using <code>/* */</code> to comment out multiple lines at once.</p>
  <pre>{`/* This is a
multi-line comment
spanning several lines */`}</pre>

  <h3>Variables in JavaScript</h3>
  <p>In JavaScript, variables are containers for storing data values. You can declare variables using <code>let</code>, <code>const</code>, and <code>var</code>.</p>
  <pre>{`let x = 10;  // variable declared with let
const y = 20;  // constant value, cannot be reassigned
var z = 30;  // older way to declare variables`}</pre>

  <h3>Important Rules</h3>
  <ul>
    <li>Variable names are case-sensitive.</li>
    <li>Variables must start with a letter, underscore (<code>_</code>), or dollar sign (<code>$</code>).</li>
    <li>It’s a good practice to use descriptive variable names.</li>
  </ul>
</section>


<section id="variables">
  <h2>Variables & Data Types</h2>
  <p>In JavaScript, variables are used to store data. There are various data types, including primitive types (e.g., numbers, strings, booleans) and complex types (e.g., arrays, objects).</p>

  <h3>Primitive Data Types</h3>
  <p>Primitive data types in JavaScript include:</p>
  <ul>
    <li><strong>String</strong>: Used for storing text. E.g., <code>"Hello, World!"</code></li>
    <li><strong>Number</strong>: Used for storing numeric values. E.g., <code>10, 3.14</code></li>
    <li><strong>Boolean</strong>: Represents <code>true</code> or <code>false</code> values.</li>
    <li><strong>Null</strong>: Represents an empty or non-existent value.</li>
    <li><strong>Undefined</strong>: Represents a variable that has been declared but not assigned a value.</li>
    <li><strong>Symbol</strong>: A new primitive data type introduced in ES6 for creating unique identifiers.</li>
  </ul>

  <h3>Complex Data Types</h3>
  <p>Complex data types are used to store collections of values:</p>
  <ul>
    <li><strong>Array</strong>: An ordered collection of values. E.g., <code>[1, 2, 3, 4]</code></li>
    <li><strong>Object</strong>: A collection of key-value pairs. E.g., <code>{{ name: "Alice", age: 30 }}</code></li>
  </ul>

  <h3>Example: Declaring Variables with Different Data Types</h3>
  <pre>{`let name = "Alice";    // String
let age = 30;            // Number
let isStudent = true;    // Boolean
let studentInfo = null;  // Null`}</pre>
</section>

<section id="operators">
  <h2>Operators in JavaScript</h2>
  <p>Operators are used to perform operations on variables and values. JavaScript has a variety of operators, including arithmetic, comparison, logical, and assignment operators.</p>

  <h3>Arithmetic Operators</h3>
  <p>These operators are used to perform mathematical calculations.</p>
  <pre>{`let sum = 10 + 5;     // Addition
let diff = 10 - 5;    // Subtraction
let product = 10 * 5; // Multiplication
let quotient = 10 / 5; // Division
let remainder = 10 % 3; // Modulus (remainder)`}</pre>

  <h3>Comparison Operators</h3>
  <p>Comparison operators are used to compare values. These operators return boolean values (<code>true</code> or <code>false</code>).</p>
  <pre>{`let isEqual = (10 == 10);     // true (Loose equality)
let isStrictEqual = (10 === "10"); // false (Strict equality)
let isGreaterThan = (10 > 5);     // true
let isLessThanOrEqual = (10 <= 5); // false`}</pre>

  <h3>Logical Operators</h3>
  <p>Logical operators are used to combine multiple conditions in boolean logic.</p>
  <pre>{`let isAdult = true;
let hasPermission = false;
let canAccess = isAdult && hasPermission; // false (AND operator)
let canAccess = isAdult || hasPermission; // true (OR operator)
let canAccess = !isAdult; // false (NOT operator)`}</pre>
</section>


<section id="conditions">
  <h2>Conditionals in JavaScript</h2>
  <p>Conditional statements allow you to execute code based on specific conditions. JavaScript provides <code>if</code>, <code>else</code>, and <code>switch</code> statements to handle conditional logic.</p>

  <h3>If-Else Statement</h3>
  <pre>{`let age = 20;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}`}</pre>

  <h3>Switch Statement</h3>
  <p>The <code>switch</code> statement is used to perform different actions based on different conditions.</p>
  <pre>{`let day = "Monday";
switch(day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("End of the week");
    break;
  default:
    console.log("Midweek");
}`}</pre>
</section>


<section id="loops">
  <h2>Loops in JavaScript</h2>
  <p>Loops allow you to run a block of code multiple times based on certain conditions. JavaScript provides several types of loops to iterate over data.</p>

  <h3>For Loop</h3>
  <pre>{`for (let i = 0; i < 5; i++) {
  console.log(i);  // Logs numbers 0 to 4
}`}</pre>

  <h3>While Loop</h3>
  <pre>{`let x = 0;
while (x < 5) {
  console.log(x);  // Logs numbers 0 to 4
  x++;
}`}</pre>

  <h3>Do-While Loop</h3>
  <pre>{`let y = 0;
do {
  console.log(y);  // Logs numbers 0 to 4
  y++;
} while (y < 5);`}</pre>

  <h3>Loop Through Arrays</h3>
  <pre>{`let fruits = ["Apple", "Banana", "Mango"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);  // Logs each fruit
}`}</pre>
</section>


<section id="functions">
  <h2>Functions in JavaScript</h2>
  <p>Functions are reusable blocks of code that can be called to perform a specific task. Functions can accept parameters and return values.</p>

  <h3>Function Declaration</h3>
  <pre>{`function greet(name) {
  return "Hello, " + name;
}`}</pre>

  <h3>Function Expression</h3>
  <pre>{`let greet = function(name) {
  return "Hello, " + name;
};`}</pre>

  <h3>Arrow Function (ES6)</h3>
  <pre>{`const greet = (name) => {
  return "Hello, " + name;
};`}</pre>

  <h3>Calling a Function</h3>
  <pre>{`let greeting = greet("Alice");  // Returns "Hello, Alice"`}</pre>
</section>

<section id="arrays">
  <h2>Arrays in JavaScript</h2>
  <p>Arrays are used to store multiple values in a single variable. Arrays are indexed and allow you to access elements using an index.</p>

  <h3>Creating an Array</h3>
  <pre>{`let fruits = ["Apple", "Banana", "Mango"];`}</pre>

  <h3>Accessing Array Elements</h3>
  <pre>{`console.log(fruits[0]);  // Logs "Apple"`}</pre>

  <h3>Array Methods</h3>
  <ul>
    <li><code>push()</code>: Adds an element to the end of the array.</li>
    <li><code>pop()</code>: Removes the last element from the array.</li>
    <li><code>shift()</code>: Removes the first element from the array.</li>
    <li><code>unshift()</code>: Adds an element to the beginning of the array.</li>
    <li><code>forEach()</code>: Loops through each element of the array.</li>
  </ul>

  <h3>Example: Loop Through an Array</h3>
  <pre>{`fruits.forEach(function(fruit) {
  console.log(fruit);
});`}</pre>
</section>


<section id="objects">
  <h2>Objects in JavaScript</h2>
  <p>Objects in JavaScript are key-value pairs, where the key (also known as a property) is a string, and the value can be of any data type, including functions, arrays, and even other objects. Objects are used to represent real-world entities and allow you to group related data and functions together.</p>

  <h3>Creating an Object</h3>
  <pre>{`let person = {
  name: "John",
  age: 30,
  greet: function() {
    console.log("Hi, my name is " + this.name);
  }
};`}</pre>

  <h3>Accessing Object Properties</h3>
  <p>You can access object properties using dot notation or bracket notation:</p>
  <pre>{`console.log(person.name);   // Dot notation: John
console.log(person["age"]);    // Bracket notation: 30`}</pre>

  <h3>Adding and Modifying Object Properties</h3>
  <p>You can add new properties to an object or modify existing ones:</p>
  <pre>{`person.email = "john@example.com";   // Adding a new property
person.age = 31;                        // Modifying an existing property`}</pre>

  <h3>Methods in Objects</h3>
  <p>Methods are functions that belong to an object. You can define methods within an object just like properties:</p>
  <pre>{`person.greet();  // Output: Hi, my name is John`}</pre>
</section>


<section id="dom">
  <h2>DOM Manipulation in JavaScript</h2>
  <p>The Document Object Model (DOM) represents the structure of an HTML document as an object. JavaScript allows you to access and manipulate the DOM to change the content, structure, and style of a web page dynamically.</p>

  <h3>Accessing DOM Elements</h3>
  <p>You can access HTML elements using methods like <code>getElementById()</code>, <code>getElementsByClassName()</code>, or <code>querySelector()</code>.</p>
  <pre>{`let element = document.getElementById("demo");`}</pre>

  <h3>Changing Content</h3>
  <p>To change the content of an element, use the <code>innerHTML</code> property:</p>
  <pre>{`document.getElementById("demo").innerHTML = "Hello JavaScript!";`}</pre>

  <h3>Changing Styles</h3>
  <p>To modify an element’s style, you can use the <code>style</code> property:</p>
  <pre>{`document.getElementById("demo").style.color = "blue";`}</pre>

  <h3>Creating New Elements</h3>
  <p>You can create new elements and append them to the DOM:</p>
  <pre>{`let newElement = document.createElement("div");
newElement.innerHTML = "This is a new element";
document.body.appendChild(newElement);`}</pre>
</section>


<section id="events">
  <h2>Events in JavaScript</h2>
  <p>Events in JavaScript allow you to handle user interactions with the web page, such as clicks, keyboard presses, mouse movements, and more. JavaScript provides a powerful way to respond to these events using event listeners.</p>

  <h3>Adding an Event Listener</h3>
  <p>Use <code>addEventListener()</code> to attach an event handler to an element. It takes two arguments: the event type (e.g., "click", "mouseover") and the callback function to execute when the event occurs.</p>
  <pre>{`document.getElementById("btn").addEventListener("click", function() {
  alert("Button clicked!");
});`}</pre>

  <h3>Event Types</h3>
  <ul>
    <li><strong>click:</strong> Triggered when an element is clicked.</li>
    <li><strong>mouseover:</strong> Triggered when the mouse pointer enters an element.</li>
    <li><strong>keydown:</strong> Triggered when a key is pressed down.</li>
    <li><strong>submit:</strong> Triggered when a form is submitted.</li>
    <li><strong>change:</strong> Triggered when the value of an input element changes.</li>
  </ul>

  <h3>Removing an Event Listener</h3>
  <p>If you want to remove an event listener, use the <code>removeEventListener()</code> method:</p>
  <pre>{`document.getElementById("btn").removeEventListener("click", function() {
  alert("Button clicked!");
});`}</pre>
</section>


<section id="es6">
  <h2>ES6 Features in JavaScript</h2>
  <p>ECMAScript 6 (ES6) introduced many new features that make JavaScript more concise and powerful. Here are some of the key features:</p>

  <h3>Arrow Functions</h3>
  <p>Arrow functions provide a shorter syntax for writing functions and don't have their own <code>this</code> context.</p>
  <pre>{`const greet = (name) => \`Hello, \${name}\`;`}</pre>

  <h3>Let and Const</h3>
  <p>ES6 introduced <code>let</code> and <code>const</code> for variable declaration. <code>let</code> allows block-scoped variables, while <code>const</code> is used for constants that cannot be reassigned.</p>
  <pre>{`let x = 10;
const y = 20;`}</pre>

  <h3>Template Literals</h3>
  <p>Template literals allow you to embed expressions inside strings using <code>\${}</code> syntax.</p>
  <pre>{`let name = "Alice";
console.log(\`Hello, \${name}!\`);  // Output: Hello, Alice!`}</pre>

  <h3>Destructuring</h3>
  <p>Destructuring allows you to unpack values from arrays or objects into variables.</p>
  <pre>{`let person = { name: "John", age: 30 };
let { name, age } = person;
console.log(name);  // Output: John`}</pre>

  <h3>Modules</h3>
  <p>Modules allow you to split your code into multiple files. You can use <code>import</code> and <code>export</code> to share functionality between different JavaScript files.</p>
  <pre>{`// file: math.js
export function add(a, b) {
  return a + b;
}`}</pre>
  <pre>{`// file: main.js
import { add } from './math.js';
console.log(add(2, 3));  // Output: 5`}</pre>

  <h3>Promises</h3>
  <p>Promises are a new way to handle asynchronous operations, allowing you to work with asynchronous code more cleanly than callbacks.</p>
  <pre>{`let promise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Operation successful");
  } else {
    reject("Operation failed");
  }
});
promise.then(result => console.log(result)).catch(error => console.log(error));`}</pre>
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

export default JavaScriptTutorial;
