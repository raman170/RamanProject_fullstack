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
  <p>
    JavaScript is one of the most widely used programming languages in the world today. It is a high-level, interpreted scripting language that enables developers to implement complex features on web pages—every time a web page does more than just sit there and display static information, such as updating content dynamically, interactive maps, animated graphics, scrolling video, and more, JavaScript is probably involved.
  </p>
  <p>
    Originally developed by Brendan Eich in 1995 while working at Netscape Communications, JavaScript was initially created to complement Java and was named in a way to ride on the popularity of Java, although the two languages are vastly different. It was initially called Mocha, then renamed to LiveScript, and eventually to JavaScript. Despite its name, JavaScript is not related to Java. It is dynamically typed, prototype-based, and supports first-class functions, making it a flexible and powerful tool for both frontend and backend development.
  </p>
  <p>
    In the early days, JavaScript was used for simple client-side validations or pop-ups, but with the advent of more powerful JavaScript engines like Google's V8 (used in Chrome) and tools like Node.js, it evolved into a robust language capable of building complete applications both on the server-side and client-side.
  </p>
  <p>
    Today, JavaScript is at the core of virtually every modern web application. Its ecosystem includes powerful libraries and frameworks like React, Angular, Vue.js for the frontend, and Node.js, Express for the backend. JavaScript also powers many cross-platform mobile applications using frameworks like React Native and Ionic, and even desktop applications through Electron.js.
  </p>
  <h3>Why Learn JavaScript?</h3>
  <p>
    JavaScript is indispensable for anyone looking to become a web developer. Whether you're a frontend, backend, or full-stack developer, you will need JavaScript at some point. It is:
  </p>
  <ul>
    <li><strong>Ubiquitous:</strong> JavaScript runs in every modern web browser without the need for plugins.</li>
    <li><strong>Versatile:</strong> You can build web apps, mobile apps, games, servers, and even control IoT devices.</li>
    <li><strong>In-demand:</strong> JavaScript is consistently ranked as one of the top languages employers look for.</li>
    <li><strong>Supported:</strong> With millions of developers worldwide and thousands of libraries, the community support is vast.</li>
    <li><strong>Continually evolving:</strong> ECMAScript (ES) updates ensure the language is modern and efficient.</li>
  </ul>
  <h3>How JavaScript Works in the Browser</h3>
  <p>
    When you load a webpage, your browser downloads the HTML, CSS, and JavaScript files. The browser renders the HTML and CSS to display the page and then executes the JavaScript code using its JavaScript engine (like V8 in Chrome, SpiderMonkey in Firefox). JavaScript can interact with the Document Object Model (DOM), allowing you to update the structure, style, and content of the page dynamically.
  </p>
  <p>
    JavaScript is single-threaded but asynchronous, meaning it executes code in a single line (thread) but can handle tasks like data fetching or event listening in the background using constructs like callbacks, promises, and async/await.
  </p>
  <h3>JavaScript in Modern Web Development</h3>
  <p>
    In the past decade, JavaScript has seen exponential growth, thanks in large part to the rise of SPAs (Single Page Applications), REST APIs, and frontend frameworks like React and Angular. With these tools, developers can create complex, fast, and highly interactive applications entirely in JavaScript.
  </p>
  <p>
    On the backend, Node.js has revolutionized the landscape by allowing JavaScript to be used server-side. This has led to full-stack JavaScript development, where the same language is used on both the client and server, leading to more maintainable and coherent codebases.
  </p>
  <h3>Popular JavaScript Libraries and Frameworks</h3>
  <ul>
    <li><strong>React:</strong> A library developed by Facebook for building user interfaces.</li>
    <li><strong>Angular:</strong> A full-fledged frontend framework developed by Google.</li>
    <li><strong>Vue:</strong> A progressive JavaScript framework for building user interfaces.</li>
    <li><strong>Node.js:</strong> A runtime environment that lets you run JavaScript on the server.</li>
    <li><strong>Express:</strong> A minimal Node.js framework for building web applications and APIs.</li>
    <li><strong>jQuery:</strong> An older but still-used library that simplifies DOM manipulation.</li>
    <li><strong>Next.js:</strong> A React-based framework for server-side rendering and static websites.</li>
  </ul>
  <h3>Real-world Applications of JavaScript</h3>
  <p>JavaScript is used across industries and platforms. Examples include:</p>
  <ul>
    <li><strong>eCommerce:</strong> Interactive product galleries, real-time cart updates.</li>
    <li><strong>Finance:</strong> Real-time stock tickers, transaction interfaces.</li>
    <li><strong>Education:</strong> Online quizzes, dynamic learning platforms.</li>
    <li><strong>Healthcare:</strong> Appointment scheduling, form validations.</li>
    <li><strong>Gaming:</strong> Browser-based games using HTML5 canvas and WebGL.</li>
    <li><strong>Social Media:</strong> Real-time chat, notifications, dynamic feeds.</li>
  </ul>
  <h3>JavaScript Ecosystem Overview</h3>
  <p>The JavaScript ecosystem is vast and includes:</p>
  <ul>
    <li><strong>Package Managers:</strong> npm, yarn</li>
    <li><strong>Task Runners:</strong> Gulp, Grunt</li>
    <li><strong>Module Bundlers:</strong> Webpack, Parcel, Rollup</li>
    <li><strong>Testing Libraries:</strong> Jest, Mocha, Jasmine</li>
    <li><strong>Linting Tools:</strong> ESLint, Prettier</li>
  </ul>
  <h3>Community and Resources</h3>
  <p>The JavaScript community is enormous, and there's no shortage of tutorials, forums, and documentation:</p>
  <ul>
    <li><a href="https://developer.mozilla.org">MDN Web Docs</a></li>
    <li><a href="https://stackoverflow.com">Stack Overflow</a></li>
    <li><a href="https://github.com">GitHub</a></li>
    <li><a href="https://javascript.info">JavaScript.info</a></li>
    <li><a href="https://frontendmasters.com">Frontend Masters</a></li>
  </ul>
  <p>Mastering JavaScript is a journey, not a destination. It evolves constantly, and staying updated with new features, best practices, and community trends is key to becoming a proficient developer.</p>
