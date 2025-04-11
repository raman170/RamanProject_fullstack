import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";


const NodeTutorial = () => {
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
          <h2>Node.js Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#install">Installation</a></li>
            <li><a href="#modules">Modules</a></li>
            <li><a href="#fs">File System</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#http">HTTP Module</a></li>
            <li><a href="#express">Express.js</a></li>
            <li><a href="#routing">Routing</a></li>
            <li><a href="#middleware">Middleware</a></li>
            <li><a href="#api">REST API</a></li>
            <li><a href="#db">Database Integration</a></li>
            <li><a href="#deploy">Deployment</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
  <h2>Introduction to Node.js</h2>
  <p>Node.js is a powerful JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications and servers, using JavaScript on the server side. Node.js is non-blocking, event-driven, and designed for building real-time applications that require a lot of I/O operations, such as chat applications and online games.</p>

  <h3>Why Node.js?</h3>
  <p>Node.js has several advantages that make it popular among developers:</p>
  <ul>
    <li><strong>JavaScript on the Server-Side:</strong> With Node.js, you can use JavaScript both on the client and server side, enabling full-stack development with a single language.</li>
    <li><strong>Asynchronous and Event-Driven:</strong> Node.js uses an event-driven, non-blocking I/O model, making it lightweight and efficient, perfect for data-intensive real-time applications.</li>
    <li><strong>High Performance:</strong> Node.js is built on the V8 JavaScript engine, which compiles JavaScript directly to machine code for fast execution.</li>
    <li><strong>Large Ecosystem:</strong> Node.js has an extensive ecosystem of libraries and modules, available through npm (Node Package Manager).</li>
  </ul>

  <h3>Common Use Cases for Node.js</h3>
  <ul>
    <li><strong>Real-time Applications:</strong> Node.js excels at real-time applications, such as chat applications, online gaming, and collaborative tools.</li>
    <li><strong>RESTful APIs:</strong> Node.js is commonly used to build APIs, as it is highly scalable and can handle numerous simultaneous requests.</li>
    <li><strong>Single Page Applications (SPA):</strong> Node.js works well with modern front-end technologies like React, Angular, or Vue for building SPAs.</li>
    <li><strong>Microservices Architecture:</strong> Node.js is well-suited for microservices due to its lightweight, modular design.</li>
  </ul>
</section>


<section id="install">
  <h2>Installing Node.js</h2>
  <p>Node.js can be installed on various platforms, including Windows, macOS, and Linux. You can download the installer from the official website or use package managers for installation.</p>

  <h3>Installing on Windows</h3>
  <ul>
    <li>Download the Windows installer from the official <a href="https://nodejs.org/en/">Node.js website</a>.</li>
    <li>Run the installer and follow the instructions to install both Node.js and npm.</li>
  </ul>

  <h3>Installing on macOS</h3>
  <ul>
    <li>On macOS, you can install Node.js using <code>brew</code>, the Homebrew package manager:</li>
    <pre>{`brew install node`}</pre>
  </ul>

  <h3>Installing on Linux</h3>
  <ul>
    <li>For Debian-based systems (Ubuntu, Mint), use the following commands:</li>
    <pre>{`sudo apt update
sudo apt install nodejs npm`}</pre>
    <li>For RedHat-based systems (CentOS, Fedora), use:</li>
    <pre>{`sudo yum install nodejs`}</pre>
  </ul>

  <h3>Verifying the Installation</h3>
  <p>After installation, you can verify that Node.js and npm are installed correctly by checking their versions:</p>
  <pre>{`node -v
npm -v`}</pre>
</section>


<section id="modules">
  <h2>Working with Modules in Node.js</h2>
  <p>Node.js has a rich ecosystem of built-in modules and third-party modules that can be imported and used in your application. Modules are reusable pieces of code that add functionality to your Node.js applications.</p>

  <h3>Built-in Modules</h3>
  <ul>
    <li><strong>fs (File System):</strong> Provides an API to interact with the file system.</li>
    <li><strong>http:</strong> Allows you to create an HTTP server and handle HTTP requests and responses.</li>
    <li><strong>os:</strong> Provides operating system-related utility methods, like getting system memory information.</li>
    <li><strong>path:</strong> Provides utilities for working with file and directory paths.</li>
    <li><strong>events:</strong> Allows you to work with event-driven programming and manage custom events.</li>
  </ul>

  <h3>Creating Your Own Modules</h3>
  <p>Modules are created using the <code>module.exports</code> object to expose functions and variables. Here's an example of a custom module:</p>
  <pre>{`// math.js
module.exports.add = (a, b) => a + b;
module.exports.subtract = (a, b) => a - b;`}</pre>

  <p>To import and use this module in another file, use the <code>require()</code> function:</p>
  <pre>{`const math = require('./math');
console.log(math.add(5, 3)); // Output: 8`}</pre>
</section>


<section id="fs">
  <h2>File System (fs) Module</h2>
  <p>Node.js provides a built-in <code>fs</code> module for interacting with the file system. This module can be used for reading, writing, updating, and deleting files asynchronously or synchronously.</p>

  <h3>Reading Files</h3>
  <pre>{`const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});`}</pre>

  <h3>Writing to Files</h3>
  <pre>{`fs.writeFile('output.txt', 'Hello, Node.js!', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});`}</pre>

  <h3>Appending to Files</h3>
  <pre>{`fs.appendFile('output.txt', '\nAppended text.', (err) => {
  if (err) throw err;
  console.log('Data appended successfully');
});`}</pre>
</section>


<section id="events">
  <h2>Events in Node.js</h2>
  <p>Node.js is built on an event-driven architecture, and it uses the <code>EventEmitter</code> class to handle events and listeners. The <code>EventEmitter</code> class allows you to trigger events and respond to them asynchronously.</p>

  <h3>Creating and Emitting Events</h3>
  <pre>{`const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('message', () => {
  console.log('Message event triggered!');
});
emitter.emit('message');`}</pre>

  <h3>Using Arguments with Events</h3>
  <pre>{`emitter.on('greet', (name) => {
  console.log('Hello, ' + name);
});
emitter.emit('greet', 'John');`}</pre>
</section>


<section id="http">
  <h2>HTTP Module</h2>
  <p>The <code>http</code> module is used to create an HTTP server in Node.js. It allows you to handle HTTP requests and responses and serve content over the web.</p>

  <h3>Creating a Simple HTTP Server</h3>
  <pre>{`const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});`}</pre>
</section>


<section id="express">
  <h2>Using Express.js</h2>
  <p>Express.js is a minimal and flexible web application framework for Node.js that simplifies the creation of web servers. It provides robust routing, middleware support, and much more.</p>

  <h3>Setting Up Express.js</h3>
  <pre>{`const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello, Express!'));
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`}</pre>

  <h3>Routing in Express</h3>
  <pre>{`app.get('/about', (req, res) => res.send('About Page'));
app.post('/submit', (req, res) => res.send('Data received'));`}</pre>
</section>


<section id="routing">
  <h2>Routing in Express.js</h2>
  <p>Routing is how an application responds to client requests. Express provides an easy-to-use API for handling different HTTP requests (GET, POST, PUT, DELETE) and defining what to do with those requests.</p>

  <h3>Basic Routing</h3>
  <p>In Express, routes are defined using methods that correspond to HTTP verbs. The most common ones are <code>get</code>, <code>post</code>, <code>put</code>, and <code>delete</code>. You can define multiple routes for the same URL, each handling a different HTTP method.</p>
  <pre>{`// Handling GET request for "/about" route
app.get('/about', (req, res) => {
  res.send('About Page');
});`}</pre>

  <h3>Route Parameters</h3>
  <p>Express also supports dynamic route parameters, which are useful when you want to handle routes that change based on the input. You can define parameters in the URL and access them in the route handler.</p>
  <pre>{`// Handling dynamic route with a parameter
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send('User ID: ' + userId);
});`}</pre>
  <p>In this example, <code>:id</code> is a route parameter. You can access it through <code>req.params.id</code> in the callback function.</p>

  <h3>Handling Different HTTP Methods</h3>
  <p>Express allows you to handle different HTTP methods for the same route. You can use <code>get</code>, <code>post</code>, <code>put</code>, and <code>delete</code> for various actions on the same resource.</p>
  <pre>{`// Handling POST request to submit data
app.post('/submit', (req, res) => {
  res.send('Data received');
});`}</pre>

  <h3>Route Handlers with Multiple Callback Functions</h3>
  <p>You can define multiple callbacks for a single route. This is helpful when you need to handle different stages of request processing, like validation or logging.</p>
  <pre>{`// Multiple callbacks for a route
app.get('/user/:id', [
  (req, res, next) => {
    console.log('First callback');
    next();
  },
  (req, res) => {
    res.send('User Info');
  }
]);`}</pre>

  <h3>Route Chaining</h3>
  <p>Express allows you to chain multiple methods for the same route. This is useful when you want to handle multiple HTTP methods for a specific resource.</p>
  <pre>{`// Route chaining for handling different HTTP methods
app.route('/contact')
  .get((req, res) => res.send('GET Contact Page'))
  .post((req, res) => res.send('POST Contact Data'));`}</pre>

</section>


<section id="middleware">
  <h2>Middleware in Express.js</h2>
  <p>Middleware functions are functions that have access to the request, response, and the next middleware function in the application’s request-response cycle. These functions can modify the request and response objects, or terminate the request-response cycle.</p>

  <h3>What is Middleware?</h3>
  <p>Middleware is used to perform tasks like logging, authentication, error handling, and more. Express allows you to apply middleware at different levels:</p>
  <ul>
    <li><strong>Global Middleware:</strong> Applied to all routes in the app.</li>
    <li><strong>Route-Specific Middleware:</strong> Applied only to specific routes.</li>
    <li><strong>Built-in Middleware:</strong> Express provides built-in middleware for handling requests like serving static files, parsing request bodies, etc.</li>
  </ul>

  <h3>Basic Middleware Example</h3>
  <p>This is an example of a simple middleware function that logs every request made to the server:</p>
  <pre>{`// Logging middleware
app.use((req, res, next) => {
  console.log('Request received at: ' + new Date());
  next();  // Pass the request to the next middleware or route handler
});`}</pre>

  <h3>Using Built-in Middleware</h3>
  <p>Express provides several built-in middleware functions. For instance, <code>express.json()</code> parses incoming JSON payloads and makes it available in <code>req.body</code>.</p>
  <pre>{`// Parsing JSON data in the request body
app.use(express.json());`}</pre>

  <h3>Applying Middleware to Specific Routes</h3>
  <p>You can also apply middleware to specific routes. This is useful for tasks like authentication or validation on certain paths:</p>
  <pre>{`// Middleware applied only to '/login' route
app.post('/login', (req, res, next) => {
  console.log('Login attempt');
  next();
}, (req, res) => {
  res.send('Login successful');
});`}</pre>

  <h3>Error Handling Middleware</h3>
  <p>Express allows you to define custom error-handling middleware. Error handling middleware must take four arguments: <code>err</code>, <code>req</code>, <code>res</code>, and <code>next</code>. It must be defined after all routes and other middleware.</p>
  <pre>{`// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});`}</pre>

  <h3>Chaining Multiple Middleware Functions</h3>
  <p>Express allows you to chain multiple middleware functions to a single route. This is useful for tasks like validation, logging, authentication, etc.</p>
  <pre>{`// Multiple middleware functions for one route
app.get('/profile', 
  authenticateUser,  // Custom middleware to authenticate the user
  validateProfileData,  // Custom middleware to validate data
  (req, res) => {
    res.send('User profile data');
  }
);`}</pre>

</section>


          <section id="api">
  <h2>Building a REST API with Express</h2>
  <p>Express makes it easy to create RESTful APIs. You can define different routes and methods (GET, POST, PUT, DELETE) to handle HTTP requests and perform CRUD operations on resources.</p>

  <h3>Creating a Simple API</h3>
  <pre>{`app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }]);
});
app.post('/api/users', (req, res) => {
  res.send('User created');
});`}</pre>
</section>


<section id="db">
  <h2>Database Integration</h2>
  <p>Node.js can be integrated with various databases like MongoDB, MySQL, or PostgreSQL using appropriate modules.</p>

  <h3>Using MongoDB with Node.js</h3>
  <pre>{`const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const userSchema = new Schema({ name: String });
const User = mongoose.model('User', userSchema);
User.find((err, users) => { console.log(users); });`}</pre>
</section>


<section id="deploy">
  <h2>Deploying Node.js Applications</h2>
  <p>Node.js applications can be deployed on various platforms like Heroku, AWS, and DigitalOcean. This section explains how to deploy your application on Heroku.</p>

  <h3>Deploying to Heroku</h3>
  <ul>
    <li>Install the Heroku CLI and log in to your Heroku account.</li>
    <li>Initialize a git repository and create a Heroku application:</li>
    <pre>{`git init
heroku create`}</pre>
    <li>Push your application to Heroku:</li>
    <pre>{`git push heroku master`}</pre>
  </ul>

  <h3>Using pm2 for Process Management</h3>
  <pre>{`npm install pm2 -g
pm2 start app.js`}</pre>
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

export default NodeTutorial;
