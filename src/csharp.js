import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const CSharpTutorial = () => {
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

      \

      <div className="main-layout">
        <aside className="sidebar">
          <h2>C# Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#setup">Environment Setup</a></li>
            <li><a href="#syntax">Syntax</a></li>
            <li><a href="#variables">Variables & Types</a></li>
            <li><a href="#conditions">Conditions</a></li>
            <li><a href="#loops">Loops</a></li>
            <li><a href="#methods">Methods</a></li>
            <li><a href="#classes">Classes & Objects</a></li>
            <li><a href="#inheritance">Inheritance</a></li>
            <li><a href="#interfaces">Interfaces</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#exceptions">Exception Handling</a></li>
            <li><a href="#fileio">File I/O</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
  <h2>Introduction</h2>
  <p>
    C# (pronounced "C-sharp") is a powerful, object-oriented programming language developed by Microsoft as part of its .NET initiative. It was designed by Anders Hejlsberg and first released in the early 2000s. Since its inception, C# has evolved into one of the most widely used programming languages for building modern, scalable, and secure applications. It is used across various platforms, including desktop, web, mobile, and cloud-based applications.

    The language draws heavily from its predecessors such as C, C++, and Java, combining the efficiency of C++ with the simplicity and safety of Java. C# supports strong type-checking, automatic garbage collection, simplified syntax, and a rich set of libraries. It also incorporates modern programming constructs like asynchronous programming, LINQ (Language Integrated Query), pattern matching, and dynamic types.

    C# is typically used with the .NET Framework or .NET Core (now unified under .NET 5 and later versions), which provides a massive class library and runtime environment that simplifies application development. Developers can create applications that run on Windows, Linux, and macOS, as well as iOS and Android through Xamarin or .NET MAUI.

    Over the years, C# has seen numerous enhancements. Newer versions introduced features such as nullable reference types, records, pattern matching, top-level statements, and improved performance through just-in-time (JIT) compilation. Microsoft has committed to making C# open-source, with an active community contributing to its development via the Roslyn compiler.

    One of C#’s defining characteristics is its support for component-oriented programming. This means that C# applications are often built from reusable and encapsulated units called components, which can be independently deployed and versioned.

    C# enables developers to build a variety of application types:
    - Windows desktop applications using Windows Forms and WPF
    - Web applications with ASP.NET Core
    - Mobile applications with Xamarin and .NET MAUI
    - Cloud services with Azure integration
    - Games using Unity engine
    - Microservices, IoT, and machine learning models

    The simplicity of C#’s syntax and the powerful development tools like Visual Studio, Visual Studio Code, and JetBrains Rider make it an ideal choice for both beginners and seasoned developers. It offers the perfect balance between control and productivity.

    Today, C# is taught in universities and used in enterprises worldwide. With its focus on safety, productivity, and modern language features, C# continues to be a top choice for developing maintainable and scalable software systems.

    In this tutorial, we will cover everything you need to know about C# programming — from its syntax and core features to object-oriented programming, error handling, file operations, and building real-world projects. Whether you're a beginner getting started with coding or an experienced programmer transitioning from another language, this guide will provide you with comprehensive insights into the C# ecosystem.

    Get ready to dive deep into C#, learn how to harness its power, and build robust applications that stand the test of time.
  </p>
</section>

          
// Environment Setup
<section id="setup">
  <h2>Environment Setup</h2>
  <p>
    Setting up your development environment is the first step toward becoming productive with C#. Microsoft has provided powerful tools and frameworks that simplify this process significantly. Whether you're building console apps, Windows desktop applications, web APIs, or mobile apps, C# development typically involves the .NET SDK and a code editor or integrated development environment (IDE).

    **1. Installing .NET SDK**
    The .NET SDK (Software Development Kit) includes everything needed to build and run C# applications. It contains the compiler, libraries, runtime, and the `dotnet` CLI tool.

    - Visit the official .NET website: [https://dotnet.microsoft.com/](https://dotnet.microsoft.com/)
    - Download and install the latest version of the .NET SDK (recommended LTS version)
    - Verify installation via terminal or command prompt:
    ```bash
    dotnet --version
    ```

    **2. Choosing a Code Editor or IDE**
    There are several options for writing and debugging C# code:
    - **Visual Studio (Windows/macOS):** Full-featured IDE ideal for professional development
    - **Visual Studio Code (VS Code):** Lightweight, cross-platform editor with C# extensions
    - **JetBrains Rider:** Cross-platform commercial IDE with strong C# and .NET Core support

    For Visual Studio Code:
    - Install from [https://code.visualstudio.com/](https://code.visualstudio.com/)
    - Install the **C# extension** by Microsoft from the Extensions Marketplace

    **3. Using the dotnet CLI**
    The command-line interface allows you to create, build, and run C# projects easily:
    ```bash
    dotnet new console -n HelloWorld
    cd HelloWorld
    dotnet run
    ```

    This creates a new console application, compiles the code, and runs it.
    <p><strong>4. Creating Your First Program</strong></p>
        <pre>{`using System;
class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}`}</pre>
        <p>Save the file as <code>Program.cs</code>, then use <code>dotnet build</code> and <code>dotnet run</code> to compile and execute it.</p>

        <p><strong>5. Project Types in .NET</strong></p>
        <ul>
          <li>Console apps: <code>dotnet new console</code></li>
          <li>Web apps: <code>dotnet new webapp</code></li>
          <li>APIs: <code>dotnet new webapi</code></li>
          <li>Class libraries: <code>dotnet new classlib</code></li>
          <li>Blazor apps: <code>dotnet new blazorserver</code> or <code>blazorwasm</code></li>
        </ul>

        <p><strong>6. Installing Additional Templates</strong></p>
        <p>Use <code>dotnet new --install &lt;template-package&gt;</code> to add custom project templates from NuGet or third-party providers.</p>

    **7. Updating the SDK and Runtime**
    Microsoft frequently releases new versions. You can have multiple versions installed side-by-side. Use:
    ```bash
    dotnet --list-sdks
    dotnet --list-runtimes
    ```

    **8. Working with Solutions**
    Larger projects may use `.sln` (solution) files to manage multiple sub-projects. Use `dotnet sln` commands or Visual Studio to manage them.

    **9. Debugging and Intellisense**
    IDEs like Visual Studio and Rider offer integrated debugging tools. In VS Code, install the C# extension to enable features like breakpoints, variable watches, and IntelliSense.

    **10. Version Control Integration**
    Editors like VS Code and Visual Studio integrate with Git. Create a `.gitignore` for .NET projects using:
    ```bash
    dotnet new gitignore
    ```

    **Conclusion**
    Setting up your environment for C# development is quick and easy. Whether you prefer a lightweight editor or a fully integrated IDE, the tools provided by Microsoft and the community will support all your development needs. With everything in place, you’re now ready to dive into C# programming.
  </p>
</section>

          
// Syntax
<section id="syntax">
  <h2>Syntax</h2>
  <p>
    Understanding C# syntax is essential for writing clean, maintainable, and effective code. The language adopts a clear and expressive style, influenced by C, C++, and Java. Syntax in C# includes how variables are declared, how control structures work, how methods and classes are defined, and more.
          </p>
   <p><strong>1. Declaring a Method</strong></p>
        <pre>{`return_type MethodName(parameters) {
  // method body
}`}</pre>
        <p>Example:</p>
        <pre>{`int Add(int a, int b) {
  return a + b;
}`}</pre>

        <p><strong>2. Calling a Method</strong></p>
        <pre>{`int result = Add(5, 3);
Console.WriteLine(result); // Output: 8`}</pre>

        <p><strong>3. Method Parameters</strong></p>
        <ul>
          <li><strong>Value Parameters:</strong> Default behavior, copies values</li>
          <li><strong>Reference Parameters:</strong> Use <code>ref</code> keyword</li>
          <li><strong>Output Parameters:</strong> Use <code>out</code> keyword to return multiple values</li>
        </ul>
        <pre>{`void Multiply(int a, int b, out int product) {
  product = a * b;
}`}</pre>

        <p><strong>4. Method Overloading</strong></p>
        <pre>{`void Print(string message) {
  Console.WriteLine(message);
}

void Print(int number) {
  Console.WriteLine(number);
}`}</pre>

        <p><strong>5. Optional and Named Parameters</strong></p>
        <pre>{`void Greet(string name = "User") {
  Console.WriteLine($"Hello, {name}!");
}

Greet(); // Hello, User!
Greet("Alice"); // Hello, Alice!`}</pre>

        <p><strong>6. Static Methods</strong></p>
        <pre>{`static void SayHello() {
  Console.WriteLine("Hello from static method");
}

Program.SayHello();`}</pre>

        <p><strong>7. Return Types</strong></p>
        <pre>{`string GetName() {
  return "Alice";
}`}</pre>

        <p><strong>8. Local Functions (C# 7.0+)</strong></p>
        <pre>{`void Outer() {
  void Inner() {
    Console.WriteLine("Inner");
  }
  Inner();
}`}</pre>

        <p><strong>9. Expression-Bodied Methods</strong></p>
        <pre>{`int Square(int x) => x * x;`}</pre>

        <p><strong>10. Best Practices</strong></p>
        <ul>
          <li>Use meaningful method names</li>
          <li>Keep methods short and focused</li>
          <li>Group related functionality</li>
        </ul>

        <p><strong>Conclusion</strong><br />
        Understanding methods is crucial to mastering C#. They are the building blocks of structured programming, helping break down complex problems and enabling code reuse and readability.</p>
      </section>

      <section id="syntax">
        <h2>C# Syntax</h2>

        <p><strong>1. Structure of a Basic Program</strong></p>
        <pre>{`using System;

namespace HelloWorld {
  class Program {
    static void Main(string[] args) {
      Console.WriteLine("Hello, World!");
    }
  }
}`}</pre>
        <ul>
          <li><code>using System;</code> imports the System namespace.</li>
          <li><code>namespace HelloWorld</code> declares a logical container for your code.</li>
          <li><code>class Program</code> defines a class.</li>
          <li><code>static void Main(string[] args)</code> is the entry point of the application.</li>
        </ul>

        <p><strong>2. Code Blocks and Indentation</strong></p>
        <pre>{`if (x > 0) {
  Console.WriteLine("Positive");
}`}</pre>

        <p><strong>3. Statements and Semicolons</strong></p>
        <pre>{`int x = 5;
x += 2;
Console.WriteLine(x);`}</pre>

        <p><strong>4. Comments</strong></p>
        <pre>{`// Single-line comment
/* Multi-line
   comment */
/// XML documentation comment (for methods and classes)`}</pre>

        <p><strong>5. Identifiers and Keywords</strong></p>
        <p>Identifiers are names used for variables, methods, classes, etc. C# is case-sensitive. Keywords like <code>int</code>, <code>class</code>, <code>return</code>, <code>static</code> cannot be used as identifiers.</p>

        <p><strong>6. Data Types and Variables</strong></p>
        <pre>{`int age = 25;
string name = "John";
bool isActive = true;`}</pre>

        <p><strong>7. Expressions and Operators</strong></p>
        <pre>{`int a = 10 + 5;
bool isTrue = (a > 10 && a < 20);`}</pre>

        <p><strong>8. Control Statements</strong></p>
        <pre>{`if (x > 0) {
  Console.WriteLine("Positive");
} else {
  Console.WriteLine("Non-positive");
}

switch (x) {
  case 1:
    Console.WriteLine("One");
    break;
  default:
    Console.WriteLine("Other");
    break;
}`}</pre>

        <p><strong>9. Loops</strong></p>
        <pre>{`for (int i = 0; i < 10; i++) {
  Console.WriteLine(i);
}

while (x < 10) {
  x++;
}`}</pre>

        <p><strong>10. Method Syntax</strong></p>
        <pre>{`public static int Add(int x, int y) {
  return x + y;
}`}</pre>

        <p><strong>Conclusion</strong><br />
        Mastering C# syntax is the foundation for building more advanced features. It ensures your programs are readable, maintainable, and bug-free. Once you understand how C# syntax works, you can confidently explore deeper topics such as object-oriented programming, collections, and LINQ.</p>
      
    **Conclusion**
    <p>
    Loops are an integral part of any programming language, including C#. They help perform repetitive tasks efficiently, manage collections, and automate logic. Understanding the different types of loops and when to use them will greatly enhance your ability to write effective and efficient C# programs.
  </p>
</section>


          
// Methods
<section id="methods">
  <h2>Methods</h2>
  <p>
    Methods in C# are blocks of code that perform a specific task. They allow developers to write modular, reusable, and readable code. A method can accept input parameters, perform operations, and return a value to the caller.
          </p>
   <p><strong>1. Declaring a Method</strong></p>
        <pre>{`return_type MethodName(parameters) {
  // method body
}`}</pre>
        <p>Example:</p>
        <pre>{`int Add(int a, int b) {
  return a + b;
}`}</pre>

        <p><strong>2. Calling a Method</strong></p>
        <pre>{`int result = Add(5, 3);
Console.WriteLine(result); // Output: 8`}</pre>

        <p><strong>3. Method Parameters</strong></p>
        <ul>
          <li><strong>Value Parameters:</strong> Default behavior, copies values</li>
          <li><strong>Reference Parameters:</strong> Use <code>ref</code> keyword</li>
          <li><strong>Output Parameters:</strong> Use <code>out</code> keyword to return multiple values</li>
        </ul>
        <pre>{`void Multiply(int a, int b, out int product) {
  product = a * b;
}`}</pre>

        <p><strong>4. Method Overloading</strong></p>
        <pre>{`void Print(string message) {
  Console.WriteLine(message);
}

void Print(int number) {
  Console.WriteLine(number);
}`}</pre>

        <p><strong>5. Optional and Named Parameters</strong></p>
        <pre>{`void Greet(string name = "User") {
  Console.WriteLine($"Hello, {name}!");
}

Greet(); // Hello, User!
Greet("Alice"); // Hello, Alice!`}</pre>

        <p><strong>6. Static Methods</strong></p>
        <pre>{`static void SayHello() {
  Console.WriteLine("Hello from static method");
}

Program.SayHello();`}</pre>

        <p><strong>7. Return Types</strong></p>
        <pre>{`string GetName() {
  return "Alice";
}`}</pre>

        <p><strong>8. Local Functions (C# 7.0+)</strong></p>
        <pre>{`void Outer() {
  void Inner() {
    Console.WriteLine("Inner");
  }
  Inner();
}`}</pre>

        <p><strong>9. Expression-Bodied Methods</strong></p>
        <pre>{`int Square(int x) => x * x;`}</pre>

        <p><strong>10. Best Practices</strong></p>
        <ul>
          <li>Use meaningful method names</li>
          <li>Keep methods short and focused</li>
          <li>Group related functionality</li>
        </ul>

        <p><strong>Conclusion</strong><br />
        Understanding methods is crucial to mastering C#. They are the building blocks of structured programming, helping break down complex problems and enabling code reuse and readability.</p>
      </section>
    ```

    **Conclusion**
    Mastering classes and objects is essential for developing robust and scalable C# applications. Understanding how to define, instantiate, and use classes allows developers to apply OOP principles effectively.


<section id="inheritance">
  <h2>Inheritance</h2>
  <p>
    Inheritance is one of the fundamental principles of object-oriented programming (OOP) in C#. It allows a class to inherit properties and methods from another class, promoting code reusability and establishing a hierarchical classification.

  <section>
      <h2>Inheritance</h2>

      <p><strong>1. Base and Derived Classes</strong><br />
      The class being inherited from is called the <strong>base class</strong>, and the class that inherits is the <strong>derived class</strong>:
      </p>
      <pre>{`public class Animal {
  public void Eat() {
    Console.WriteLine("Eating...");
  }
}

public class Dog : Animal {
  public void Bark() {
    Console.WriteLine("Barking...");
  }
}`}</pre>

      <p>Usage:</p>
      <pre>{`Dog d = new Dog();
d.Eat(); // inherited from Animal
d.Bark();`}</pre>

      <p><strong>2. Types of Inheritance in C#</strong><br />
      - Single Inheritance: A class inherits from one base class.<br />
      - Multilevel Inheritance: A derived class becomes a base class for another class.<br />
      - Hierarchical Inheritance: Multiple classes inherit from the same base class.<br />
      - Multiple inheritance is not supported through classes but can be achieved through interfaces.
      </p>

      <p><strong>3. protected Access Modifier</strong></p>
      <pre>{`public class Vehicle {
  protected int speed = 60;
}

public class Bike : Vehicle {
  public void DisplaySpeed() {
    Console.WriteLine(speed);
  }
}`}</pre>

      <p><strong>4. Overriding Methods</strong></p>
      <pre>{`public class Animal {
  public virtual void Speak() {
    Console.WriteLine("Generic animal sound");
  }
}

public class Cat : Animal {
  public override void Speak() {
    Console.WriteLine("Meow");
  }
}`}</pre>

      <p><strong>5. base Keyword</strong></p>
      <pre>{`public class Parent {
  public void Show() {
    Console.WriteLine("Parent Show");
  }
}

public class Child : Parent {
  public void ShowBoth() {
    base.Show();
    Console.WriteLine("Child Show");
  }
}`}</pre>

      <p><strong>6. Constructor Inheritance</strong></p>
      <pre>{`public class Person {
  public Person(string name) {
    Console.WriteLine($"Person: {name}");
  }
}

public class Student : Person {
  public Student(string name) : base(name) {}
}`}</pre>

      <p><strong>7. Sealed Classes and Methods</strong></p>
      <pre>{`public sealed class FinalClass {}

public class A {
  public virtual void Show() {}
}

public class B : A {
  public sealed override void Show() {}
}`}</pre>

      <p><strong>8. Abstract Classes</strong></p>
      <pre>{`public abstract class Shape {
  public abstract double Area();
}

public class Circle : Shape {
  public override double Area() => 3.14 * 2 * 2;
}`}</pre>

      <p><strong>9. Polymorphism via Inheritance</strong></p>
      <pre>{`Animal a = new Dog();
a.Eat();`}</pre>

      <p><strong>10. Real-World Example</strong></p>
      <pre>{`public class Employee {
  public virtual void Work() {
    Console.WriteLine("Working on tasks");
  }
}

public class Manager : Employee {
  public override void Work() {
    Console.WriteLine("Managing team");
  }
}`}</pre>

      <h2>Interfaces</h2>

      <p><strong>1. Defining an Interface</strong></p>
      <pre>{`public interface IAnimal {
  void Speak();
}`}</pre>

      <p><strong>2. Implementing an Interface</strong></p>
      <pre>{`public class Dog : IAnimal {
  public void Speak() {
    Console.WriteLine("Woof!");
  }
}`}</pre>

      <p><strong>3. Multiple Interface Implementation</strong></p>
      <pre>{`public interface IRunnable {
  void Run();
}

public class Robot : IAnimal, IRunnable {
  public void Speak() {
    Console.WriteLine("Beep!");
  }

  public void Run() {
    Console.WriteLine("Running...");
  }
}`}</pre>

      <p><strong>4. Interface Inheritance</strong></p>
      <pre>{`public interface IMammal : IAnimal {
  void Walk();
}`}</pre>

      <p><strong>5. Interface vs Abstract Class</strong></p>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Interface</th>
            <th>Abstract Class</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Implementation</td><td>No (only declarations)</td><td>Can have implementation</td></tr>
          <tr><td>Multiple Inheritance</td><td>Yes</td><td>No</td></tr>
          <tr><td>Constructors</td><td>Not allowed</td><td>Allowed</td></tr>
          <tr><td>Access Modifiers</td><td>Always public</td><td>Can vary</td></tr>
        </tbody>
      </table>

      <p><strong>6. Explicit Interface Implementation</strong></p>
      <pre>{`public interface IPrintable {
  void Print();
}

public interface IScannable {
  void Print();
}

public class Device : IPrintable, IScannable {
  void IPrintable.Print() {
    Console.WriteLine("Print from IPrintable");
  }

  void IScannable.Print() {
    Console.WriteLine("Print from IScannable");
  }
}`}</pre>
    </section>

  Device d = new Device();
  ((IPrintable)d).Print();
  ((IScannable)d).Print();
  ```


    **Conclusion**

    Inheritance promotes reusability and flexibility in C#. By understanding inheritance, you can create powerful, extensible code structures and take full advantage of polymorphism and abstraction.
  </p>
</section>


// Interfaces
<section id="interfaces">
  <h2>Interfaces</h2>
  <p>
    Interfaces in C# define a contract that implementing classes must follow. An interface contains method signatures, properties, events, or indexers, but no implementation. They support multiple inheritance and are essential for creating loosely coupled, testable applications.

 <section id="interfaces">
  <h2>1. Defining an Interface</h2>
  <p>Use the <code>interface</code> keyword:</p>
  <pre><code>{`
public interface IAnimal {
  void Speak();
}
`}</code></pre>

  <h2>2. Implementing an Interface</h2>
  <p>A class implements an interface using the <code>:</code> operator:</p>
  <pre><code>{`
public class Dog : IAnimal {
  public void Speak() {
    Console.WriteLine("Woof!");
  }
}
`}</code></pre>

  <h2>3. Multiple Interface Implementation</h2>
  <p>A class can implement more than one interface:</p>
  <pre><code>{`
public interface IRunnable {
  void Run();
}

public class Robot : IAnimal, IRunnable {
  public void Speak() {
    Console.WriteLine("Beep!");
  }

  public void Run() {
    Console.WriteLine("Running...");
  }
}
`}</code></pre>

  <h2>4. Interface Inheritance</h2>
  <p>Interfaces can inherit from other interfaces:</p>
  <pre><code>{`
public interface IMammal : IAnimal {
  void Walk();
}
`}</code></pre>

  <h2>5. Interface vs Abstract Class</h2>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Interface</th>
        <th>Abstract Class</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Implementation</td>
        <td>No (only declarations)</td>
        <td>Can have implementation</td>
      </tr>
      <tr>
        <td>Multiple Inheritance</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td>Constructors</td>
        <td>Not allowed</td>
        <td>Allowed</td>
      </tr>
      <tr>
        <td>Access Modifiers</td>
        <td>Always public</td>
        <td>Can vary</td>
      </tr>
    </tbody>
  </table>

  <h2>6. Explicit Interface Implementation</h2>
  <p>Used to avoid name conflicts:</p>
  <pre><code>{`
public interface IPrintable {
  void Print();
}

public interface IScannable {
  void Print();
}

public class Device : IPrintable, IScannable {
  void IPrintable.Print() {
    Console.WriteLine("Print from IPrintable");
  }

  void IScannable.Print() {
    Console.WriteLine("Print from IScannable");
  }
}
`}</code></pre>
  <p>Usage:</p>
  <pre><code>{`
Device d = new Device();
((IPrintable)d).Print();
((IScannable)d).Print();
`}</code></pre>

  <h2>7. Polymorphism with Interfaces</h2>
  <pre><code>{`
IAnimal animal = new Dog();
animal.Speak();
`}</code></pre>

  <h2>8. Dependency Injection</h2>
  <p>Interfaces are critical in DI, allowing services to depend on abstractions:</p>
  <pre><code>{`
public interface ILogger {
  void Log(string message);
}

public class ConsoleLogger : ILogger {
  public void Log(string message) => Console.WriteLine(message);
}
`}</code></pre>

  <h2>9. Interface Default Implementation (C# 8+)</h2>
  <p>Interfaces can provide default method implementations:</p>
  <pre><code>{`
public interface IGreet {
  void SayHi() => Console.WriteLine("Hi!");
}
`}</code></pre>


</section>

    ```

    **Conclusion**
    Interfaces define flexible, testable, and maintainable architectures in C#. They enable polymorphism and abstraction, key pillars in designing robust software systems.
  </p>
</section>

// Collections
<section id="collections">
  <h2>Collections</h2>
  <p>
    Collections in C# are used to store, retrieve, and manipulate groups of related objects. The .NET Framework provides several collection types, including arrays, lists, dictionaries, queues, stacks, and more. These collections are part of the System.Collections and System.Collections.Generic namespaces.
</p>
    <section id="collections">
  <h2>1. <code>List&lt;T&gt;</code></h2>
  <p>A generic list that provides dynamic resizing:</p>
  <pre><code>{`
List<string> names = new List<string>();
names.Add("Alice");
names.Add("Bob");
foreach (var name in names) {
  Console.WriteLine(name);
}
`}</code></pre>

  <h2>2. <code>Dictionary&lt;TKey, TValue&gt;</code></h2>
  <p>Stores key-value pairs:</p>
  <pre><code>{`
Dictionary<string, int> scores = new Dictionary<string, int>();
scores["John"] = 90;
scores["Jane"] = 95;
Console.WriteLine(scores["Jane"]);
`}</code></pre>

  <h2>3. <code>HashSet&lt;T&gt;</code></h2>
  <p>Stores unique elements:</p>
  <pre><code>{`
HashSet<int> set = new HashSet<int>();
set.Add(1);
set.Add(2);
set.Add(1); // duplicate ignored
`}</code></pre>

  <h2>4. <code>Queue&lt;T&gt;</code></h2>
  <p>FIFO (first-in, first-out) collection:</p>
  <pre><code>{`
Queue<string> queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");
Console.WriteLine(queue.Dequeue()); // first
`}</code></pre>

  <h2>5. <code>Stack&lt;T&gt;</code></h2>
  <p>LIFO (last-in, first-out) collection:</p>
  <pre><code>{`
Stack<int> stack = new Stack<int>();
stack.Push(10);
stack.Push(20);
Console.WriteLine(stack.Pop()); // 20
`}</code></pre>

  <h2>6. <code>ObservableCollection&lt;T&gt;</code></h2>
  <p>Notifies UI of changes:</p>
  <pre><code>{`
ObservableCollection<string> items = new ObservableCollection<string>();
items.CollectionChanged += (s, e) => Console.WriteLine("Changed");
items.Add("Item 1");
`}</code></pre>

  <h2>7. Concurrent Collections</h2>
  <p>Used in multithreading scenarios:</p>
  <ul>
    <li><code>ConcurrentBag&lt;T&gt;</code></li>
    <li><code>ConcurrentDictionary&lt;TKey, TValue&gt;</code></li>
    <li><code>BlockingCollection&lt;T&gt;</code></li>
  </ul>

  <h2>8. LINQ with Collections</h2>
  <p>Language Integrated Query simplifies operations:</p>
  <pre><code>{`
var filtered = names.Where(n => n.StartsWith("A")).ToList();
`}</code></pre>

  <h2>9. Array vs Collections</h2>
  <p>Arrays have fixed size. Collections are dynamic and provide more methods:</p>
  <pre><code>{`
int[] array = { 1, 2, 3 };
List<int> list = new List<int>(array);
`}</code></pre>

  <h2>10. Choosing the Right Collection</h2>
  <ul>
    <li>Use <code>List&lt;T&gt;</code> for simple lists</li>
    <li>Use <code>Dictionary&lt;TKey, TValue&gt;</code> for lookups</li>
    <li>Use <code>Queue&lt;T&gt;</code> or <code>Stack&lt;T&gt;</code> for ordering</li>
    <li>Use <code>HashSet&lt;T&gt;</code> for uniqueness</li>
  </ul>

  <h2>Conclusion</h2>
  <p>
    Collections are indispensable in C#. Mastering them helps you handle data efficiently and build performant, scalable applications.
  </p>
</section>

</section>
          
// Exception Handling
<section id="exceptions">
<h2>Exception Handling</h2>
<p>
  Exception handling in C# is a powerful mechanism that enables developers to gracefully handle runtime errors and unexpected conditions without crashing the application. C# uses a `try-catch-finally` structure to manage exceptions.

  **1. What Is an Exception?**
  An exception is an error that occurs during the execution of a program. Examples include divide-by-zero, file not found, or null reference errors.

  <section id="try-catch-blocks">
  <h2>2. Basic try-catch Block</h2>
  <pre>
    <code>{`
try {
    int result = 10 / 0;
} catch (DivideByZeroException ex) {
    Console.WriteLine("Cannot divide by zero: " + ex.Message);
}
    `}</code>
  </pre>

  <h2>3. Multiple catch Blocks</h2>
  <p>You can catch different types of exceptions separately:</p>
  <pre>
    <code>{`
try {
    // risky code
} catch (NullReferenceException ex) {
    Console.WriteLine("Null error: " + ex.Message);
} catch (Exception ex) {
    Console.WriteLine("General error: " + ex.Message);
}
    `}</code>
  </pre>
</section>


<section id="finally-block">
  <h2>4. The <code>finally</code> Block</h2>
  <p>
    The <code>finally</code> block is always executed, whether an exception occurs or not. It's typically used for cleanup activities like closing files or releasing resources.
  </p>
  <pre>
    <code>{`
try {
    // operations
} catch {
    // error handling
} finally {
    Console.WriteLine("Cleanup actions");
}
    `}</code>
  </pre>
  <p>
    No matter what happens in the <code>try</code> or <code>catch</code> block, the code inside <code>finally</code> will run.
  </p>
</section>


  **5. throw Keyword**
  Used to manually raise exceptions:
  ```csharp
  throw new InvalidOperationException("Invalid operation");
  ```

  <section id="custom-exceptions">
  <h2>6. Custom Exceptions</h2>
  <p>
    In C#, you can define your own exception types by extending the <code>Exception</code> class.
    This is useful when you want to throw meaningful errors specific to your application's domain logic.
  </p>
  <pre>
    <code>{`
public class AgeException : Exception {
    public AgeException(string message) : base(message) {}
}
    `}</code>
  </pre>
  <p>Here’s how you might use it in practice:</p>
  <pre>
    <code>{`
int age = 15;
if (age < 18) {
    throw new AgeException("User must be at least 18 years old.");
}
    `}</code>
  </pre>
</section>


  **7. Best Practices**
  - Use specific exception types
  - Avoid empty catch blocks
  - Use `finally` for cleanup
  - Avoid catching exceptions you can not handle

  **8. Common Exceptions**
  - `NullReferenceException`
  - `IndexOutOfRangeException`
  - `DivideByZeroException`
  - `InvalidOperationException`
  - `FileNotFoundException`

  <section id="realworld-example">
  <h2>9. Real-World Example</h2>
  <p>This example shows how to handle exceptions when reading a file that might not exist:</p>
  <pre>
    <code>{`
try {
    string text = File.ReadAllText("nonexistent.txt");
} catch (FileNotFoundException ex) {
    Console.WriteLine("File not found: " + ex.FileName);
}
    `}</code>
  </pre>
</section>


  **10. When Not to Use Exceptions**
  Avoid using exceptions for normal flow control. They are intended for truly exceptional scenarios.

  **Conclusion**
  Exception handling helps maintain the stability and reliability of applications by allowing errors to be caught and resolved systematically. It’s a critical skill in writing robust and fault-tolerant software.
</p>
</section>

// File I/O
<section id="fileio">
  <h2>File I/O</h2>
  <p>
    File Input and Output (File I/O) in C# allows developers to read from and write to files on the disk. It’s a crucial part of many applications, whether you're logging activity, processing data files, or persisting user input.

    **1. Namespaces Required**
    To work with files, use:
    ```csharp
    using System.IO;
    ```

    **2. Writing to a File**
    Write text content to a file using:
    ```csharp
    File.WriteAllText("data.txt", "Hello, C# file!");
    ```
    Or append:
    ```csharp
    File.AppendAllText("data.txt", "\nAppending a line.");
    ```

    **3. Reading from a File**
    ```csharp
    string content = File.ReadAllText("data.txt");
    Console.WriteLine(content);
    ```

    <section id="readlines">
  <h2>4. Reading Line by Line</h2>
  <p>This example shows how to read all lines from a file and print each line:</p>
  <pre>
    <code>{`
string[] lines = File.ReadAllLines("data.txt");
foreach (string line in lines) {
    Console.WriteLine(line);
}
    `}</code>
  </pre>
</section>


    <section id="filestream">
  <h2>5. Using FileStream</h2>
  <p>FileStream gives more control:</p>
  <pre>
    <code>{`
using (FileStream fs = new FileStream("data.txt", FileMode.OpenOrCreate)) {
    byte[] info = new UTF8Encoding(true).GetBytes("Hello FileStream");
    fs.Write(info, 0, info.Length);
}
    `}</code>
  </pre>
</section>


    <section id="stream-example">
  <h2>6. Using StreamReader and StreamWriter</h2>
  <pre>
    <code>{`
using (StreamWriter sw = new StreamWriter("log.txt")) {
    sw.WriteLine("Log entry");
}

using (StreamReader sr = new StreamReader("log.txt")) {
    string line;
    while ((line = sr.ReadLine()) != null) {
        Console.WriteLine(line);
    }
}
    `}</code>
  </pre>
</section>


<p><strong>7. Checking File Existence</strong></p>
        <pre>{`if (File.Exists("data.txt")) {
  Console.WriteLine("File exists.");
}`}</pre>

    **8. Deleting or Copying Files**
    ```csharp
    File.Delete("old.txt");
    File.Copy("data.txt", "backup.txt", true);
    ```

    **9. Directory Operations**
    ```csharp
    Directory.CreateDirectory("MyFolder");
    string[] files = Directory.GetFiles("MyFolder");
    ```

    <section id="logger-example">
  <h2>10. Real-World Example: Logging System</h2>
  <pre>
    <code>{`
public class Logger {
    private string logPath = "app.log";

    public void Log(string message) {
        using (StreamWriter sw = File.AppendText(logPath)) {
            sw.WriteLine($"[{DateTime.Now}] {message}");
        }
    }
}
    `}</code>
  </pre>
</section>


    ```

    **Conclusion**
    File I/O is an essential aspect of many applications. C# offers rich APIs through the `System.IO` namespace for reading, writing, and managing files and directories with flexibility and safety.
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

export default CSharpTutorial;