</section>


<section id="syntax">
  <h2>JavaScript Syntax & Comments</h2>
  <p>
    JavaScript syntax is the set of rules that define a correctly structured JavaScript program. Like all programming languages, it has a well-defined grammar that developers must follow.
  </p>
  <h3>Basic Syntax Elements</h3>
  <ul>
    <li><strong>Statements:</strong> JavaScript code is made up of statements, which are instructions that the browser can execute. Statements are usually separated by semicolons, although they're optional in many cases.</li>
    <li><strong>Whitespace:</strong> JavaScript ignores whitespace, which means that spaces and line breaks do not affect execution. However, proper formatting improves readability.</li>
    <li><strong>Case Sensitivity:</strong> JavaScript is case-sensitive. For example, <code>myVariable</code> and <code>myvariable</code> are treated as different identifiers.</li>
    <li><strong>Keywords:</strong> Reserved words like <code>let</code>, <code>const</code>, <code>function</code>, and <code>return</code> have special meaning and cannot be used as variable names.</li>
  </ul>

  <h3>JavaScript Comments</h3>
  <p>
    Comments are used to describe what your code does or to disable parts of code during testing.
  </p>
  <ul>
    <li><strong>Single-line comments:</strong> Use <code>//</code> at the beginning of a line.</li>
    <li><strong>Multi-line comments:</strong> Enclose your comment within <code>/* */</code>.</li>
  </ul>

  <pre>
    <code>
// This is a single-line comment

/*
  This is a
  multi-line comment
*/
    </code>
  </pre>

  <h3>Best Practices</h3>
  <ul>
    <li>Always comment your code where the logic isn't immediately obvious.</li>
    <li>Keep comments up to date — outdated comments can confuse future developers.</li>
    <li>Follow consistent code formatting conventions (indentation, spacing).</li>
  </ul>

  <p>
    Understanding JavaScript syntax and properly using comments are essential for writing clean, maintainable, and error-free code.
  </p>
</section>



