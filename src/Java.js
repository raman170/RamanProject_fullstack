import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const JavaTutorial = () => {
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
          <h2>Java Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Environment Setup</a></li>
            <li><a href="#syntax">Syntax</a></li>
            <li><a href="#variables">Variables & Types</a></li>
            <li><a href="#control">Control Statements</a></li>
            <li><a href="#loops">Loops</a></li>
            <li><a href="#methods">Methods</a></li>
            <li><a href="#oops">OOP Concepts</a></li>
            <li><a href="#classes">Classes & Objects</a></li>
            <li><a href="#inheritance">Inheritance</a></li>
            <li><a href="#exceptions">Exception Handling</a></li>
            <li><a href="#fileio">File I/O</a></li>
            <li><a href="#collections">Collections Framework</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
  <h2>Introduction to Java</h2>
  <p>Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Initially created by Sun Microsystems in 1995 and now owned by Oracle, Java has been one of the most widely used programming languages for building cross-platform applications.</p>
  
  <h3>Why Learn Java?</h3>
  <ul>
    <li><strong>Cross-platform compatibility:</strong> Java’s "Write once, run anywhere" philosophy allows applications to run on any device with the Java Virtual Machine (JVM).</li>
    <li><strong>Security:</strong> Java provides built-in security features such as bytecode verification, a robust API, and cryptography services.</li>
    <li><strong>Object-oriented:</strong> Java's object-oriented nature enables modular, maintainable, and scalable code that’s easy to manage.</li>
    <li><strong>Large community support:</strong> Java has a large user base and a robust ecosystem, including libraries, frameworks, and resources for learning.</li>
  </ul>
  
  <h3>Applications of Java</h3>
  <ul>
    <li>Web applications (e.g., large-scale enterprise systems)</li>
    <li>Mobile applications (Android development)</li>
    <li>Cloud-based applications</li>
    <li>Big Data and Machine Learning</li>
  </ul>
</section>


<section id="setup">
  <h2>Environment Setup</h2>
  <p>Before starting with Java, you need to install the Java Development Kit (JDK) and set up a suitable Integrated Development Environment (IDE).</p>

  <h3>Step 1: Install Java Development Kit (JDK)</h3>
  <ul>
    <li>Download the latest JDK from <a href="https://www.oracle.com/java/technologies/javase-jdk11-downloads.html">Oracle's official website</a>.</li>
    <li>Alternatively, use an open-source version like OpenJDK.</li>
  </ul>

  <h3>Step 2: Install an IDE</h3>
  <ul>
    <li><strong>Eclipse:</strong> A popular, open-source Java IDE.</li>
    <li><strong>IntelliJ IDEA:</strong> A feature-rich IDE with excellent Java support.</li>
    <li><strong>Visual Studio Code:</strong> A lightweight editor with Java extensions available for installation.</li>
  </ul>

  <h3>Step 3: Verify Installation</h3>
  <p>To verify your installation, open a terminal/command prompt and run the following command:</p>
  <pre>{`java -version`}</pre>
  <p>If Java is installed correctly, it will show the version information. You can also check the JDK with:</p>
  <pre>{`javac -version`}</pre>
</section>


<section id="syntax">
  <h2>Syntax in Java</h2>
  <p>Java syntax is similar to C-based languages. It follows specific rules for writing statements and structures that the Java compiler understands.</p>

  <h3>Basic Program Structure</h3>
  <pre>{`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`}</pre>
  
  <h3>Code Blocks</h3>
  <p>In Java, a class is the blueprint of an application. The <code>main</code> method is the entry point of the program and all code execution starts from there.</p>

  <h3>Key Syntax Rules</h3>
  <ul>
    <li><strong>Statements:</strong> Each statement ends with a semicolon <code>;</code>.</li>
    <li><strong>Class:</strong> Every Java application must have at least one class (usually named <code>Main</code>).</li>
    <li><strong>Method:</strong> Methods are blocks of code that define behavior and are invoked to perform actions.</li>
  </ul>
</section>


<section id="variables">
  <h2>Variables & Data Types</h2>
  <p>In Java, variables hold data values. Java is a statically typed language, meaning the data type of a variable must be declared before it is used.</p>

  <h3>Declaring Variables</h3>
  <pre>{`int age = 25;      // Integer data type
String name = "John";  // String data type
boolean isJavaFun = true;  // Boolean data type
double price = 10.5;  // Floating point number`}</pre>

  <h3>Primitive Data Types</h3>
  <ul>
    <li><strong>int:</strong> Integer numbers, e.g., 1, -45, 100.</li>
    <li><strong>double:</strong> Floating point numbers, e.g., 10.5, -2.7.</li>
    <li><strong>boolean:</strong> Logical values true or false.</li>
    <li><strong>char:</strong> A single character, e.g., 'a', 'b'.</li>
    <li><strong>String:</strong> Sequence of characters.</li>
  </ul>

  <h3>Type Casting</h3>
  <p>Type casting allows you to convert a variable from one type to another:</p>
  <pre>{`int x = 10;
double y = (double) x;  // Casting int to double`}</pre>
</section>


<section id="control">
  <h2>Control Statements</h2>
  <p>Control statements allow you to control the flow of execution. Java provides <code>if</code>, <code>else</code>, <code>switch</code>, <code>for</code>, and <code>while</code> statements.</p>

  <h3>If-Else Statement</h3>
  <pre>{`int age = 20;
if (age >= 18) {
  System.out.println("Adult");
} else {
  System.out.println("Minor");
}`}</pre>

  <h3>Switch Statement</h3>
  <pre>{`int day = 3;
switch(day) {
  case 1:
    System.out.println("Monday");
    break;
  case 2:
    System.out.println("Tuesday");
    break;
  default:
    System.out.println("Invalid day");
}`}</pre>

  <h3>For Loop</h3>
  <pre>{`for (int i = 0; i < 5; i++) {
  System.out.println(i);  // Prints numbers from 0 to 4
}`}</pre>

  <h3>While Loop</h3>
  <pre>{`int x = 0;
while (x < 5) {
  System.out.println(x);  // Prints numbers from 0 to 4
  x++;
}`}</pre>
</section>


<section id="loops">
  <h2>Loops in Java</h2>
  <p>Loops are used to execute a block of code multiple times. Java supports <code>for</code>, <code>while</code>, and <code>do-while</code> loops.</p>

  <h3>For Loop</h3>
  <pre>{`for (int i = 0; i < 10; i++) {
  System.out.println(i);  // Prints numbers from 0 to 9
}`}</pre>

  <h3>While Loop</h3>
  <pre>{`int i = 0;
while (i < 10) {
  System.out.println(i);  // Prints numbers from 0 to 9
  i++;
}`}</pre>

  <h3>Do-While Loop</h3>
  <pre>{`int i = 0;
do {
  System.out.println(i);  // Prints numbers from 0 to 9
  i++;
} while (i < 10);`}</pre>
</section>


<section id="methods">
  <h2>Methods in Java</h2>
  <p>Methods are blocks of code that perform specific tasks. In Java, methods are used to define actions and can be called from other parts of the program.</p>

  <h3>Method Declaration</h3>
  <pre>{`public static int add(int a, int b) {
  return a + b;
}`}</pre>

  <h3>Method Invocation</h3>
  <pre>{`int result = add(5, 3);
System.out.println(result);  // Output: 8`}</pre>

  <h3>Method Overloading</h3>
  <p>Java allows multiple methods to have the same name but different parameters.</p>
  <pre>{`public int add(int a, int b) { return a + b; }
public double add(double a, double b) { return a + b; }`}</pre>
</section>


<section id="oops">
  <h2>OOP Concepts</h2>
  <p>Object-Oriented Programming (OOP) is a programming paradigm that uses "objects" to represent data and methods to operate on that data. Java is a fully object-oriented programming language that supports four main concepts of OOP:</p>
  
  <ul>
    <li><strong>Encapsulation:</strong> Encapsulation refers to the bundling of data (variables) and methods that operate on the data within a single unit, typically a class. It also restricts direct access to some of an object's components, which can prevent unintended modification of data.</li>
    <li><strong>Abstraction:</strong> Abstraction is the concept of hiding the complex implementation details and showing only the essential features of an object. In Java, abstraction can be achieved using abstract classes and interfaces.</li>
    <li><strong>Inheritance:</strong> Inheritance is a mechanism where a new class is derived from an existing class, inheriting its properties and behaviors. This allows for code reuse and establishes a hierarchy.</li>
    <li><strong>Polymorphism:</strong> Polymorphism allows objects of different classes to be treated as objects of a common superclass. The most common use of polymorphism is when a parent class reference is used to refer to a child class object. It also allows for method overriding and method overloading.</li>
  </ul>
</section>


<section id="classes">
  <h2>Classes & Objects</h2>
  <p>In Java, a class is a blueprint for creating objects. It defines a datatype by bundling data and methods that operate on the data. An object is an instance of a class.</p>
  
  <h3>Class Definition</h3>
  <pre>{`class Car {
  String model;
  int year;
  
  // Constructor
  Car(String model, int year) {
    this.model = model;
    this.year = year;
  }

  // Method
  void drive() {
    System.out.println("Driving the " + model);
  }
}`}</pre>

  <h3>Creating Objects</h3>
  <pre>{`Car car1 = new Car("Toyota", 2021);
car1.drive();  // Output: Driving the Toyota`}</pre>
  
  <p>The <code>new</code> keyword is used to create an object from a class. The constructor is used to initialize the object’s state.</p>
</section>


<section id="inheritance">
  <h2>Inheritance in Java</h2>
  <p>Inheritance allows one class (child class) to inherit the fields and methods of another class (parent class). This promotes code reuse and establishes a relationship between the parent and child class.</p>

  <h3>Inheritance Example</h3>
  <pre>{`class Animal {
  void sound() {
    System.out.println("Animal makes a sound");
  }
}

class Dog extends Animal {
  // Overriding the sound method
  void sound() {
    System.out.println("Dog barks");
  }
}

public class Main {
  public static void main(String[] args) {
    Dog d = new Dog();
    d.sound();  // Output: Dog barks
  }
}`}</pre>
  
  <p>The <code>extends</code> keyword is used to inherit from a parent class. In the above example, the <code>Dog</code> class inherits from the <code>Animal</code> class and overrides the <code>sound()</code> method.</p>
</section>

<section id="exceptions">
  <h2>Exception Handling in Java</h2>
  <p>Java provides a powerful mechanism to handle runtime errors, called exceptions. Exceptions are unwanted or unexpected events that can occur during the execution of a program. Java's exception handling mechanism helps to detect and handle exceptions gracefully using try, catch, and finally blocks.</p>

  <h3>Try, Catch, and Finally</h3>
  <pre>{`try {
  int result = 10 / 0;  // ArithmeticException
} catch (ArithmeticException e) {
  System.out.println("Cannot divide by zero");
} finally {
  System.out.println("This will always run");
}`}</pre>
  
  <h3>Common Exceptions</h3>
  <ul>
    <li><strong>ArithmeticException:</strong> Thrown when an exceptional arithmetic condition occurs, such as dividing by zero.</li>
    <li><strong>NullPointerException:</strong> Thrown when an application attempts to use null where an object is required.</li>
    <li><strong>ArrayIndexOutOfBoundsException:</strong> Thrown when accessing an array element out of bounds.</li>
    <li><strong>IOException:</strong> Thrown when there is a failure during reading/writing data.</li>
  </ul>
</section>


<section id="fileio">
  <h2>File Input/Output (I/O) in Java</h2>
  <p>Java provides several classes and methods to work with files and directories. You can read from and write to files using the <code>File</code>, <code>FileReader</code>, and <code>FileWriter</code> classes.</p>

  <h3>Reading from a File</h3>
  <pre>{`import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class ReadFile {
  public static void main(String[] args) {
    try {
      File file = new File("example.txt");
      FileReader reader = new FileReader(file);
      int character;
      while ((character = reader.read()) != -1) {
        System.out.print((char) character);
      }
      reader.close();
    } catch (IOException e) {
      System.out.println("An error occurred.");
    }
  }
}`}</pre>

  <h3>Writing to a File</h3>
  <pre>{`import java.io.FileWriter;
import java.io.IOException;

public class WriteFile {
  public static void main(String[] args) {
    try {
      FileWriter writer = new FileWriter("output.txt");
      writer.write("Hello, Java!");
      writer.close();
    } catch (IOException e) {
      System.out.println("An error occurred.");
    }
  }
}`}</pre>
</section>


<section id="collections">
  <h2>Collections Framework</h2>
  <p>The Collections Framework provides a set of interfaces and classes that allow you to work with groups of objects. Java collections include lists, sets, queues, and maps. These collections are part of the <code>java.util</code> package.</p>

  <h3>List Example</h3>
  <pre>{`import java.util.ArrayList;

public class ListExample {
  public static void main(String[] args) {
    ArrayList<String> fruits = new ArrayList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Cherry");

    System.out.println(fruits);  // Output: [Apple, Banana, Cherry]
  }
}`}</pre>

  <h3>Map Example</h3>
  <pre>{`import java.util.HashMap;

public class MapExample {
  public static void main(String[] args) {
    HashMap<String, String> capitalCities = new HashMap<>();
    capitalCities.put("USA", "Washington D.C.");
    capitalCities.put("India", "New Delhi");
    capitalCities.put("UK", "London");

    System.out.println(capitalCities);  // Output: {USA=Washington D.C., India=New Delhi, UK=London}
  }
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

export default JavaTutorial;
