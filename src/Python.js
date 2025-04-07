import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const PythonTutorial = () => {
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
          <h2>Python Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Installation & Setup</a></li>
            <li><a href="#syntax">Syntax & Variables</a></li>
            <li><a href="#datatypes">Data Types</a></li>
            <li><a href="#control">Control Flow</a></li>
            <li><a href="#functions">Functions</a></li>
            <li><a href="#loops">Loops</a></li>
            <li><a href="#strings">Strings</a></li>
            <li><a href="#lists">Lists & Tuples</a></li>
            <li><a href="#dicts">Dictionaries</a></li>
            <li><a href="#file">File Handling</a></li>
            <li><a href="#exceptions">Exception Handling</a></li>
            <li><a href="#oop">OOP</a></li>
            <li><a href="#modules">Modules & Packages</a></li>
            <li><a href="#libraries">Standard Libraries</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
            <h2>Introduction to Python</h2>
            <p>
              Python is an interpreted, high-level, general-purpose programming language known for its simplicity and readability. It was created by Guido van Rossum and first released in 1991. Python’s clean and easy-to-understand syntax has made it one of the most popular programming languages globally. The language’s simplicity is a key reason why it is the first choice for beginners in programming, yet it remains powerful enough to tackle complex software engineering tasks.
            </p>
            <p>
              Over the years, Python has evolved into a versatile language used in web development, data science, automation, artificial intelligence (AI), scientific computing, and more. It is object-oriented, meaning that Python encourages the use of classes and objects to model real-world data, making the code easy to maintain and extend.
            </p>
            <p>
              In this tutorial, we will cover a range of topics to help you get started with Python, from basic syntax and data types to advanced concepts like object-oriented programming (OOP) and exception handling. The tutorial is designed for beginners and intermediate developers, with hands-on examples to solidify each concept. By the end of this tutorial, you will be proficient in Python and ready to build your own projects.
            </p>
            <h3>Key Features of Python</h3>
            <ul>
              <li><strong>Simple and Easy to Learn:</strong> Python’s syntax is simple and resembles English, making it easier for beginners to learn.</li>
              <li><strong>Open Source:</strong> Python is free to use, and its source code is open for contributions from developers around the world.</li>
              <li><strong>Extensive Libraries:</strong> Python has a vast library ecosystem that covers almost every area of software development, from web frameworks (Flask, Django) to machine learning libraries (TensorFlow, scikit-learn).</li>
              <li><strong>Cross-Platform:</strong> Python can run on multiple platforms such as Windows, macOS, Linux, and even mobile devices.</li>
              <li><strong>Object-Oriented:</strong> Python supports object-oriented programming, allowing developers to write code in a more structured and reusable way.</li>
              <li><strong>Dynamic Typing:</strong> Python uses dynamic typing, meaning that the type of a variable is determined at runtime, which makes it more flexible and easier to work with.</li>
            </ul>
            <p>Let’s dive into setting up Python on your machine to start programming!</p>
          </section>

          <section id="setup">
            <h2>Installation & Setup</h2>
            <p>
              To get started with Python, the first step is installing it on your machine. Python is available for all major operating systems, including Windows, macOS, and Linux. Here’s a step-by-step guide on how to install Python and set up a development environment.
            </p>

            <h3>Windows Installation</h3>
            <ol>
              <li>Visit the official Python website: <a href="https://python.org" target="_blank">https://python.org</a></li>
              <li>Click on the "Downloads" section and choose the latest version for Windows.</li>
              <li>Run the installer, and make sure to check the box that says "Add Python to PATH" before clicking "Install Now".</li>
              <li>After installation, open the command prompt and type <code>python --version</code> to confirm that Python is correctly installed.</li>
            </ol>

            <h3>macOS Installation</h3>
            <ol>
              <li>macOS usually comes with Python pre-installed. To check if it’s installed, open the Terminal and type <code>python3 --version</code>.</li>
              <li>If Python is not installed, you can download the latest version from <a href="https://python.org" target="_blank">Python’s official website</a>.</li>
              <li>To install Python using Homebrew (a popular package manager for macOS), run the following command in the terminal: <code>brew install python3</code>.</li>
            </ol>

            <h3>Linux Installation</h3>
            <ol>
              <li>Open the terminal and type the following command to install Python 3: <code>sudo apt-get install python3</code></li>
              <li>To check if Python is installed, type <code>python3 --version</code>.</li>
            </ol>

            <p>
              After installation, make sure you also install `pip`, Python’s package installer. You can install `pip` using the following command:
            </p>
            <pre>{`sudo apt-get install python3-pip`}</pre>
            <p>Once you have Python and pip installed, you are ready to start coding in Python!</p>
          </section>

          <section id="syntax">
            <h2>Syntax & Variables</h2>
            <p>
              Python’s syntax is easy to read and write, which is one of the key reasons why it’s such a popular language. Python code is written using indentation rather than braces (`{}`). This forces developers to write clean, readable code. Let's go over some basic syntax rules and how to work with variables in Python.
            </p>

            <h3>Basic Syntax</h3>
            <p>In Python, a line of code represents a statement. Each statement performs a specific task, like creating variables, performing calculations, or calling functions.</p>
            <pre>{`x = 5
y = 10
z = x + y
print(z)`}</pre>
            <p>Python uses indentation to define code blocks. This makes Python code look neat and easily readable. Each block of code must be indented consistently, typically with four spaces. An example of an indented code block is shown in the next section.</p>

            <h3>Variables in Python</h3>
            <p>Variables in Python are dynamically typed, meaning that you don’t need to declare their type explicitly. Python determines the type of the variable based on the assigned value.</p>
            <pre>{`name = "Alice"  # String
age = 30          # Integer
height = 5.5      # Float`}</pre>
            <p>In the above example, Python assigns the appropriate data type to each variable based on the value provided. Python will automatically infer the type of the variable (string, integer, or float) when you assign a value.</p>

            <h3>Variable Naming</h3>
            <p>Python follows some basic rules for naming variables:</p>
            <ul>
              <li>Variable names must start with a letter or an underscore (_).</li>
              <li>Variable names can contain letters, numbers, and underscores.</li>
              <li>Variable names are case-sensitive, meaning `myVariable`, `MyVariable`, and `MYVARIABLE` are considered different variables.</li>
            </ul>

            <p>Python also has some reserved keywords that cannot be used as variable names, such as `if`, `else`, `while`, `class`, and `def`.</p>
          </section>

          <section id="control">
            <h2>Control Flow</h2>
            <p>
              Control flow is one of the core features of any programming language, allowing a program to make decisions and repeat actions. In Python, the most common control flow statements are `if`, `elif`, and `else`, as well as the `for` and `while` loops.
            </p>
            <p>
              The `if` statement evaluates a condition and, if it's true, executes a block of code. You can also add `elif` (short for "else if") and `else` clauses for more complex decision-making. Here’s an example:
            </p>
            <pre>{`age = 18
if age >= 18:
    print("Adult")
elif age < 18:
    print("Minor")
else:
    print("Invalid age")`}</pre>
            <p>
              Python uses indentation to define blocks of code inside conditional statements. It’s important to maintain consistent indentation throughout your code. If you have nested `if` conditions, the indentation will show which block of code belongs to which condition.
            </p>
            <h3>Logical Operators</h3>
            <p>Logical operators in Python are used to combine conditional statements. The most common logical operators are:</p>
            <ul>
              <li><strong>and:</strong> Returns `True` if both conditions are true.</li>
              <li><strong>or:</strong> Returns `True` if at least one condition is true.</li>
              <li><strong>not:</strong> Reverses the result, returns `True` if the condition is false.</li>
            </ul>
            <p>
              Here’s an example of using logical operators:
            </p>
            <pre>{`age = 20
is_student = False

if age > 18 and not is_student:
    print("Adult, not a student")`}</pre>
            <h3>Loops in Python</h3>
            <p>
              Loops are a fundamental concept in programming that allow you to repeat a block of code multiple times. Python supports two types of loops: `for` loops and `while` loops.
            </p>
            <h4>For Loops</h4>
            <p>
              A `for` loop iterates over a sequence (like a list, tuple, or range) and executes a block of code for each item in the sequence. Here’s an example:
            </p>
            <pre>{`for i in range(5):
    print(i)`}</pre>
            <p>The `range(5)` function generates numbers from 0 to 4. This is commonly used to iterate through a set number of times.</p>
            <h4>While Loops</h4>
            <p>
              A `while` loop repeatedly executes a block of code as long as a specified condition is true. Here’s an example:
            </p>
            <pre>{`count = 0
while count < 5:
    print(count)
    count += 1`}</pre>
            <p>The <code>while</code> loop keeps running until the condition <code>count &lt; 5</code> becomes false. It's important to ensure that the condition eventually becomes false; otherwise, you'll have an infinite loop.</p>
            </section>

          {/* Functions Section */}
          <section id="functions">
            <h2>Functions</h2>
            <p>
              Functions are essential in Python as they allow you to write reusable code. Functions can accept parameters (inputs) and return values. Python defines functions using the `def` keyword.
            </p>
            <pre>{`def greet(name):
    return f"Hello, {name}"`}</pre>
            <p>
              You can call the function by passing the appropriate arguments:
            </p>
            <pre>{`greeting = greet("Alice")
print(greeting)`}</pre>
            <h3>Function Parameters and Return Values</h3>
            <p>Functions in Python can have parameters, which allow you to pass data into the function. Functions can also return a value using the `return` keyword.</p>
            <p>
              Functions can have default arguments. For example:
            </p>
            <pre>{`def greet(name="Guest"):
    return f"Hello, {name}"`}</pre>
            <p>If no value is provided for `name`, the default value `"Guest"` will be used.</p>
            <h3>Variable-Length Arguments</h3>
            <p>
              You can define functions that accept a variable number of arguments. Python provides `*args` and `**kwargs` for this purpose:
            </p>
            <pre>{`def greet(*args):
    for name in args:
        print(f"Hello, {name}")`}</pre>
            <p>This allows the function to accept any number of positional arguments.</p>
          </section>

          {/* Loops Section */}
          <section id="loops">
            <h2>Loops</h2>
            <p>
              Loops are used to repeat a block of code multiple times. In Python, we have `for` loops and `while` loops to achieve this. Both types of loops are extremely useful in cases where you need to iterate over data or repeat a task a specific number of times.
            </p>
            <h3>For Loops</h3>
            <p>
              `for` loops are the most commonly used loop in Python. They allow you to iterate over sequences like lists, strings, and tuples. The basic syntax for a `for` loop is as follows:
            </p>
            <pre>{`for element in sequence:
    # do something`}</pre>
            <p>For example, to iterate over a list of numbers:</p>
            <pre>{`numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)`}</pre>
            <p>
              Python’s `for` loop can also be used with the `range()` function to generate a sequence of numbers:
            </p>
            <pre>{`for i in range(3):
    print(i)`}</pre>
            <p>This prints numbers from 0 to 2.</p>
            <h3>While Loops</h3>
            <p>
              A `while` loop repeatedly executes a block of code as long as the condition evaluates to true. Here’s an example:
            </p>
            <pre>{`count = 0
while count < 5:
    print(count)
    count += 1`}</pre>
            <p>This will print the numbers from 0 to 4.</p>
          </section>

          {/* Strings Section */}
          <section id="strings">
            <h2>Strings</h2>
            <p>
              Strings in Python are sequences of characters and are one of the most frequently used data types. Python provides a rich set of methods to manipulate strings, including methods for slicing, concatenation, and formatting.
            </p>
            <pre>{`text = "Python"
print(text.upper())  # PYTHON
print(text.lower())  # python
print(text[0])  # P`}</pre>
            <p>Strings can be concatenated using the `+` operator:</p>
            <pre>{`greeting = "Hello, " + "World!"
print(greeting)`}</pre>
            <p>Strings are immutable in Python, which means that once a string is created, it cannot be changed. Any operation on a string will return a new string, leaving the original string intact.</p>
            <h3>String Formatting</h3>
            <p>String formatting allows you to embed variables inside strings, making it easier to construct dynamic text.</p>
            <pre>{`name = "Alice"
age = 25
print(f"Hello, my name is {name} and I am {age} years old.")`}</pre>
            <p>The above code uses an f-string, a simple and efficient way to embed variables inside strings. This feature is available in Python 3.6 and later.</p>
          </section>

          <section id="lists">
            <h2>Lists & Tuples</h2>
            <pre>{`nums = [1, 2, 3]
tuple1 = ("a", "b")`}</pre>
          </section>

          <section id="dicts">
            <h2>Dictionaries</h2>
            <p>
              In Python, dictionaries are a built-in data type used to store key-value pairs. Dictionaries are unordered collections, which means that the items do not have a fixed order. They are used for fast lookups based on unique keys.
            </p>
            <p>
              A dictionary is created using curly braces `{}` with key-value pairs separated by colons (`:`). For example:
            </p>
            <pre>{`user = {"name": "Alice", "age": 30}`}</pre>
            <p>In this example, `"name"` and `"age"` are the keys, and `"Alice"` and `30` are the corresponding values.</p>

            <h3>Accessing Dictionary Elements</h3>
            <p>
              To access a value in a dictionary, you can use the key in square brackets:
            </p>
            <pre>{`print(user["name"])  # Output: Alice`}</pre>
            <p>Alternatively, you can use the `get()` method to retrieve a value safely (it returns `None` if the key doesn’t exist instead of throwing an error):</p>
            <pre>{`print(user.get("name"))  # Output: Alice`}</pre>
            <h3>Adding and Modifying Elements</h3>
            <p>
              You can add new key-value pairs or modify existing ones by assigning a value to the key:
            </p>
            <pre>{`user["email"] = "alice@example.com"`}</pre>
            <p>This adds the `"email"` key to the `user` dictionary with the value `"alice@example.com".</p>
            <h3>Removing Elements</h3>
            <p>To remove an element from a dictionary, you can use the `del` keyword:</p>
            <pre>{`del user["age"]`}</pre>
            <p>Alternatively, you can use the `pop()` method, which also returns the value of the removed item:</p>
            <pre>{`removed_value = user.pop("name")  # Output: Alice`}</pre>
            <h3>Dictionary Methods</h3>
            <p>Python dictionaries have several useful methods:</p>
            <ul>
              <li><strong>keys():</strong> Returns a list of all the keys in the dictionary.</li>
              <li><strong>values():</strong> Returns a list of all the values in the dictionary.</li>
              <li><strong>items():</strong> Returns a list of key-value pairs in the dictionary.</li>
              <li><strong>clear():</strong> Removes all items from the dictionary.</li>
            </ul>
            <pre>{`print(user.keys())  # Output: dict_keys(['name', 'email'])
print(user.items())  # Output: dict_items([('name', 'Alice'), ('email', 'alice@example.com')])`}</pre>
          </section>

          {/* File Handling Section */}
          <section id="file">
            <h2>File Handling</h2>
            <p>
              Python provides built-in functions to work with files. You can open, read, write, and close files easily with Python's file handling methods.
            </p>
            <h3>Opening a File</h3>
            <p>To open a file, use the built-in `open()` function. It takes two arguments: the file path and the mode (e.g., reading or writing).</p>
            <pre>{`file = open("example.txt", "r")`}</pre>
            <p>The mode can be one of the following:
              <ul>
                <li><strong>"r":</strong> Read mode (default, file must exist).</li>
                <li><strong>"w":</strong> Write mode (creates a new file or overwrites an existing file).</li>
                <li><strong>"a":</strong> Append mode (adds to the end of the file).</li>
                <li><strong>"rb":</strong> Read in binary mode (for non-text files).</li>
                <li><strong>"wb":</strong> Write in binary mode.</li>
              </ul>
            </p>
            <h3>Reading from a File</h3>
            <p>Once a file is opened, you can read its contents using the `read()`, `readline()`, or `readlines()` methods.</p>
            <pre>{`with open("example.txt", "r") as file:
    content = file.read()
    print(content)`}</pre>
            <p>The `with` statement ensures that the file is automatically closed after the block is executed.</p>
            <h3>Writing to a File</h3>
            <p>To write data to a file, open the file in write (`"w"`) or append (`"a"`) mode:</p>
            <pre>{`with open("output.txt", "w") as file:
    file.write("Hello, World!")`}</pre>
            <h3>Closing a File</h3>
            <p>Always close a file after finishing the operations:</p>
            <pre>{`file.close()`}</pre>
          </section>

          {/* Exception Handling Section */}
          <section id="exceptions">
            <h2>Exception Handling</h2>
            <p>
              Exceptions are errors that occur during the execution of a program. In Python, you can handle these errors using `try`, `except`, `else`, and `finally` blocks.
            </p>
            <h3>Basic Syntax</h3>
            <p>The basic syntax of exception handling involves using the `try` block to test code for errors and the `except` block to handle the errors:</p>
            <pre>{`try:
    x = 10 / 0
except ZeroDivisionError:
    print("You can't divide by zero!")`}</pre>
            <p>In this case, dividing by zero would raise a `ZeroDivisionError`, and the `except` block will handle it gracefully, preventing the program from crashing.</p>
            <h3>Handling Multiple Exceptions</h3>
            <p>You can handle multiple exceptions by using multiple `except` blocks:</p>
            <pre>{`try:
    x = int(input("Enter a number: "))
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("You can't divide by zero!")`}</pre>
            <h3>Else and Finally</h3>
            <p>If no exception occurs, the `else` block will run. The `finally` block is always executed, regardless of whether an exception occurred or not:</p>
            <pre>{`try:
    x = int(input("Enter a number: "))
except ValueError:
    print("Invalid input.")
else:
    print("Valid input.")
finally:
    print("This will always run.")`}</pre>
          </section>

          {/* Object-Oriented Programming Section */}
          <section id="oop">
            <h2>Object-Oriented Programming (OOP)</h2>
            <p>
              Python is an object-oriented programming language, which means that it supports the creation and use of objects. Object-oriented programming is a paradigm that models real-world entities using classes and objects.
            </p>
            <h3>Classes and Objects</h3>
            <p>In Python, you can define classes to create your own objects. A class is a blueprint for creating objects, and an object is an instance of a class.</p>
            <pre>{`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")

p1 = Person("Alice", 25)
p1.greet()`}</pre>
            <p>The `__init__` method is a special method called a constructor, which is used to initialize the object's attributes. In the example above, the `Person` class has two attributes, `name` and `age`, and one method, `greet`, which prints a greeting message.</p>
            <h3>Inheritance</h3>
            <p>Inheritance allows you to create a new class that is a modified version of an existing class. The new class inherits attributes and methods from the parent class.</p>
            <pre>{`class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
    
    def greet(self):
        print(f"Hello, I am a student with ID {self.student_id}. My name is {self.name}.")

s1 = Student("Bob", 20, "S123")
s1.greet()`}</pre>
            <p>In this case, the `Student` class inherits from the `Person` class but adds a new attribute, `student_id`, and overrides the `greet` method.</p>
          </section>

          {/* Modules and Packages Section */}
          <section id="modules">
            <h2>Modules and Packages</h2>
            <p>
              Python allows you to organize code into reusable modules and packages. A module is a file containing Python definitions and statements, while a package is a collection of modules.
            </p>
            <h3>Creating and Using Modules</h3>
            <p>To create a module, simply write a Python file with functions, classes, or variables. You can then import and use the module in other Python files.</p>
            <pre>{`# mymodule.py
def greet():
    print("Hello from my module!")

# main.py
import mymodule
mymodule.greet()`}</pre>
            <h3>Packages</h3>
            <p>Packages are directories containing multiple Python modules. A package must contain an `__init__.py` file to be recognized as a package.</p>
            <pre>{`# package/
# ├── __init__.py
# ├── module1.py
# ├── module2.py`}</pre>
            <p>You can import individual modules from a package:</p>
            <pre>{`from package.module1 import greet`}</pre>
          </section>

          

          
          <section id="libraries">
            <h2>Standard Libraries</h2>
            <p>
              Python comes with a rich set of libraries and modules that extend its capabilities. These libraries are bundled with Python, so you don’t have to install them separately.
            </p>
            <h3>Commonly Used Standard Libraries</h3>
            <p>
              The following are some of the most commonly used libraries in Python for various tasks:
            </p>
            <ul>
              <li><strong>math:</strong> Provides mathematical functions like square roots, trigonometry, and logarithmic calculations.</li>
              <li><strong>datetime:</strong> Used to work with dates and times. It allows you to format, manipulate, and perform arithmetic on date/time objects.</li>
              <li><strong>random:</strong> Used for generating random numbers, shuffling items, and sampling from sequences.</li>
              <li><strong>os:</strong> Provides functions to interact with the operating system, like working with file paths and environment variables.</li>
              <li><strong>sys:</strong> Provides access to system-specific parameters and functions, such as command-line arguments and Python's internal environment.</li>
              <li><strong>json:</strong> Used for working with JSON data. It provides functions for parsing and writing JSON.</li>
            </ul>
            <p>
              These libraries come bundled with Python, and you can use them directly in your programs without installing anything extra. For example:
            </p>
            <pre>{`import math
print(math.sqrt(16))  # Output: 4.0`}</pre>
            <p>In this example, the `math` library is imported, and the `sqrt()` function is used to compute the square root of 16.</p>
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

export default PythonTutorial;