<section id="variables">
  <h2>Variables & Data Types in JavaScript</h2>
  <p>
    Variables in JavaScript are containers for storing data values. JavaScript is a loosely typed or dynamically typed language, meaning you don’t have to declare a variable's data type explicitly.
  </p>

  <h3>Declaring Variables</h3>
  <ul>
    <li><code>var</code> – Function-scoped, can be redeclared and updated. Avoid using in modern code.</li>
    <li><code>let</code> – Block-scoped, can be updated but not redeclared in the same scope.</li>
    <li><code>const</code> – Block-scoped, cannot be updated or redeclared. Must be initialized during declaration.</li>
  </ul>

  <pre>
    <code>
var x = 5;
let y = 10;
const z = 15;
    </code>
  </pre>

  <h3>Data Types</h3>
  <p>JavaScript has several built-in data types:</p>
  <ul>
    <li><strong>Number</strong> – Includes integers and floating-point numbers.</li>
    <li><strong>String</strong> – A sequence of characters, defined with quotes.</li>
    <li><strong>Boolean</strong> – Logical type: true or false.</li>
    <li><strong>Undefined</strong> – A variable declared but not assigned a value.</li>
    <li><strong>Null</strong> – A deliberate non-value.</li>
    <li><strong>Object</strong> – Complex data type (arrays, functions, etc.).</li>
    <li><strong>Symbol</strong> – A unique and immutable data type introduced in ES6.</li>
    <li><strong>BigInt</strong> – For very large integers (ES2020).</li>
  </ul>

  <h3>Dynamic Typing</h3>
  <p>
    Variables in JavaScript can hold any type of value and that type can change at runtime:
  </p>
  <pre>
    <code>
let myVar = 42;
myVar = "Hello, world!";
    </code>
  </pre>

  <h3>Best Practices</h3>
  <ul>
    <li>Use <code>let</code> and <code>const</code> instead of <code>var</code>.</li>
    <li>Use <code>const</code> by default and only use <code>let</code> when reassignment is needed.</li>
    <li>Choose descriptive variable names to improve code readability.</li>
  </ul>
</section>


<section id="operators">
  <h2>JavaScript Operators</h2>
  <p>
    Operators are symbols used to perform operations on operands. JavaScript provides a wide variety of operators.
  </p>

  <h3>Arithmetic Operators</h3>
  <ul>
    <li><code>+</code> Addition</li>
    <li><code>-</code> Subtraction</li>
    <li><code>*</code> Multiplication</li>
    <li><code>/</code> Division</li>
    <li><code>%</code> Modulus (remainder)</li>
    <li><code>**</code> Exponentiation (ES6)</li>
    <li><code>++</code> Increment</li>
    <li><code>--</code> Decrement</li>
  </ul>

  <h3>Assignment Operators</h3>
  <ul>
    <li><code>=</code> Assign</li>
    <li><code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, etc. – Compound assignments</li>
  </ul>

  <h3>Comparison Operators</h3>
  <ul>
    <li><code>==</code> Equal to (type conversion)</li>
    <li><code>===</code> Strict equal to (no type conversion)</li>
    <li><code>!=</code> Not equal to</li>
    <li><code>!==</code> Strict not equal to</li>
    <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> – Greater/less than comparisons</li>
  </ul>

  <h3>Logical Operators</h3>
  <ul>
    <li><code>&&</code> Logical AND</li>
    <li><code>||</code> Logical OR</li>
    <li><code>!</code> Logical NOT</li>
  </ul>

  <h3>Type Operators</h3>
  <ul>
    <li><code>typeof</code> – Returns the type of a variable</li>
    <li><code>instanceof</code> – Checks whether an object is an instance of a particular class</li>
  </ul>

  <h3>Other Operators</h3>
  <ul>
    <li><code>?</code> Ternary operator (conditional)</li>
    <li><code>,</code> Comma operator</li>
    <li><code>delete</code> – Removes a property from an object</li>
    <li><code>in</code> – Checks if a property exists in an object</li>
  </ul>
</section>



<section id="conditions">
  <h2>JavaScript Conditionals</h2>
  <p>
    Conditional statements are used to perform different actions based on different conditions. JavaScript supports several types of conditional statements.
  </p>

  <h3>if Statement</h3>
  <pre>
    <code>
