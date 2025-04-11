import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const PHPTutorial = () => {
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
          <h2>PHP Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Installation & Setup</a></li>
            <li><a href="#syntax">Basic Syntax</a></li>
            <li><a href="#variables">Variables & Data Types</a></li>
            <li><a href="#operators">Operators</a></li>
            <li><a href="#control">Control Structures</a></li>
            <li><a href="#functions">Functions</a></li>
            <li><a href="#arrays">Arrays</a></li>
            <li><a href="#strings">String Handling</a></li>
            <li><a href="#forms">Forms & $_GET/$_POST</a></li>
            <li><a href="#sessions">Sessions & Cookies</a></li>
            <li><a href="#file">File Handling</a></li>
            <li><a href="#mysql">MySQL Integration</a></li>
            <li><a href="#oop">Object-Oriented PHP</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
            <h2>Introduction</h2>
            <p>
              PHP is a popular open-source server-side scripting language especially suited for web development. It can be embedded into HTML and provides powerful features for dynamic page content, session management, and database interaction.
            </p>
            <p>
              Originally created by Rasmus Lerdorf in 1993, PHP has evolved into one of the most widely used languages for web development. Its widespread use in platforms such as WordPress, Facebook, and Wikipedia highlights its power and flexibility.
            </p>
            <h3>Why Learn PHP?</h3>
            <ul>
              <li>It’s widely used for web development and server-side scripting.</li>
              <li>It integrates well with databases like MySQL and PostgreSQL.</li>
              <li>PHP has an active community that provides support, libraries, and frameworks.</li>
              <li>It’s relatively easy to learn, making it an excellent choice for beginners.</li>
            </ul>
          </section>

          <section id="setup">
            <h2>Installation & Setup</h2>
            <p>
              To start using PHP, you will need a local server environment like XAMPP or WAMP for Windows, or MAMP for macOS. These tools provide a simple way to set up a local server with PHP, MySQL, and Apache. Alternatively, you can install PHP directly on your machine.
            </p>
            <h3>Installing via XAMPP</h3>
            <ol>
              <li>Download XAMPP from the official website: <a href="https://www.apachefriends.org/index.html">Apache Friends</a></li>
              <li>Follow the installation instructions for your operating system.</li>
              <li>Once installed, launch XAMPP, and start the Apache and MySQL services.</li>
              <li>Create a new folder in the `htdocs` directory for your PHP projects.</li>
              <li>Create a PHP file (e.g., `index.php`) and add the following code:</li>
            </ol>
            <pre>{`<?php
  echo "Hello, World!";
?>`}</pre>
            <p>Visit `http://localhost/your_folder_name` in your browser to see the output.</p>
            <h3>Installation via Terminal (Linux/macOS)</h3>
            <pre>{`sudo apt update
sudo apt install php libapache2-mod-php`}</pre>
            <p>This installs PHP and the necessary Apache module to run PHP scripts on your server.</p>
          </section>

          <section id="syntax">
            <h2>Basic Syntax</h2>
            <p>
              PHP scripts are embedded within HTML by using PHP tags. These scripts can perform server-side tasks such as data processing, file management, and database querying.
            </p>
            <p>Here’s a basic example of a PHP script embedded in an HTML file:</p>
            <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Tutorial</title>
</head>
<body>
    <h1>Welcome to PHP</h1>
    <?php
        echo "Hello, World!";
    ?>
</body>
</html>`}</pre>
            <p>This code outputs the message "Hello, World!" to the browser when the page is accessed.</p>
            <h3>PHP Tags</h3>
            <p>PHP code is enclosed within the following tags:</p>
            <ul>
              <li><code>&lt;?php ... ?&gt;</code>: Standard PHP tag (used in most cases).</li>
              <li><code>&lt;?= ... ?&gt;</code>: Short echo tag (used to quickly print out values).</li>
            </ul>
          </section>

          <section id="variables">
            <h2>Variables & Data Types</h2>
            <p>
              In PHP, variables are represented by a dollar sign (`$`) followed by the variable name. Variables can hold different data types such as strings, integers, floats, and booleans.
            </p>
            <p>Here are some examples of variable declarations:</p>
            <pre>{`$name = "John";      // string
$age = 25;             // integer
$price = 19.99;        // float
$flag = true;          // boolean`}</pre>
            <h3>Data Types</h3>
            <ul>
              <li><strong>String:</strong> Text data (e.g., `$name = "John";`)</li>
              <li><strong>Integer:</strong> Whole numbers (e.g., `$age = 25;`)</li>
              <li><strong>Float:</strong> Decimal numbers (e.g., `$price = 19.99;`)</li>
              <li><strong>Boolean:</strong> Represents `true` or `false` (e.g., `$flag = true;`)</li>
            </ul>
            <p>You can display variables using the <code>echo</code> or <code>print</code> statements:</p>
            <pre>{`echo $name;   // Output: John
print $age;      // Output: 25`}</pre>
          </section>

          <section id="operators">
            <h2>Operators</h2>
            <p>
              PHP supports several operators for performing arithmetic, assignment, comparison, and logical operations.
            </p>
            <h3>Arithmetic Operators</h3>
            <ul>
              <li><strong>+</strong>: Addition</li>
              <li><strong>-</strong>: Subtraction</li>
              <li><strong>*</strong>: Multiplication</li>
              <li><strong>/</strong>: Division</li>
              <li><strong>%</strong>: Modulus (remainder)</li>
            </ul>
            <pre>{`$x = 10;
$y = 5;
$z = $x + $y;  // $z equals 15`}</pre>
            <h3>Comparison Operators</h3>
            <ul>
              <li><strong>==</strong>: Equal to</li>
              <li><strong>===</strong>: Identical to (checks both value and type)</li>
              <li><strong>!=</strong>: Not equal to</li>
              <li><strong>&lt;</strong>: Less than</li>
              <li><strong>&gt;</strong>: Greater than</li>
            </ul>
            <pre>{`if ($x == $y) {
    echo "Equal";
}`}</pre>
            <h3>Logical Operators</h3>
            <ul>
              <li><strong>&&</strong>: Logical AND</li>
              <li><strong>||</strong>: Logical OR</li>
              <li><strong>!</strong>: Logical NOT</li>
            </ul>
          </section>

          <section id="control">
            <h2>Control Structures</h2>
            <p>
              PHP supports various control structures like conditional statements (`if`, `else`) and loops (`for`, `while`) that help control the flow of your program.
            </p>
            <h3>If-Else Statement</h3>
            <pre>{`if ($age > 18) {
  echo "Adult";
} else {
  echo "Minor";
}`}</pre>
            <p>This checks whether the variable `$age` is greater than 18 and prints a message accordingly.</p>
            <h3>For Loop</h3>
            <pre>{`for ($i = 0; $i < 5; $i++) {
  echo $i;
}`}</pre>
            <p>This loop will print numbers from 0 to 4.</p>
            <h3>While Loop</h3>
            <pre>{`$i = 0;
while ($i < 5) {
  echo $i;
  $i++;
}`}</pre>
            <p>This loop will also print numbers from 0 to 4, but using a `while` condition instead of `for`.</p>
          </section>

          <section id="functions">
            <h2>Functions</h2>
            <p>
              Functions in PHP are defined using the <code>function</code> keyword. They allow you to group code into reusable blocks.
            </p>
            <pre>{`function greet($name) {
  return "Hello, $name";
}

echo greet("Alice");  // Output: Hello, Alice`}</pre>
            <p>The function `greet()` takes a parameter `$name` and returns a greeting message.</p>
          </section>

          <section id="arrays">
            <h2>Arrays</h2>
            <p>
              Arrays are variables that hold multiple values. In PHP, arrays can be indexed or associative.
            </p>
            <h3>Indexed Arrays</h3>
            <pre>{`$fruits = array("Apple", "Banana", "Orange");
echo $fruits[0];  // Output: Apple`}</pre>
            <h3>Associative Arrays</h3>
            <pre>{`$person = array("name" => "John", "age" => 30);
echo $person["name"];  // Output: John`}</pre>
            <h3>Multidimensional Arrays</h3>
            <pre>{`$cars = array(
    array("BMW", 2015),
    array("Audi", 2017),
    array("Tesla", 2020)
);
echo $cars[1][0];  // Output: Audi`}</pre>
          </section>
          <section id="mysql">
            <h2>MySQL Integration</h2>
            <p>
              PHP can be easily integrated with MySQL databases to store and retrieve data. You can interact with a MySQL database using the <code>mysqli</code> extension or the more modern <code>PDO</code> (PHP Data Objects).
            </p>
            <h3>Connecting to MySQL Database</h3>
            <p>To connect to a MySQL database, use the <code>mysqli_connect()</code> function.</p>
            <pre>{`$conn = mysqli_connect("localhost", "root", "", "mydb");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";`}</pre>
            <p>This code connects to a MySQL database named `mydb` on the local server using the `root` username and no password. If the connection fails, it outputs an error message.</p>

            <h3>Executing SQL Queries</h3>
            <p>Once connected, you can execute SQL queries using the <code>mysqli_query()</code> function.</p>
            <pre>{`$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. "<br>";
    }
} else {
    echo "0 results";
}`}</pre>
            <p>This code retrieves all records from the `users` table and prints out the `id` and `name` for each user.</p>

            <h3>Inserting Data into MySQL</h3>
            <p>To insert data into a table, use the <code>INSERT INTO</code> statement with the <code>mysqli_query()</code> function.</p>
            <pre>{`$sql = "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')";
if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}`}</pre>
            <p>This code inserts a new user into the `users` table with the name `Alice` and email `alice@example.com`.</p>

            <h3>Closing the Connection</h3>
            <p>After performing database operations, it’s important to close the connection using the <code>mysqli_close()</code> function.</p>
            <pre>{`mysqli_close($conn);`}</pre>
          </section>

          <section id="oop">
            <h2>Object-Oriented PHP</h2>
            <p>
              PHP supports Object-Oriented Programming (OOP), which helps you organize code into reusable objects. OOP allows you to create classes, define properties and methods, and work with inheritance, polymorphism, and encapsulation.
            </p>
            <h3>Creating Classes and Objects</h3>
            <p>To define a class in PHP, use the <code>class</code> keyword. You can create objects of that class using the <code>new</code> keyword.</p>
            <pre>{`class Car {
    public $color;
    
    function __construct($color) {
        $this->color = $color;
    }

    function displayColor() {
        echo "The car color is " . $this->color;
    }
}

$myCar = new Car("red");
$myCar->displayColor();  // Output: The car color is red`}</pre>
            <p>This defines a `Car` class with a constructor to initialize the car's color and a method to display it.</p>

            <h3>Inheritance</h3>
            <p>Inheritance allows you to create a new class based on an existing class. The child class inherits the properties and methods of the parent class.</p>
            <pre>{`class ElectricCar extends Car {
    public $batteryLife;

    function __construct($color, $batteryLife) {
        parent::__construct($color);
        $this->batteryLife = $batteryLife;
    }

    function displayBatteryLife() {
        echo "The car's battery life is " . $this->batteryLife . " hours.";
    }
}

$myElectricCar = new ElectricCar("blue", 12);
$myElectricCar->displayColor();  // Output: The car color is blue
$myElectricCar->displayBatteryLife();  // Output: The car's battery life is 12 hours.`}</pre>
            <p>The `ElectricCar` class extends the `Car` class, inheriting its properties and methods. It also adds a new property, `batteryLife`, and a new method, `displayBatteryLife()`.</p>

            <h3>Polymorphism</h3>
            <p>Polymorphism allows different classes to have methods with the same name but different implementations. This is useful for creating flexible and reusable code.</p>
            <pre>{`class Dog {
    function speak() {
        echo "Woof! Woof!";
    }
}

class Cat {
    function speak() {
        echo "Meow!";
    }
}

function animalSpeak($animal) {
    $animal->speak();
}

$dog = new Dog();
$cat = new Cat();
animalSpeak($dog);  // Output: Woof! Woof!
animalSpeak($cat);  // Output: Meow!`}</pre>
            <p>This code demonstrates polymorphism by using the same method name, `speak()`, for different classes (`Dog` and `Cat`), each implementing its own behavior.</p>

            <h3>Encapsulation</h3>
            <p>Encapsulation refers to restricting access to some of an object's components, making it impossible for outside code to directly modify them. You can use private and protected visibility to control access to properties and methods.</p>
            <pre>{`class BankAccount {
    private $balance;

    public function __construct($balance) {
        $this->balance = $balance;
    }

    public function deposit($amount) {
        if ($amount > 0) {
            $this->balance += $amount;
        }
    }

    public function getBalance() {
        return $this->balance;
    }
}

$account = new BankAccount(1000);
$account->deposit(500);
echo $account->getBalance();  // Output: 1500`}</pre>
            <p>In this example, the `balance` property is private, and outside code cannot directly modify it. Only the `deposit()` and `getBalance()` methods are available for interacting with the balance.</p>
          </section>

          <section id="quiz">
            <h2>Exercises</h2>
            <ul>
              <li>Write a PHP function to calculate the factorial of a number using recursion.</li>
              <li>Create a class called `Book` with properties for `title`, `author`, and `year`. Add a method to display the book's information.</li>
              <li>Connect to a MySQL database and retrieve all users from the `users` table. Display their names and emails.</li>
              <li>Implement a login system using sessions in PHP. Ensure that users can log in and view their profile after authenticating.</li>
            </ul>
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

export default PHPTutorial;
