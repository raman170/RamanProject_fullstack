import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const CppTutorial = () => {
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
          <h2>C++ Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Environment Setup</a></li>
            <li><a href="#syntax">Basic Syntax</a></li>
            <li><a href="#variables">Variables & Data Types</a></li>
            <li><a href="#conditions">Conditionals</a></li>
            <li><a href="#loops">Loops</a></li>
            <li><a href="#functions">Functions</a></li>
            <li><a href="#oops">OOP Concepts</a></li>
            <li><a href="#classes">Classes & Objects</a></li>
            <li><a href="#inheritance">Inheritance</a></li>
            <li><a href="#pointers">Pointers & References</a></li>
            <li><a href="#stl">STL</a></li>
            <li><a href="#fileio">File Handling</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
        <section id="intro">
  <h2>Introduction to C++</h2>
  <p>C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C language. It supports procedural, object-oriented, and generic programming, making it a versatile and powerful language. C++ is widely used in systems programming, game development, high-performance applications, and real-time simulations.</p>

  <h3>Features of C++</h3>
  <ul>
    <li><strong>Object-Oriented:</strong> Supports the four main principles of OOP: encapsulation, inheritance, polymorphism, and abstraction.</li>
    <li><strong>Performance:</strong> C++ is known for its high performance and is used in applications requiring high-performance processing, such as games and simulations.</li>
    <li><strong>Rich Standard Library:</strong> C++ includes a rich set of libraries, including the Standard Template Library (STL), which offers built-in data structures and algorithms.</li>
    <li><strong>Cross-Platform:</strong> C++ code can run on multiple platforms, from embedded systems to large servers.</li>
  </ul>

  <h3>Applications of C++</h3>
  <ul>
    <li><strong>Game Development:</strong> Used in engines like Unreal Engine.</li>
    <li><strong>Operating Systems:</strong> C++ is used in developing operating system kernels and drivers.</li>
    <li><strong>Real-Time Systems:</strong> Applied in real-time systems where performance is critical, such as robotics and aerospace systems.</li>
  </ul>
</section>


<section id="setup">
  <h2>Environment Setup</h2>
  <p>To start programming in C++, you'll need an IDE (Integrated Development Environment) or a simple text editor with a compiler. Here are the steps to set up your development environment:</p>

  <h3>Using an IDE</h3>
  <p>Popular C++ IDEs include:</p>
  <ul>
    <li><strong>Code::Blocks:</strong> A free, open-source IDE for C/C++ development.</li>
    <li><strong>Dev C++:</strong> Another free, lightweight IDE for C/C++ programming.</li>
    <li><strong>Visual Studio:</strong> A robust IDE with support for C++ and other languages, available on Windows.</li>
  </ul>
  <p>Simply download and install one of these IDEs, and you're ready to write and compile C++ code!</p>

  <h3>Using the Command Line (CLI)</h3>
  <p>If you prefer using the command line, you need a C++ compiler. The most commonly used C++ compiler is <strong>GCC/G++</strong>.</p>
  <p>To install GCC/G++:</p>
  <ul>
    <li><strong>Linux:</strong> Run <code>sudo apt install g++</code> on Ubuntu/Debian.</li>
    <li><strong>Windows:</strong> Install MinGW to get the GCC/G++ compiler.</li>
    <li><strong>macOS:</strong> Install Xcode Command Line Tools with <code>xcode-select --install</code>.</li>
  </ul>
  <p>Once installed, you can compile your C++ code by using the <code>g++ filename.cpp -o output</code> command.</p>
</section>


<section id="syntax">
  <h2>Basic Syntax in C++</h2>
  <p>C++ syntax follows a structured set of rules for writing code. A basic C++ program structure includes the <code>main()</code> function, which is the entry point for every C++ program.</p>

  <h3>Structure of a C++ Program</h3>
  <pre>{`#include <iostream>  // Preprocessor directive to include the standard input-output library

using namespace std;  // Allows us to use standard functions like cout without the std:: prefix

int main() {
  cout << "Hello, World!";  // Output statement
  return 0;  // Indicates successful program execution
}`}</pre>
  <p>This program outputs "Hello, World!" to the console. It begins with the <code>main()</code> function, and every C++ program must contain this function.</p>
</section>


          <section id="variables">
  <h2>Variables & Data Types in C++</h2>
  <p>Variables are used to store data in a program. Every variable has a type that determines the size and layout of the variable's data.</p>

  <h3>Common Data Types</h3>
  <ul>
    <li><strong>int:</strong> Stores integer values (whole numbers).</li>
    <li><strong>double:</strong> Stores floating-point numbers (decimals).</li>
    <li><strong>char:</strong> Stores a single character.</li>
    <li><strong>bool:</strong> Stores boolean values (true/false).</li>
  </ul>

  <h3>Declaring and Initializing Variables</h3>
  <pre>{`int age = 20;
double salary = 55000.75;
char grade = 'A';
bool isOpen = true;`}</pre>
  <p>In this example, we declare a variable for age, salary, grade, and a boolean value. Each variable is initialized with a value.</p>
</section>


<section id="conditions">
  <h2>Conditional Statements in C++</h2>
  <p>Conditional statements allow you to execute different blocks of code based on certain conditions. C++ provides several types of conditional statements.</p>

  <h3>if-else Statement</h3>
  <p>The <code>if</code> statement is used to evaluate a condition. If the condition is true, it executes the code inside the <code>if</code> block; otherwise, it executes the code in the <code>else</code> block.</p>
  <pre>{`if (x > 10) {
  cout << "Greater than 10";
} else {
  cout << "10 or less";
}`}</pre>

  <h3>switch Statement</h3>
  <p>The <code>switch</code> statement allows for multi-way branching based on the value of an expression.</p>
  <pre>{`switch(day) {
  case 1:
    cout << "Monday";
    break;
  case 2:
    cout << "Tuesday";
    break;
  default:
    cout << "Invalid day";
}`}</pre>
</section>


<section id="loops">
  <h2>Loops in C++</h2>
  <p>Loops are used to execute a block of code multiple times. C++ supports different types of loops such as <code>for</code>, <code>while</code>, and <code>do-while</code>.</p>

  <h3>for Loop</h3>
  <pre>{`for (int i = 0; i < 5; i++) {
  cout << i << endl;
}`}</pre>
  <p>The <code>for</code> loop is used when you know how many times you want to execute the loop.</p>

  <h3>while Loop</h3>
  <pre>{`while (condition) {
  // code to be executed as long as the condition is true
}`}</pre>
  <p>The <code>while</code> loop continues executing as long as the condition remains true.</p>

  <h3>do-while Loop</h3>
  <pre>{`do {
  // code to execute
} while (condition);`}</pre>
  <p>The <code>do-while</code> loop executes the code at least once before checking the condition.</p>
</section>


<section id="functions">
  <h2>Functions in C++</h2>
  <p>Functions allow you to break down your program into smaller, reusable pieces of code. Functions can return a value or be void (i.e., not return anything).</p>

  <h3>Function Declaration & Definition</h3>
  <pre>{`int sum(int a, int b) {
  return a + b;
}`}</pre>
  <p>This function takes two integer parameters and returns their sum.</p>

  <h3>Calling a Function</h3>
  <pre>{`int result = sum(5, 3);`}</pre>
  <p>The function is called with arguments <code>5</code> and <code>3</code>, and the returned result is stored in the variable <code>result</code>.</p>

  <h3>Function Overloading</h3>
  <p>C++ supports function overloading, which allows multiple functions with the same name but different parameter types.</p>
  <pre>{`int add(int a, int b) {
  return a + b;
}
double add(double a, double b) {
  return a + b;
}`}</pre>
</section>


          <section id="oops">
  <h2>OOP Concepts in C++</h2>
  <p>Object-Oriented Programming (OOP) is a paradigm that allows for structuring programs in a way that models real-world concepts using classes and objects. The main principles of OOP are:</p>
  
  <h3>1. Encapsulation</h3>
  <p>Encapsulation is the bundling of data (attributes) and methods (functions) that operate on the data into a single unit, i.e., a class. It also restricts direct access to some of an object's components, which can prevent unintended interference and misuse.</p>
  <pre>{`class Person {
private:
  string name;
  int age;
public:
  void setName(string n) { name = n; }
  string getName() { return name; }
  void setAge(int a) { age = a; }
  int getAge() { return age; }
};`}</pre>
  
  <h3>2. Abstraction</h3>
  <p>Abstraction involves hiding the complex implementation details and showing only the essential features of the object. In C++, we can achieve abstraction using abstract classes or interfaces.</p>
  <pre>{`class Shape {
public:
  virtual void draw() = 0;  // Pure virtual function
};`}</pre>

  <h3>3. Inheritance</h3>
  <p>Inheritance allows a class to inherit attributes and methods from another class, facilitating code reuse. A derived class can extend the functionality of the base class.</p>
  <pre>{`class Animal {
public:
  void eat() { cout << "Eating"; }
};

class Dog : public Animal {
public:
  void bark() { cout << "Barking"; }
};`}</pre>

  <h3>4. Polymorphism</h3>
  <p>Polymorphism allows for methods to take on many forms. In C++, this is typically achieved through method overloading (same function name, different parameters) and method overriding (redefining a base class method in the derived class).</p>
  <pre>{`class Shape {
public:
  virtual void draw() { cout << "Drawing Shape"; }
};

class Circle : public Shape {
public:
  void draw() override { cout << "Drawing Circle"; }
};`}</pre>
</section>


<section id="classes">
  <h2>Classes & Objects in C++</h2>
  <p>A class is a blueprint for creating objects in C++. It encapsulates data for the object and methods to operate on that data. Objects are instances of a class.</p>

  <h3>Creating a Class</h3>
  <p>Here is a simple class that models a Car. It has a public member variable `brand` and a method `honk()` to simulate the car honking.</p>
  <pre>{`class Car {
public:
  string brand;  // Member variable

  // Member function (method)
  void honk() {
    cout << "Beep! Beep!" << endl;
  }
};`}</pre>

  <h3>Creating an Object</h3>
  <p>To create an object of the class, we use the class name followed by the object name:</p>
  <pre>{`int main() {
  Car myCar;  // Create an object of class Car
  myCar.brand = "Toyota";  // Access member variable
  myCar.honk();  // Call member function
  return 0;
}`}</pre>

  <h3>Accessing Members of a Class</h3>
  <p>We can access the members of a class using the dot operator (.) on an object.</p>
</section>


<section id="inheritance">
  <h2>Inheritance in C++</h2>
  <p>Inheritance is one of the fundamental principles of Object-Oriented Programming (OOP). It allows one class (derived class) to inherit the properties and behaviors (methods) of another class (base class).</p>

  <h3>Basic Inheritance Example</h3>
  <p>In this example, the <code>Car</code> class inherits the properties and methods from the <code>Vehicle</code> class.</p>
  <pre>{`class Vehicle {
public:
  void move() {
    cout << "Moving..." << endl;
  }
};

class Car : public Vehicle {  // Inheritance
public:
  string brand;
  void honk() {
    cout << "Beep! Beep!" << endl;
  }
};`}</pre>

  <h3>Using Inherited Methods</h3>
  <p>When you create an object of the derived class (<code>Car</code>), it can access methods from the base class (<code>Vehicle</code>) directly.</p>
  <pre>{`int main() {
  Car myCar;
  myCar.move();  // Calling inherited method from Vehicle class
  myCar.honk();  // Calling method from Car class
  return 0;
}`}</pre>

  <h3>Access Control: Public, Private, Protected</h3>
  <p>The access specifiers (public, private, protected) control how members of a class can be accessed. A member declared as <code>public</code> is accessible outside the class, whereas <code>private</code> members cannot be accessed outside the class.</p>
</section>


<section id="pointers">
  <h2>Pointers & References in C++</h2>
  <p>Pointers and references are used in C++ to store addresses of variables and allow indirect access to them. They are essential for memory management and efficient manipulation of large data structures.</p>

  <h3>What is a Pointer?</h3>
  <p>A pointer is a variable that stores the memory address of another variable. Here is an example:</p>
  <pre>{`int a = 10;  // Regular variable
int *p = &a;  // Pointer that stores the address of a

cout << "Address of a: " << p << endl;  // Pointer storing the address of a
cout << "Value of a using pointer: " << *p << endl;  // Dereferencing the pointer to get the value of a`}</pre>
  <p>In this example, <code>p</code> is a pointer that stores the address of variable <code>a</code>. The <code>&</code> operator is used to get the address of <code>a</code>, and the <code>*</code> operator is used to dereference the pointer and access the value stored at the address.</p>

  <h3>What is a Reference?</h3>
  <p>A reference is another name (alias) for an existing variable. It is used to refer to a variable without copying its value. Unlike pointers, references must be initialized when declared and cannot be changed to refer to another variable.</p>
  <pre>{`int a = 10;
int &ref = a;  // Reference to a
cout << "Value of a: " << ref << endl;`}</pre>

  <h3>Pointer vs Reference</h3>
  <p>While both pointers and references allow indirect manipulation of variables, pointers can be reassigned to point to different variables, while references cannot be reassigned once set.</p>
</section>


<section id="stl">
  <h2>STL - Standard Template Library</h2>
  <p>The Standard Template Library (STL) is a powerful library in C++ that provides a collection of template classes and functions for common data structures and algorithms. It includes containers like vectors, lists, sets, maps, and algorithms like sort, reverse, etc.</p>

  <h3>STL Containers</h3>
  <p>STL provides several types of containers to store data, including:</p>
  <ul>
    <li><strong>vector:</strong> A dynamic array that can grow and shrink in size.</li>
    <li><strong>list:</strong> A doubly linked list.</li>
    <li><strong>map:</strong> A collection of key-value pairs, implemented as a balanced tree.</li>
  </ul>

  <h3>Using a Vector</h3>
  <pre>{`#include <vector>
using namespace std;

int main() {
  vector<int> v = {1, 2, 3, 4, 5};  // Initializing vector

  // Accessing elements using indexing
  for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
  }
  cout << endl;
  return 0;
}`}</pre>
  <p>In this example, we create a vector of integers and use a loop to print its elements.</p>

  <h3>Sorting and Using Algorithms</h3>
  <p>The STL provides built-in algorithms for common tasks. Here's an example of sorting a vector:</p>
  <pre>{`#include <algorithm>  // For sort()
#include <vector>
using namespace std;

int main() {
  vector<int> v = {5, 1, 4, 2, 3};
  sort(v.begin(), v.end());  // Sorting the vector

  for (int i : v) {
    cout << i << " ";  // Print sorted vector
  }
  cout << endl;
  return 0;
}`}</pre>

  <h3>Other STL Algorithms</h3>
  <ul>
    <li><strong>sort:</strong> Sorts a range of elements.</li>
    <li><strong>reverse:</strong> Reverses the order of elements.</li>
    <li><strong>find:</strong> Finds an element in a range.</li>
  </ul>
</section>


          <section id="fileio">
  <h2>File Handling in C++</h2>
  <p>C++ provides file handling using the <code>fstream</code> library. It allows you to read from and write to files on disk. The three main classes used in file handling are:</p>
  <ul>
    <li><strong>ofstream:</strong> Used for output (writing) to a file.</li>
    <li><strong>ifstream:</strong> Used for input (reading) from a file.</li>
    <li><strong>fstream:</strong> Used for both input and output operations on the same file.</li>
  </ul>

  <h3>Writing to a File</h3>
  <pre>{`#include <fstream>
#include <iostream>
using namespace std;

int main() {
  ofstream fout("example.txt");
  fout << "Hello, C++ File Handling!";
  fout.close();
  return 0;
}`}</pre>

  <h3>Reading from a File</h3>
  <pre>{`#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
  ifstream fin("example.txt");
  string content;
  while (getline(fin, content)) {
    cout << content << endl;
  }
  fin.close();
  return 0;
}`}</pre>

  <h3>Appending to a File</h3>
  <p>You can also append to a file without overwriting its current contents:</p>
  <pre>{`#include <fstream>
#include <iostream>
using namespace std;

int main() {
  ofstream fout("example.txt", ios::app);
  fout << "Appending text to the file!";
  fout.close();
  return 0;
}`}</pre>
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

export default CppTutorial;