if (condition) {
  // block of code
}
    </code>
  </pre>

  <h3>if...else Statement</h3>
  <pre>
    <code>
if (condition) {
  // if block
} else {
  // else block
}
    </code>
  </pre>

  <h3>if...else if...else</h3>
  <pre>
    <code>
if (condition1) {
  // block 1
} else if (condition2) {
  // block 2
} else {
  // block 3
}
    </code>
  </pre>

  <h3>Switch Statement</h3>
  <p>
    Used when you have multiple conditions based on the same variable.
  </p>
  <pre>
  <code>
{`
const day = "Monday";
let message = "";

switch (day) {
  case "Monday":
    message = "Start of the week";
    break;
  case "Friday":
    message = "End of the week";
    break;
  default:
    message = "Midweek";
}

console.log(message);
`}
  </code>
</pre>

  <h3>Ternary Operator</h3>
  <p>Compact form of if...else:</p>
  <pre>
    <code>
let result = (score &gt; 50) ? "Pass" : "Fail";
    </code>
  </pre>

  <h3>Truthy and Falsy</h3>
  <p>
    In conditionals, JavaScript evaluates values as <strong>truthy</strong> or <strong>falsy</strong>. Examples of falsy values: <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>.
  </p>

  <h3>Best Practices</h3>
  <ul>
    <li>Use strict equality (<code>===</code>) instead of loose equality (<code>==</code>).</li>
    <li>Always include a default case in switch statements.</li>
    <li>Avoid deeply nested if statements for readability.</li>
  </ul>
</section>
<section id="loops">
  <h2>JavaScript Loops</h2>
  <p>
    Loops are used to repeatedly execute a block of code until a specified condition is met. JavaScript provides several types of loops for different use cases.
  </p>
  <>
  <h3>for Loop</h3>
  <pre>
    <code>{`
for (let i = 0; i < 5; i++) {
  console.log("Iteration " + i);
}
    `}</code>
  </pre>
  <p>This is ideal when the number of iterations is known in advance.</p>

  <h3>while Loop</h3>
  <pre>
    <code>{`
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
    `}</code>
  </pre>
</>

<>
  <h3>do...while Loop</h3>
  <p>This loop executes the code block at least once.</p>
  <pre>
    <code>{`
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
    `}</code>
  </pre>
</>
  <>
  <h3>for...in Loop</h3>
  <p>Used to iterate over object properties.</p>
  <pre>
    <code>{`
const person = {name: "John", age: 30};
for (let key in person) {
  console.log(key + ": " + person[key]);
}
    `}</code>
  </pre>

  <h3>for...of Loop</h3>
  <p>Used to iterate over iterable objects like arrays, strings, etc.</p>
  <pre>
    <code>{`
const colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log(color);
}
    `}</code>
  </pre>
</>
  <h3>Loop Control</h3>
  <ul>
    <li><code>break</code> – Exits the loop immediately.</li>
    <li><code>continue</code> – Skips the current iteration and continues to the next.</li>
  </ul>
</section>


<section id="functions">
  <h2>JavaScript Functions</h2>
  <p>
    Functions are reusable blocks of code designed to perform a particular task. They help in organizing code and avoid repetition.
  </p>

  <h3>Function Declaration</h3>
  <>
  <pre>
    <code>{`
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice"));
    `}</code>
  </pre>

  <h3>Function Expression</h3>
  <pre>
    <code>{`
const greet = function(name) {
  return "Hi, " + name;
};
    `}</code>
  </pre>

  <h3>Arrow Functions (ES6)</h3>
  <pre>
    <code>{`
const add = (a, b) => a + b;
    `}</code>
  </pre>

  <h3>Default Parameters</h3>
  <pre>
    <code>{`
function multiply(a, b = 1) {
  return a * b;
}
    `}</code>
  </pre>

  <h3>Rest Parameters</h3>
  <pre>
    <code>{`
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}
    `}</code>
  </pre>

  <h3>Callback Functions</h3>
  <p>A function passed as an argument to another function.</p>
  <pre>
    <code>{`
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received!");
  }, 1000);
}
fetchData(console.log);
    `}</code>
  </pre>

  <h3>Immediately Invoked Function Expressions (IIFE)</h3>
  <pre>
    <code>{`
(function() {
  console.log("IIFE executed!");
})();
    `}</code>
  </pre>
