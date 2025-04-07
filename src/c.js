import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const CTutorial = () => {
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
          <h3>C Language Topics</h3>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#features">Features of C</a></li>
            <li><a href="#setup">Environment Setup</a></li>
            <li><a href="#syntax">Basic Syntax</a></li>
            <li><a href="#variables">Variables & Data Types</a></li>
            <li><a href="#operators">Operators</a></li>
            <li><a href="#conditions">Conditional Statements</a></li>
            <li><a href="#loops">Loops</a></li>
            <li><a href="#functions">Functions</a></li>
            <li><a href="#arrays">Arrays</a></li>
            <li><a href="#strings">Strings</a></li>
            <li><a href="#pointers">Pointers</a></li>
            <li><a href="#structures">Structures & Unions</a></li>
            <li><a href="#fileio">File I/O</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
        <section id="intro">
  <h2>Introduction to C Programming</h2>
  <p>
    C is a powerful general-purpose programming language that was created by Dennis Ritchie in 1972 at Bell Labs. It is one of the oldest and most widely used programming languages in the world. Despite its age, C remains highly relevant in modern software development due to its efficiency, flexibility, and portability.
  </p>
  <p>
    C is often described as a "middle-level" language, meaning it combines the low-level capabilities of assembly language with high-level abstractions found in modern programming languages. This unique feature makes C a great language for system-level programming and application development, offering the best of both worlds: low-level access to hardware and high-level features like structured programming and modularity.
  </p>
  <p>
    One of C's most significant contributions is its influence on other programming languages. Languages like C++, Java, Python, and even JavaScript owe much of their syntax and concepts to C. Learning C gives you a solid foundation for understanding how other modern programming languages work.
  </p>
  <p>
    C has a rich history, primarily used to develop the UNIX operating system. UNIX was designed to be portable, and C played a crucial role in achieving this goal. Today, C is used for a wide variety of applications, ranging from operating systems, embedded systems, device drivers, and even high-performance applications like game engines and scientific software.
  </p>
  <p>
    Despite being developed over four decades ago, C continues to be a staple language in both academia and industry. Its portability, performance, and simplicity make it a language that is just as relevant today as it was when it was first created. Understanding C can provide a deep understanding of computer systems and open up opportunities for working on low-level programming and systems development.
  </p>
  <h4>Why is C Still Relevant?</h4>
  <p>
    There are several reasons why C remains one of the most important programming languages, despite the rise of more modern languages. Some of these reasons include:
  </p>
  <ul>
    <li><strong>Efficiency and Performance</strong>: C is known for its ability to produce fast and optimized machine code. This is one of the key reasons why it is still used for performance-critical applications like operating systems, embedded systems, and game engines.</li>
    <li><strong>Low-Level Memory Access</strong>: C provides the ability to directly access and manipulate memory through pointers. This is particularly valuable in system programming where fine-grained control over memory management is crucial.</li>
    <li><strong>Portability</strong>: C code is highly portable across different platforms and systems. This was one of the key goals when UNIX was developed, and it remains one of C's strongest features today.</li>
    <li><strong>Foundation for Other Languages</strong>: Many modern programming languages, including C++, Java, and Python, are based on concepts and syntax that originated in C. Understanding C gives you a deeper insight into how other programming languages work.</li>
    <li><strong>Modularity</strong>: C allows you to break down a program into smaller, manageable functions, promoting modular programming. This makes code easier to understand, maintain, and debug.</li>
  </ul>
  <p>
    Whether you're working on operating systems, embedded systems, or high-performance applications, C is a crucial language to know. It provides the tools and capabilities to write fast, efficient, and low-level code that is essential for system-level programming.
  </p>
  <h4>Key Applications of C</h4>
  <p>
    The C language is widely used in various domains, some of the key applications include:
  </p>
  <ul>
    <li><strong>Operating Systems</strong>: UNIX, Linux, and macOS are all written in C. The ability to interact directly with hardware makes C ideal for developing operating systems.</li>
    <li><strong>Embedded Systems</strong>: C is used extensively in embedded systems, from consumer electronics like smartphones and microwaves to industrial machines and medical devices.</li>
    <li><strong>Device Drivers</strong>: C is often used to write device drivers, which are software components that allow the operating system to communicate with hardware devices like printers, cameras, and network adapters.</li>
    <li><strong>Game Development</strong>: Many high-performance game engines like Unreal Engine rely heavily on C or its extended version, C++. The efficiency of C makes it perfect for building complex, resource-intensive games.</li>
    <li><strong>Compilers and Interpreters</strong>: C is commonly used for developing compilers and interpreters for other programming languages. Its low-level nature allows for greater control over the translation of code into machine language.</li>
  </ul>
</section>

<section id="features">
  <h3>Features of C</h3>
  <p>C programming language offers several important features, which make it powerful and efficient. Let's dive deeper into some of these key features:</p>
  <ul>
    <li><strong>Low-Level Access</strong>: 
      <p>C provides low-level memory access through the use of pointers. A pointer is a variable that stores the memory address of another variable. This feature allows developers to have more control over memory allocation and optimization, making C ideal for system programming.</p>
    </li>
    <li><strong>Portability</strong>: 
      <p>C code can be compiled on any machine with minimal changes. This portability is a key feature that has made C such a popular choice for writing operating systems and other system software. It adheres to standards that ensure C programs can run across different hardware architectures without modification.</p>
    </li>
    <li><strong>Fast Execution</strong>: 
      <p>C is known for its fast execution time because it compiles directly to machine code. There’s minimal abstraction between the code you write and the underlying hardware, which means that C programs can run efficiently, even for resource-intensive applications.</p>
    </li>
    <li><strong>Modular Approach</strong>: 
      <p>C supports modular programming, which involves breaking down code into smaller, reusable functions. This improves code organization, readability, and maintainability. Functions can be tested individually and reused across different parts of the program.</p>
    </li>
    <li><strong>Rich Library</strong>: 
      <p>The C language provides a rich set of standard libraries that offer pre-built functions for performing common tasks such as input/output operations, string manipulation, memory management, and mathematical computations. These libraries help in reducing development time and effort.</p>
    </li>
  </ul>
</section>

<section id="setup">
  <h3>Environment Setup</h3>
  <p>Before writing C programs, you need to set up a development environment. This setup involves installing a compiler and an IDE (Integrated Development Environment). Here’s a step-by-step guide to get started:</p>
  <ol>
    <li><strong>Install a Compiler:</strong> 
      <p>First, you’ll need a C compiler. GCC (GNU Compiler Collection) is one of the most commonly used compilers. On Windows, you can install MinGW or use a pre-packaged IDE like Code::Blocks that comes with GCC. On macOS, Xcode includes a C compiler by default.</p>
    </li>
    <li><strong>Install an IDE:</strong> 
      <p>You can write C code using a simple text editor, but using an IDE like Code::Blocks, Dev-C++, or Visual Studio Code provides features like syntax highlighting, debugging tools, and built-in compilers. These IDEs can make your development process much easier.</p>
    </li>
    <li><strong>Write Your First Program:</strong> 
      <p>Once you’ve installed a compiler and IDE, you can start writing C programs. Here’s how to create your first “Hello, World!” program and compile it:</p>
    </li>
  </ol>
  <pre>
        <code>
          {`#include <stdio.h>

          int main() {
            printf("Hello, World!");
            return 0;
          }`}
        </code>
      </pre>
  <p>When you run this program, it will print "Hello, World!" to the console. This demonstrates how simple it is to start coding in C!</p>
</section>

<section id="syntax">
  <h3>Basic Syntax</h3>
  <p>The syntax in C is designed to be simple and concise. It uses a set of rules for writing statements that the compiler can understand and execute. Below is an explanation of the key components of a C program:</p>
  <pre>
        <code>
          {`#include <stdio.h>

          int main() {
            // Code starts here
            printf("Hello, World!");
            return 0;
          }`}
        </code>
      </pre>
  <p>In this basic example:</p>
  <ul>
    <li><strong>#include &lt;stdio.h&gt;</strong>: This line includes the standard input/output library, which contains the `printf()` function used to print text to the screen.</li>
    <li><strong>int main()</strong>: The `main()` function is the entry point of every C program. The execution of the program begins here.</li>
    <li><strong>printf()</strong>: The `printf()` function is used to display text on the screen.</li>
    <li><strong>return 0;</strong>: The `return 0;` statement marks the end of the program and indicates that it executed successfully.</li>
  </ul>
</section>

<section id="variables">
  <h3>Variables & Data Types</h3>
  <p>In C, a variable is a named memory location that stores a value. Variables must be declared with a specific data type before they can be used. C supports a variety of data types:</p>
  <ul>
    <li><strong>int</strong>: Used to store integers (whole numbers), e.g., `int x = 10;`</li>
    <li><strong>float</strong>: Used to store decimal numbers, e.g., `float pi = 3.14;`</li>
    <li><strong>char</strong>: Used to store a single character, e.g., `char letter = 'A';`</li>
    <li><strong>double</strong>: Used to store high-precision floating-point numbers, e.g., `double pi = 3.14159;`</li>
  </ul>
  <p>Example of variable declarations:</p>
  <pre>
    <code>
      int age = 25;
      float salary = 50000.50;
      char grade = 'A';
      double pi = 3.14159265358979;
    </code>
  </pre>
  <p>In C, the data type of a variable must be declared before its usage, ensuring that the compiler knows how much space to allocate in memory.</p>
</section>

<section id="operators">
  <h3>Operators</h3>
  <p>Operators in C are used to perform operations on variables and values. Below are the most commonly used operators:</p>
  <ul>
    <li><strong>Arithmetic Operators</strong>: `+`, `-`, `*`, `/`, `%` (for addition, subtraction, multiplication, division, and modulus)</li>
    <li><strong>Relational Operators</strong>: `==`, `!=`, `&gt;`, `&lt;`, `&gt;=`, `&lt;=` (for comparisons)</li>
   
    <li><strong>Logical Operators</strong>: `&&`, `||`, `!` (for logical AND, OR, and NOT)</li>
  </ul>
  <p>Example of an arithmetic operation:</p>
  <pre>
    <code>
      int result = 10 + 5;  // result will be 15
    </code>
  </pre>
  <p>Operators are fundamental in manipulating data and controlling the flow of your program.</p>
</section>

<section id="conditions">
  <h3>Conditional Statements</h3>
  <p>C provides conditional statements to make decisions based on certain conditions. The key conditional statements are:</p>
  <ul>
    <li><strong>if</strong>: Executes a block of code if the condition is true.</li>
    <li><strong>else</strong>: Executes a block of code if the condition in the `if` statement is false.</li>
    <li><strong>switch</strong>: Allows testing a variable against multiple conditions.</li>
  </ul>
  <p>Example using `if` statement:</p>
  <pre>
        <code>
          {`if (x > y) {
            printf("x is greater than y");
          } else {
            printf("x is not greater than y");
          }`}
        </code>
      </pre>
  <p>This allows you to execute different blocks of code based on whether certain conditions are true or false.</p>
</section>

<section id="loops">
  <h3>Loops</h3>
  <p>Loops are used to repeat a block of code multiple times. The most commonly used loops in C are:</p>
  <ul>
    <li><strong>for</strong>: A loop with a known number of iterations.</li>
    <li><strong>while</strong>: A loop that runs while a condition is true.</li>
    <li><strong>do-while</strong>: A loop that runs at least once before checking the condition.</li>
  </ul>
  <p>Example of a `for` loop:</p>
  <pre>
        <code>
          {`for (int i = 0; i < 5; i++) {
            printf("%d", i);
          }`}
        </code>
      </pre>
  <p>This example will print the numbers 0 to 4 to the screen.</p>
</section>

<section id="functions">
  <h3>Functions</h3>
  <p>Functions in C allow you to write reusable blocks of code that can be called from anywhere in your program. Functions help break your program into manageable sections and reduce code redundancy.</p>
  <pre>
        <code>
          {`int add(int a, int b) {
            return a + b;
          }`}
        </code>
      </pre>
  <p>To call the `add` function:</p>
  <pre>
    <code>
      int result = add(5, 3);  // result will be 8
    </code>
  </pre>
  <p>Functions can take inputs (parameters) and return outputs (return values).</p>
</section>

<section id="arrays">
  <h3>Arrays</h3>
  <p>An array in C is a collection of variables of the same type. Arrays store multiple values in a single variable, and you can access each element using an index.</p>
  <pre>
        <code>
          {`int arr[5] = {1, 2, 3, 4, 5};
          printf("%d", arr[2]);  // Output: 3`}
        </code>
      </pre>
  <p>Arrays are commonly used when dealing with large amounts of data, as they allow you to store and manage multiple values efficiently.</p>
</section>

<section id="strings">
  <h3>Strings</h3>
  <p>In C, strings are arrays of characters terminated by a null character `'\0'`. You can manipulate strings using various functions from the C standard library.</p>
  <pre>
    <code>
      char str[] = "Hello, World!";
      printf("%s", str);  // Output: Hello, World!
    </code>
  </pre>
  <p>Strings are useful for handling textual data in your program, and you can modify or manipulate them easily with C's string handling functions.</p>
</section>
<section id="pointers">
  <h3>Pointers</h3>
  <p>Pointers are one of the most powerful features of C programming. A pointer is a variable that stores the memory address of another variable. This allows you to manipulate the contents of memory directly and is essential for tasks like dynamic memory allocation and passing variables by reference.</p>
  <p>Pointers give you a deeper level of control over your program’s memory usage, which is why C is often used in system-level programming where efficiency and control are paramount.</p>
  
  <h4>How Pointers Work</h4>
  <ul>
    <li><strong>Pointer Declaration</strong>: A pointer is declared using an asterisk (*) before the variable name to indicate it will store an address.</li>
    <li><strong>Dereferencing</strong>: Dereferencing a pointer means accessing the value stored at the address the pointer is pointing to.</li>
    <li><strong>Address-of Operator (&)</strong>: The address-of operator (`&`) is used to obtain the memory address of a variable.</li>
  </ul>
  
  <p>Example of using a pointer:</p>
  <pre>
    <code>
      int x = 10;
      int *p = &x; // Pointer 'p' stores the address of variable 'x'
      printf("%d", *p); // Dereferencing 'p' gives the value of 'x', which is 10
    </code>
  </pre>
  <p>In this example, the pointer `p` holds the address of the variable `x`. Dereferencing `p` allows you to access the value stored at that memory address.</p>
</section>

<section id="structures">
  <h3>Structures & Unions</h3>
  <p>Structures in C allow you to group different data types into a single unit. This is useful when you need to represent a complex entity with multiple properties. Unions, on the other hand, allow you to store different data types in the same memory location but only one at a time.</p>

  <h4>Structures</h4>
  <p>A structure is defined using the `struct` keyword. It can hold variables of different types, making it more flexible than an array. Here's how to define and use a structure:</p>
  <pre>
        <code>
          {`struct Person {
            char name[50];
            int age;
          };

          struct Person person1;
          person1.age = 30;
          strcpy(person1.name, "John");
          printf("Name: %s, Age: %d", person1.name, person1.age);`}
        </code>
      </pre>
  <p>In this example, we define a `struct` called `Person` that contains two fields: `name` and `age`. We then create a variable `person1` of type `struct Person` and assign values to the fields.</p>

  <h4>Unions</h4>
  <p>Unions are similar to structures but use the same memory location for all their members. This means that a union can only store one of its members at a time, saving memory. Here’s how to define and use a union:</p>
  <pre>
        <code>
          {`union Data {
            int i;
            float f;
            char str[20];
          };

          union Data data1;
          data1.i = 10;
          printf("Integer: %d", data1.i);`}
        </code>
      </pre>
  <p>In this example, `data1` is a union that can hold an integer, a float, or a string. However, only one of these can be stored at any given time.</p>
</section>

<section id="fileio">
  <h3>File I/O</h3>
  <p>
        File Input/Output (File I/O) is a crucial part of programming, allowing you to read from and write to files. 
        In C, you can work with files using the standard library functions provided in 
        <code>&lt;stdio.h&gt;</code>. This includes opening, reading, writing, and closing files.
      </p>
  
  <h4>Opening a File</h4>
  <p>You can use the `fopen()` function to open a file. The function takes the filename and the mode (read, write, append, etc.) as arguments.</p>
  <p>Example of opening a file for writing:</p>
  <pre>
        <code>
          {`FILE *file = fopen("example.txt", "w");
if (file == NULL) {
  printf("Error opening file.");
  return 1;
}
fprintf(file, "Hello, File I/O!");
fclose(file);`}
        </code>
      </pre>
  <p>This code opens the file "example.txt" in write mode. If the file is successfully opened, the string "Hello, File I/O!" is written to the file. After writing, the file is closed using `fclose()`.</p>

  <h4>Reading from a File</h4>
  <p>To read data from a file, you can use functions like `fscanf()`, `fgets()`, or `fread()`. Here's an example of reading from a file:</p>
  <pre>
        <code>
          {`FILE *file = fopen("example.txt", "r");
if (file == NULL) {
  printf("Error opening file.");
  return 1;
}
char buffer[255];
fgets(buffer, 255, file);
printf("File content: %s", buffer);
fclose(file);`}
        </code>
      </pre>

  <p>In this case, we use `fgets()` to read a line from the file and store it in the `buffer`. The content is then printed to the screen.</p>

  <h4>Closing a File</h4>
  <p>It’s essential to close files when you're done using them. The `fclose()` function is used for this purpose, ensuring that any data is properly flushed and resources are freed.</p>
</section>

<section id="memory">
  <h3>Memory Management</h3>
  <p>In C, memory management is one of the programmer’s responsibilities. C provides functions like `malloc()`, `calloc()`, and `free()` to dynamically allocate and deallocate memory during program execution. This gives developers more control over memory usage but also requires careful management to prevent memory leaks and errors.</p>

  <h4>Dynamic Memory Allocation</h4>
  <p>Use the `malloc()` function to allocate a block of memory during program execution. `malloc()` stands for memory allocation. It returns a pointer to the allocated memory, or NULL if the allocation fails.</p>
  <pre>
  <code>
    {`int *ptr = (int *)malloc(sizeof(int) * 5);
      if (ptr == NULL) {
        printf("Memory allocation failed!");
        return 1;
      }
      ptr[0] = 10;
      free(ptr);`}
  </code>
</pre>

  <p>This code dynamically allocates memory for 5 integers and then assigns a value to the first element. After using the memory, the `free()` function deallocates it.</p>

  <h4>Memory Deallocation</h4>
  <p>Memory that is dynamically allocated using `malloc()` or `calloc()` should be freed using `free()`. This is crucial to prevent memory leaks, which can lead to performance issues or crashes.</p>
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

export default CTutorial;