</>

  <h3>Function Best Practices</h3>
  <ul>
    <li>Keep functions small and focused.</li>
    <li>Use meaningful parameter names.</li>
    <li>Use arrow functions for concise syntax, especially with callbacks.</li>
  </ul>
</section>


<section id="arrays">
  <h2>JavaScript Arrays</h2>
  <p>
    Arrays are used to store multiple values in a single variable. They are zero-indexed and can hold items of any data type.
  </p>

  <h3>Creating Arrays</h3>
  <pre>
    <code>
const fruits = ["apple", "banana", "cherry"];
const numbers = new Array(1, 2, 3, 4);
    </code>
  </pre>

  <h3>Accessing Array Elements</h3>
  <pre>
    <code>
console.log(fruits[0]); // "apple"
    </code>
  </pre>

  <h3>Modifying Arrays</h3>
  <pre>
    <code>
fruits[1] = "orange";
fruits.push("mango"); // Add to end
fruits.pop();         // Remove from end
fruits.unshift("grape"); // Add to beginning
fruits.shift();          // Remove from beginning
    </code>
  </pre>

  <h3>Array Properties and Methods</h3>
  <ul>
    <li><code>length</code> – Returns the number of elements</li>
    <li><code>concat()</code> – Merges arrays</li>
    <li><code>slice()</code> – Returns a part of the array</li>
    <li><code>splice()</code> – Adds/removes elements</li>
    <li><code>indexOf()</code> – Finds the index of an element</li>
    <li><code>includes()</code> – Checks if element exists</li>
    <li><code>sort()</code>, <code>reverse()</code> – Modify order</li>
  </ul>

  <>
  <h3>Looping Through Arrays</h3>
  <pre>
    <code>{`
const fruits = ["apple", "banana", "cherry"];

fruits.forEach(fruit => console.log(fruit));

for (let fruit of fruits) {
  console.log(fruit);
}
    `}</code>
  </pre>
</>


  <h3>Higher-Order Methods</h3>
  <p>ES6+ provides several functional methods:</p>
  <ul>
    <li><code>map()</code> – Creates a new array by applying a function to each element</li>
    <li><code>filter()</code> – Filters elements based on a condition</li>
    <li><code>reduce()</code> – Reduces array to a single value</li>
    <li><code>find()</code> – Finds the first matching element</li>
    <li><code>every()</code>, <code>some()</code> – Check conditions</li>
  </ul>
</section>
<section id="objects">
  <h2>JavaScript Objects</h2>
  <p>
    Objects are a foundational concept in JavaScript. They are used to store keyed collections of various data and more complex entities. Everything in JavaScript is an object, or can behave like one.
  </p>

  <>
  <h3>Creating Objects</h3>
  <pre>
    <code>{`
const person = {
  name: "Alice",
  age: 28,
  isStudent: true,
  greet: function() {
    return "Hello, " + this.name;
  }
};
    `}</code>
  </pre>
</>

  <h3>Accessing Object Properties</h3>
  <ul>
    <li>Dot notation: <code>person.name</code></li>
    <li>Bracket notation: <code>person["age"]</code></li>
  </ul>

  <h3>Modifying Properties</h3>
  <pre>
    <code>
person.age = 29;
person["isStudent"] = false;
    </code>
  </pre>

  <h3>Adding & Deleting Properties</h3>
  <pre>
    <code>
person.country = "Canada";
delete person.isStudent;
    </code>
  </pre>

  <>
  <h3>Nested Objects</h3>
  <pre>
    <code>{`
const student = {
  name: "Bob",
  grades: {
    math: 90,
    science: 85
  }
};
console.log(student.grades.math);
    `}</code>
  </pre>

  <h3>Object Methods</h3>
  <p>Functions that belong to objects are called methods.</p>
  <pre>
    <code>{`
const car = {
  brand: "Toyota",
  start: function() {
    return "Car started";
  }
};
    `}</code>
  </pre>
</>

  <h3>Object Built-in Methods</h3>
  <ul>
    <li><code>Object.keys(obj)</code> – Returns an array of property names</li>
    <li><code>Object.values(obj)</code> – Returns an array of values</li>
    <li><code>Object.entries(obj)</code> – Returns key-value pairs</li>
    <li><code>Object.assign()</code> – Copies properties</li>
    <li><code>hasOwnProperty()</code> – Checks if a property exists</li>
  </ul>
</section>


<section id="dom">
  <h2>DOM Manipulation in JavaScript</h2>
  <p>
    DOM (Document Object Model) represents the HTML structure of a page as a tree of nodes. JavaScript can access and modify the DOM to change page content, structure, and style dynamically.
  </p>

  <h3>Accessing Elements</h3>
  <ul>
    <li><code>document.getElementById("id")</code></li>
    <li><code>document.getElementsByClassName("class")</code></li>
    <li><code>document.getElementsByTagName("tag")</code></li>
    <li><code>document.querySelector("selector")</code></li>
    <li><code>document.querySelectorAll("selector")</code></li>
  </ul>

  <h3>Modifying Elements</h3>
  <pre>
    <code>
const heading = document.getElementById("main-title");
heading.textContent = "Updated Title";
heading.style.color = "blue";
    </code>
  </pre>

  <h3>Creating and Removing Elements</h3>
  <pre>
    <code>
const newElement = document.createElement("p");
newElement.textContent = "This is new!";
document.body.appendChild(newElement);

const oldElement = document.getElementById("old");
oldElement.remove();
    </code>
  </pre>

  <h3>Changing Attributes</h3>
  <pre>
    <code>
let link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.getAttribute("href");
link.removeAttribute("target");
    </code>
  </pre>

  <h3>Class Manipulation</h3>
  <pre>
    <code>
element.classList.add("highlight");
element.classList.remove("hidden");
element.classList.toggle("active");
    </code>
  </pre>

  <h3>Best Practices</h3>
  <ul>
    <li>Minimize direct DOM manipulation — use libraries like React for efficiency.</li>
    <li>Cache DOM selectors for better performance.</li>
    <li>Manipulate elements after DOM content has loaded.</li>
  </ul>
</section>



<section id="events">
  <h2>JavaScript Events</h2>
  <p>
    Events are actions that happen in the browser — like clicks, key presses, mouse movements, and more. JavaScript lets you respond to these events using event listeners.
  </p>

  <h3>Common Event Types</h3>
  <ul>
    <li><code>click</code> – Mouse click</li>
    <li><code>mouseover</code>, <code>mouseout</code> – Hover in/out</li>
    <li><code>keydown</code>, <code>keyup</code> – Keyboard input</li>
    <li><code>submit</code> – Form submission</li>
    <li><code>change</code> – Input changes (e.g., checkbox)</li>
    <li><code>load</code>, <code>DOMContentLoaded</code> – Page and content loaded</li>
  </ul>

  <>
  <h3>Adding Event Listeners</h3>
  <pre>
    <code>{`
document.getElementById("btn").addEventListener("click", function() {
  alert("Button clicked!");
});
    `}</code>
  </pre>

  <h3>Removing Event Listeners</h3>
  <pre>
    <code>{`
const handler = () => alert("Hi!");
const btn = document.getElementById("btn");

btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);
    `}</code>
  </pre>

  <h3>Event Object</h3>
  <pre>
    <code>{`
document.addEventListener("keydown", function(event) {
  console.log("Key pressed:", event.key);
});
    `}</code>
  </pre>
</>

  <h3>Event Propagation</h3>
  <ul>
    <li><strong>Capturing phase</strong>: Event travels from root to the target</li>
    <li><strong>Bubbling phase</strong>: Event bubbles from the target to root</li>
    <li>Use <code>event.stopPropagation()</code> to prevent bubbling</li>
  </ul>

  <h3>Inline vs External Handlers</h3>
  <ul>
    <li>Inline: <code>&lt;button onclick="sayHi()"&gt;</code></li>
    <li>External: Preferred for cleaner separation of concerns</li>
  </ul>
</section>


<section id="es6">
  <h2>ES6 and Modern JavaScript Features</h2>
  <p>
    ES6, officially known as ECMAScript 2015, introduced major improvements to JavaScript. It made the language more powerful, readable, and easier to write and maintain. Over the years, new features have been added in ES7, ES8, ES9, and beyond, further enhancing JavaScript’s capabilities.
  </p>

  <h3>Let and Const</h3>
  <p>
    ES6 introduced <code>let</code> and <code>const</code> as replacements for <code>var</code>:
  </p>
  <ul>
    <li><code>let</code>: block-scoped and can be reassigned.</li>
    <li><code>const</code>: block-scoped and cannot be reassigned (must be initialized).</li>
  </ul>

  <>
  <h3>Arrow Functions</h3>
  <pre>
    <code>{`
const greet = name => "Hello " + name;
const add = (a, b) => a + b;
    `}</code>
  </pre>
  <p>Arrow functions provide a shorter syntax and do not bind their own <code>this</code>.</p>

  <h3>Template Literals</h3>
  <p>Multi-line strings and embedded expressions using backticks:</p>
  <pre>
    <code>{`
const name = "Alice";
console.log(\`Hello, \${name}!\`);
    `}</code>
  </pre>

  <h3>Destructuring</h3>
  <p>Extract values from arrays or properties from objects into variables:</p>
  <pre>
    <code>{`
const [a, b] = [1, 2];
const {name, age} = {name: "Bob", age: 30};
    `}</code>
  </pre>

  <h3>Spread and Rest Operators</h3>
  <p>Spread <code>(...)</code> expands, while rest collects remaining elements:</p>
  <pre>
    <code>{`
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
    `}</code>
  </pre>

  <h3>Default Parameters</h3>
  <p>Functions can have default values for parameters:</p>
  <pre>
    <code>{`
function multiply(a, b = 1) {
  return a * b;
}
    `}</code>
  </pre>

  <h3>Enhanced Object Literals</h3>
  <pre>
    <code>{`
let age = 25;
const person = {
  name: "John",
  age,
  greet() {
    return "Hi!";
  }
};
    `}</code>
  </pre>

  <h3>Classes</h3>
  <p>Syntactic sugar over prototype-based inheritance:</p>
  <pre>
    <code>{`
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(\`\${this.name} makes a noise.\`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(\`\${this.name} barks.\`);
  }
}
    `}</code>
  </pre>

  <h3>Promises</h3>
  <p>For handling asynchronous operations:</p>
  <pre>
    <code>{`
let fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data loaded"), 1000);
  });
};

fetchData().then(data => console.log(data));
    `}</code>
  </pre>

  <h3>Async/Await</h3>
  <p>A cleaner way to work with Promises:</p>
  <pre>
    <code>{`
async function getData() {
  const result = await fetchData();
  console.log(result);
}
getData();
    `}</code>
  </pre>
</>


<>
  <h3>Modules</h3>
  <p>JavaScript modules allow code to be split across files:</p>
  <pre>
    <code>{`
// export.js
export const PI = 3.14;

// import.js
import { PI } from "./export.js";
    `}</code>
  </pre>

  <h3>Optional Chaining and Nullish Coalescing (ES2020)</h3>
  <pre>
    <code>{`
const user = {};
console.log(user?.address?.city);  // undefined

const score = 0;
console.log(score ?? 100);         // 0
    `}</code>
  </pre>
</>


  <h3>Other Notable Features</h3>
  <ul>
    <li><code>Map</code> and <code>Set</code> collections</li>
    <li><code>Symbol</code> – Unique identifiers</li>
    <li><code>BigInt</code> – Large integers beyond <code>Number.MAX_SAFE_INTEGER</code></li>
    <li><code>Array.prototype.includes()</code></li>
    <li>Dynamic <code>import()</code> (for lazy-loading modules)</li>
  </ul>

  <p>
    ES6 and beyond have made JavaScript a much more capable and developer-friendly language. Learning these modern features is essential for writing cleaner, more efficient code.
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

export default JavaScriptTutorial;
