
import { useNavigate } from "react-router-dom";
import "./Home.css";
import React, { useEffect, useState, useRef } from 'react';
import { auth } from "./firebase";
import { database } from './firebase';
import { ref, push, set } from 'firebase/database';
import { onValue } from "firebase/database";

const Exercise = () => {
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
  const [topic, setTopic] = useState("");
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Example questions for each topic (10 questions each)
  const questions = {
    C: [
      { question: "What is the size of `int` in C?", options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"], correct: "4 bytes" },
      { question: "Which of the following is used to include a header file in C?", options: ["#include <stdio.h>", "#include <iostream>", "import", "using"], correct: "#include <stdio.h>" },
      { question: "Which of these is the correct declaration for a pointer?", options: ["int *ptr;", "int ptr;", "pointer *int;", "pointer ptr;"], correct: "int *ptr;" },
      { question: "What is the correct way to declare a constant variable in C?", options: ["const int x;", "int const x;", "const x int;", "int x constant;"], correct: "const int x;" },
      { question: "Which of the following operators is used to access members of a structure?", options: [".", "&", "->", "*"], correct: "." },
      { question: "Which function is used to dynamically allocate memory in C?", options: ["malloc", "alloc", "new", "calloc"], correct: "malloc" },
      { question: "Which of the following is not a valid data type in C?", options: ["int", "float", "string", "double"], correct: "string" },
      { question: "How is a comment written in C?", options: ["# comment", "// comment", "<!-- comment -->", "/* comment */"], correct: "// comment" },
      { question: "What is the purpose of `return` in C?", options: ["To terminate the program", "To return a value from a function", "To break a loop", "None of the above"], correct: "To return a value from a function" },
      { question: "Which function is used to read input from the user in C?", options: ["scanf", "cin", "input", "read"], correct: "scanf" }
    ],
    "C++": [
      { question: "What is the correct syntax for defining a class in C++?", options: ["class MyClass {}", "class MyClass[]", "class MyClass()", "class MyClass;"], correct: "class MyClass {}" },
      { question: "Which of these is used to declare a constructor in C++?", options: ["class MyClass{}", "MyClass()", "MyClass{ }", "constructor MyClass()"], correct: "MyClass()" },
      { question: "What is the output of `cout << 5/2;` in C++?", options: ["2", "2.5", "3", "5"], correct: "2" },
      { question: "Which of these is used to declare a pointer in C++?", options: ["int ptr", "int* ptr", "pointer int ptr", "ptr:int"], correct: "int* ptr" },
      { question: "Which function is used to find the size of an object in C++?", options: ["sizeof()", "length()", "objectSize()", "size()"], correct: "sizeof()" },
      { question: "Which of these is used to define a constant variable in C++?", options: ["constant int x;", "const int x;", "int const x;", "int x constant;"], correct: "const int x;" },
      { question: "How do you declare a dynamic array in C++?", options: ["int* arr = new int[10];", "int arr[10];", "int arr[] = new int[10];", "int* arr = malloc(10 * sizeof(int));"], correct: "int* arr = new int[10];" },
      { question: "What is the correct syntax to handle exceptions in C++?", options: ["try/catch", "throw/catch", "try/throw", "catch/throw"], correct: "try/catch" },
      { question: "What is the purpose of the `virtual` keyword in C++?", options: ["To create virtual functions", "To declare a function in a class", "To override the function", "None of the above"], correct: "To create virtual functions" },
      { question: "Which of the following can be used to pass by reference in C++?", options: ["int &x", "int *x", "int x", "None of the above"], correct: "int &x" }
    ],
    HTML: [
      { question: "Which of the following is the correct tag for inserting an image in HTML?", options: ["<img src='image.jpg'>", "<image src='image.jpg'>", "<img>image.jpg</img>", "<img link='image.jpg'>"], correct: "<img src='image.jpg'>" },
      { question: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<hyperlink>", "<url>"], correct: "<a>" },
      { question: "Which attribute is used to specify an external CSS file?", options: ["src", "href", "style", "link"], correct: "href" },
      { question: "What is the purpose of the `<meta>` tag in HTML?", options: ["To define metadata", "To add JavaScript", "To define the header", "To add a footer"], correct: "To define metadata" },
      { question: "Which of these is not a valid HTML tag?", options: ["<div>", "<p>", "<row>", "<img>"], correct: "<row>" },
      { question: "Which tag is used to display the largest heading in HTML?", options: ["<h1>", "<h2>", "<h3>", "<header>"], correct: "<h1>" },
      { question: "What is the default value of the `<ol>` list?", options: ["Decimal", "Roman", "None", "Alphabetical"], correct: "Decimal" },
      { question: "Which tag is used to define a table in HTML?", options: ["<table>", "<tab>", "<tbody>", "<thead>"], correct: "<table>" },
      { question: "How do you add a comment in HTML?", options: ["// comment", "# comment", "<!-- comment -->", "# comment"], correct: "<!-- comment -->" },
      { question: "Which tag is used to define a block of code in HTML?", options: ["<code>", "<pre>", "<script>", "<block>"], correct: "<code>" }
    ],
    Python: [
      { question: "What is the correct syntax for defining a function in Python?", options: ["def func():", "function func():", "def func;", "func() define:"], correct: "def func():" },
      { question: "Which of the following is not a valid data type in Python?", options: ["int", "string", "list", "pointer"], correct: "pointer" },
      { question: "How do you create a comment in Python?", options: ["# comment", "// comment", "/* comment */", "/* comment"], correct: "# comment" },
      { question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "exp", "^^"], correct: "**" },
      { question: "Which of these is used to import a module in Python?", options: ["import", "include", "require", "using"], correct: "import" },
      { question: "How do you check if a value is in a list in Python?", options: ["in", "exists", "contains", "has"], correct: "in" },
      { question: "Which function is used to find the length of a list in Python?", options: ["length()", "len()", "size()", "count()"], correct: "len()" },
      { question: "What is the correct way to define a dictionary in Python?", options: ["dict = {}", "dict = []", "dict = []{}", "dict = ()"], correct: "dict = {}" },
      { question: "Which of the following is used to handle exceptions in Python?", options: ["try/except", "catch/throw", "error/handler", "try/catch"], correct: "try/except" },
      { question: "How do you access the second item in a list `lst` in Python?", options: ["lst[1]", "lst[2]", "lst[0]", "lst(1)"], correct: "lst[1]" }
    ],
    Java: [
      { question: "What is the correct syntax for defining a class in Java?", options: ["class MyClass {}", "class MyClass[]", "class MyClass()", "class MyClass;"], correct: "class MyClass {}" },
      { question: "Which of these is used to declare a constructor in Java?", options: ["class MyClass{}", "MyClass()", "MyClass{ }", "constructor MyClass()"], correct: "MyClass()" },
      { question: "What is the output of `System.out.println(5/2);` in Java?", options: ["2", "2.5", "3", "5"], correct: "2" },
      { question: "Which function is used to find the size of an array in Java?", options: ["length()", "len()", "size()", "getSize()"], correct: "length()" },
      { question: "Which of these is used to declare a constant in Java?", options: ["final int x;", "int constant x;", "const int x;", "const x = 10;"], correct: "final int x;" },
      { question: "How do you declare a dynamic array in Java?", options: ["int[] arr = new int[10];", "int arr[] = new int[10];", "int[] arr = new int();", "None of the above"], correct: "int[] arr = new int[10];" },
      { question: "Which of the following is not a valid data type in Java?", options: ["int", "float", "string", "char"], correct: "string" },
      { question: "Which operator is used to compare values in Java?", options: ["=", "==", "===","!"], correct: "==" },
      { question: "Which of these is used to print a message in Java?", options: ["print()", "echo()", "System.out.print()", "log()"], correct: "System.out.print()" },
      { question: "Which of the following is a correct way to catch an exception in Java?", options: ["try/catch", "try/except", "try/finally", "catch/throw"], correct: "try/catch" }
    ],
    JavaScript: [
      { question: "What does `var` declare in JavaScript?", options: ["A variable", "A constant", "A function", "An array"], correct: "A variable" },
      { question: "Which of these is used to define a function in JavaScript?", options: ["function()", "def()", "func()", "lambda()"], correct: "function()" },
      { question: "Which of the following is a falsy value in JavaScript?", options: ["0", "true", "[]", "{}"], correct: "0" },
      { question: "How do you add a comment in JavaScript?", options: ["// comment", "/* comment */", "# comment", "// comment #"], correct: "// comment" },
      { question: "Which method is used to convert a string to an integer?", options: ["parseInt()", "toInteger()", "int()", "parseNumber()"], correct: "parseInt()" },
      { question: "Which operator is used to compare both value and type in JavaScript?", options: ["==", "===", "=", "!="], correct: "===" },
      { question: "What is the correct way to declare a constant in JavaScript?", options: ["const x = 10;", "let x = 10;", "var x = 10;", "constant x = 10;"], correct: "const x = 10;" },
      { question: "Which function is used to parse a JSON string into an object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "parseJSON()"], correct: "JSON.parse()" },
      { question: "Which method is used to remove the last element from an array?", options: ["pop()", "shift()", "remove()", "delete()"], correct: "pop()" },
      { question: "Which of the following is an array method in JavaScript?", options: ["split()", "join()", "push()", "all of the above"], correct: "all of the above" }
    ],
    PHP: [
      { question: "Which of the following is the correct way to define a variable in PHP?", options: ["$variable;", "variable;", "var $variable;", "$ var variable;"], correct: "$variable;" },
      { question: "Which function is used to include a file in PHP?", options: ["include()", "require()", "import()", "include_file()"], correct: "include()" },
      { question: "How do you define a constant in PHP?", options: ["define('CONSTANT', value);", "constant('CONSTANT', value);", "const CONSTANT = value;", "define(CONSTANT, value);"], correct: "define('CONSTANT', value);" },
      { question: "Which of the following is the correct syntax for a for loop in PHP?", options: ["for (initialization; condition; increment) {}", "for (condition) { }", "for { }", "for (condition; increment) { }"], correct: "for (initialization; condition; increment) {}" },
      { question: "Which method is used to check if a variable is set in PHP?", options: ["isset()", "defined()", "isset_var()", "var_isset()"], correct: "isset()" },
      { question: "What is the correct way to define an array in PHP?", options: ["$array = array();", "$array[];", "$array = [];"], correct: "$array = array();" },
      { question: "Which of the following is used for string concatenation in PHP?", options: [".", "+", "&", ",,"], correct: "." },
      { question: "How do you start a session in PHP?", options: ["session_start();", "start_session();", "session_initialize();", "session();"], correct: "session_start();" },
      { question: "What is the function to redirect a user to another page in PHP?", options: ["redirect()", "header('Location: page.php');", "moveTo('page.php');", "goto('page.php');"], correct: "header('Location: page.php');" },
      { question: "Which of these is the correct way to comment in PHP?", options: ["// comment", "/* comment */", "# comment", "comment"], correct: "// comment" }
    ],
    Bootstrap: [
      { question: "Which class is used to create a button in Bootstrap?", options: ["btn", "button", "btn-primary", "button-class"], correct: "btn" },
      { question: "How do you add a border to a Bootstrap element?", options: ["border", "bordered", "border-class", "bordered-1"], correct: "border" },
      { question: "What does the class `container` do in Bootstrap?", options: ["Creates a centered, fixed-width container", "Creates a responsive container", "Makes the container fixed", "Creates a full-width container"], correct: "Creates a centered, fixed-width container" },
      { question: "Which class is used to center align text in Bootstrap?", options: ["text-align-center", "center-align", "text-center", "align-center"], correct: "text-center" },
      { question: "What is the correct class for creating a column in Bootstrap?", options: ["col", "column", "col-1", "column-1"], correct: "col" },
      { question: "Which of the following classes is used to create a grid layout in Bootstrap?", options: ["grid", "container", "row", "col"], correct: "row" },
      { question: "How do you make an element responsive in Bootstrap?", options: ["responsive-element", "d-block", "d-none d-sm-block", "responsive"], correct: "d-none d-sm-block" },
      { question: "Which class is used for creating a navbar in Bootstrap?", options: ["navbar", "nav", "navbar-nav", "navbar-menu"], correct: "navbar" },
      { question: "How do you create a rounded button in Bootstrap?", options: ["btn-rounded", "btn-sm", "btn-lg", "btn-circle"], correct: "btn-rounded" },
      { question: "What is the purpose of `row-cols` in Bootstrap?", options: ["To set the number of columns in a row", "To display columns in a grid", "To create equal spacing between columns", "To create multi-row columns"], correct: "To set the number of columns in a row" }
    ],    
    JQuery : [
      { question: "Which of the following is the correct way to include jQuery in an HTML file?", options: ["<script src='jquery.js'></script>", "<script src='jquery.min.js'></script>", "<link src='jquery.js'>", "<script href='jquery.js'></script>"], correct: "<script src='jquery.min.js'></script>" },
      { question: "Which jQuery method is used to hide an element?", options: ["hide()", "invisible()", "remove()", "display:none"], correct: "hide()" },
      { question: "What does `$(this)` refer to in jQuery?", options: ["The DOM element that was clicked", "The selected element", "All elements", "The current window"], correct: "The DOM element that was clicked" },
      { question: "Which method is used to add a class to an element in jQuery?", options: ["addClass()", "addClassName()", "setClass()", "addElementClass()"], correct: "addClass()" },
      { question: "What method is used to select all elements with the class `.class-name` in jQuery?", options: ["$('.class-name')", "$('.class-name').select()", "$(.class-name)", "select('.class-name')"], correct: "$('.class-name')" },
      { question: "Which jQuery function is used to trigger an event?", options: ["trigger()", "fire()", "activate()", "raise()"], correct: "trigger()" },
      { question: "Which jQuery function is used to get or set the value of an input field?", options: ["val()", "value()", "input()", "getValue()"], correct: "val()" },
      { question: "What does the jQuery method `.animate()` do?", options: ["Changes the element's style properties", "Animates an element", "Sets the element position", "Hides the element"], correct: "Animates an element" },
      { question: "Which jQuery method is used to create a new element in the DOM?", options: ["$()", "$create()", "$addElement()", "createElement()"], correct: "$()" },
      { question: "Which of the following is used to make an AJAX call in jQuery?", options: ["$.ajax()", "ajaxCall()", "ajaxRequest()", "$.request()"], correct: "$.ajax()" }
    ],    
    MySQL: [
  { question: "Which of the following is the correct command to create a database in MySQL?", options: ["CREATE DATABASE dbname;", "DB CREATE dbname;", "CREATE NEW DATABASE dbname;", "CREATE db dbname;"], correct: "CREATE DATABASE dbname;" },
  { question: "What is the default port number for MySQL?", options: ["3306", "8080", "5432", "1521"], correct: "3306" },
  { question: "Which of the following SQL commands is used to retrieve data from a table?", options: ["SELECT", "FETCH", "RETRIEVE", "GET"], correct: "SELECT" },
  { question: "Which SQL statement is used to update data in a MySQL table?", options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"], correct: "UPDATE" },
  { question: "Which clause is used in a SQL query to filter the results?", options: ["WHERE", "FILTER", "SELECT", "HAVING"], correct: "WHERE" },
  { question: "How do you sort the results of a query in MySQL?", options: ["ORDER BY", "SORT BY", "ARRANGE BY", "FILTER BY"], correct: "ORDER BY" },
  { question: "Which of the following is the correct syntax for creating a table in MySQL?", options: ["CREATE TABLE table_name (column1 type, column2 type);", "CREATE TABLE (table_name column1 type, column2 type);", "CREATE table_name (column1 type, column2 type);", "CREATE table_name columns (column1 type, column2 type);"], correct: "CREATE TABLE table_name (column1 type, column2 type);" },
  { question: "What does the `JOIN` clause do in SQL?", options: ["Combines rows from two or more tables based on a related column", "Selects specific columns", "Removes duplicate rows", "Orders the result set"], correct: "Combines rows from two or more tables based on a related column" },
  { question: "Which of these is a valid data type in MySQL?", options: ["INT", "TEXT", "VARCHAR", "All of the above"], correct: "All of the above" },
  { question: "Which SQL statement is used to delete a table in MySQL?", options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "CLEAR TABLE"], correct: "DROP TABLE" }
],
React: [
  { question: "What is the purpose of the `useState` hook in React?", options: ["To manage the component's state", "To fetch data", "To render components", "To handle events"], correct: "To manage the component's state" },
  { question: "What does JSX stand for in React?", options: ["JavaScript XML", "JavaScript Extended", "Java Syntax Extension", "None of the above"], correct: "JavaScript XML" },
  { question: "Which of the following is used to define a functional component in React?", options: ["function MyComponent() {}", "const MyComponent = () => {}", "class MyComponent extends React.Component {}", "All of the above"], correct: "All of the above" },
  { question: "What is the purpose of `componentDidMount` lifecycle method?", options: ["It runs once the component is mounted", "It is used for event handling", "It updates the component's state", "It renders the component"], correct: "It runs once the component is mounted" },
  { question: "Which hook is used for side effects in functional components?", options: ["useEffect", "useContext", "useState", "useRef"], correct: "useEffect" },
  { question: "What is the output of the following React code: `<div>{2 + 2}</div>`?", options: ["2 + 2", "4", "undefined", "null"], correct: "4" },
  { question: "What does the `key` prop do in React?", options: ["Helps React identify which items have changed, are added, or removed", "Defines the style of a component", "Triggers re-rendering of a component", "Defines the unique ID of a component"], correct: "Helps React identify which items have changed, are added, or removed" },
  { question: "How do you pass data from a parent component to a child component in React?", options: ["Using props", "Using state", "Using context", "Using Redux"], correct: "Using props" },
  { question: "Which React method is used to handle events in a component?", options: ["handleClick()", "render()", "setState()", "onClick()"], correct: "handleClick()" },
  { question: "Which of the following is true about React components?", options: ["They are reusable", "They can manage state", "They can have lifecycle methods", "All of the above"], correct: "All of the above" }
],
Nodejs: [
  { question: "Which command is used to initialize a new Node.js project?", options: ["npm init", "node init", "npm start", "node start"], correct: "npm init" },
  { question: "Which method is used to create an HTTP server in Node.js?", options: ["http.createServer()", "server.create()", "createServer()", "node.create()"], correct: "http.createServer()" },
  { question: "Which of the following is used to manage packages in Node.js?", options: ["npm", "node package manager", "npx", "node_modules"], correct: "npm" },
  { question: "How do you import a module in Node.js?", options: ["require('module')", "import('module')", "include('module')", "using('module')"], correct: "require('module')" },
  { question: "Which of the following is a core module in Node.js?", options: ["fs", "path", "http", "All of the above"], correct: "All of the above" },
  { question: "What does the `fs` module in Node.js do?", options: ["Works with file systems", "Handles HTTP requests", "Provides tools for creating servers", "Manages databases"], correct: "Works with file systems" },
  { question: "Which of the following is used to listen for HTTP requests in Node.js?", options: ["server.listen()", "http.listen()", "listen()", "require.listen()"], correct: "server.listen()" },
  { question: "Which Node.js function is used to handle errors?", options: ["throw()", "catch()", "try()", "error()"], correct: "throw()" },
  { question: "What is the default port number for an HTTP server in Node.js?", options: ["3000", "8080", "80", "5000"], correct: "3000" },
  { question: "Which framework is often used with Node.js to simplify routing?", options: ["Express", "React", "Angular", "Vue"], correct: "Express" }
],
    Django: [
      { question: "Which command is used to start a Django project?", options: ["django-admin startproject", "django start", "startproject django", "python manage.py startproject"], correct: "django-admin startproject" },
      { question: "Which file contains the settings for the Django project?", options: ["settings.py", "config.py", "settings.py.template", "django_settings.py"], correct: "settings.py" },
      { question: "What does the `migrate` command do in Django?", options: ["Creates tables in the database", "Rolls back migrations", "Generates a new app", "Creates a new user"], correct: "Creates tables in the database" },
      { question: "Which of these is used to define a model in Django?", options: ["models.Model", "models.Database", "models.Table", "models.Schema"], correct: "models.Model" },
      { question: "Which command is used to run the Django development server?", options: ["python manage.py runserver", "django runserver", "python runserver", "manage.py runserver"], correct: "python manage.py runserver" },
      { question: "Which of these is the correct way to add a static file in Django?", options: ["<script src='/static/js/script.js'>", "<script src='/media/js/script.js'>", "<script src='static/js/script.js'>", "<script src='scripts/js/script.js'>"], correct: "<script src='/static/js/script.js'>" },
      { question: "How do you create a superuser in Django?", options: ["python manage.py createsuperuser", "django-admin createuser", "python manage.py superuser", "create_superuser django"], correct: "python manage.py createsuperuser" },
      { question: "Which of the following is used to create a Django form?", options: ["forms.Form", "models.Form", "views.Form", "django.forms"], correct: "forms.Form" },
      { question: "What is used to configure URLs in Django?", options: ["urls.py", "views.py", "routes.py", "settings.py"], correct: "urls.py" },
      { question: "Which of these commands is used to collect static files for deployment in Django?", options: ["python manage.py collectstatic", "python manage.py staticfiles", "django-admin collectstatic", "manage.py collectstatic"], correct: "python manage.py collectstatic" }
    ],    
    CSS: [
      { question: "What property is used to change the background color in CSS?", options: ["background-color", "bg-color", "background", "color"], correct: "background-color" },
      { question: "Which property is used to change the font of an element in CSS?", options: ["font-family", "font-type", "font", "text-font"], correct: "font-family" },
      { question: "Which CSS property controls the layout of an element?", options: ["display", "position", "float", "clear"], correct: "display" },
      { question: "What is the correct way to add a border in CSS?", options: ["border-width: 5px;", "border: 5px solid black;", "border: solid black 5px;", "border-style: solid;"], correct: "border: 5px solid black;" },
      { question: "What is the correct syntax for making a text bold in CSS?", options: ["font-weight: bold;", "font-bold: true;", "text-style: bold;", "text-weight: bold;"], correct: "font-weight: bold;" },
      { question: "How do you make a link open in a new tab using CSS?", options: ["a { target: '_blank'; }", "a { target='_blank'; }", "a:target { '_blank'; }", "a { target: new; }"], correct: "a { target='_blank'; }" },
      { question: "Which CSS property is used to change the text color?", options: ["color", "text-color", "font-color", "text-style"], correct: "color" },
      { question: "Which of the following is used to make an element visible in CSS?", options: ["visibility: visible;", "display: show;", "visibility: true;", "display: block;"], correct: "visibility: visible;" },
      { question: "Which property is used to change the text size in CSS?", options: ["font-size", "text-size", "size", "text-font-size"], correct: "font-size" },
      { question: "How do you make a list appear horizontally in CSS?", options: ["list-style: inline;", "list-style-type: none;", "display: inline;", "display: block;"], correct: "display: inline;" }
    ],
  CSharp : [
      {
        question: "Which keyword is used to define a class in C#?",
        options: ["define", "struct", "class", "new"],
        correct: "class"
      },
      {
        question: "Which of the following is the correct entry point for a C# console application?",
        options: ["static void Main()", "public void Start()", "Main()", "public Main()"],
        correct: "static void Main()"
      },
      {
        question: "What is the default value of an uninitialized int variable in C# (in a class)?",
        options: ["0", "null", "undefined", "NaN"],
        correct: "0"
      },
      {
        question: "Which of these is used for exception handling in C#?",
        options: ["try/catch", "try/except", "throw/catch", "do/catch"],
        correct: "try/catch"
      },
      {
        question: "How do you create an object in C#?",
        options: ["Object obj = Object();", "Object obj = new Object();", "Object obj();", "Object obj = Object.new();"],
        correct: "Object obj = new Object();"
      },
      {
        question: "Which keyword is used to inherit a class in C#?",
        options: ["inherits", "base", "extends", ":"],
        correct: ":"
      },
      {
        question: "Which access modifier allows a class member to be accessed only within its class?",
        options: ["private", "public", "protected", "internal"],
        correct: "private"
      },
      {
        question: "What is the size of the 'int' type in C#?",
        options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the system"],
        correct: "4 bytes"
      },
      {
        question: "Which of the following is used to define an interface in C#?",
        options: ["interface", "abstract", "implements", "contract"],
        correct: "interface"
      },
      {
        question: "Which method is used to output text to the console in C#?",
        options: ["print()", "echo()", "System.Write()", "Console.WriteLine()"],
        correct: "Console.WriteLine()"
      }
    ]
    
  };

  // Handle topic selection
  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic);
    setCurrentQuestionIndex(0); // Reset question index when switching topics
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer
    });
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    const user = auth.currentUser;
  
    console.log("Quiz Submitted");
    console.log("Score:", score);
    console.log("User:", user);
  
    if (user) {
      const userId = user.uid;
      const resultData = {
        score: score,
        topic: topic,
        timestamp: new Date().toISOString()
      };
  
      console.log("Saving to Firebase:", resultData);
  
      saveUserScore(userId, resultData);
      alert(`Your score: ${score.toFixed(2)}%\nResult saved to Firebase.`);
    } else {
      alert("User not logged in. Cannot save score.");
    }
  };
  
  
// Function to save result
const saveUserScore = (userId, resultData) => {
  const scoreRef = push(ref(database, `results/${userId}`));
  set(scoreRef, resultData)
    .then(() => {
      console.log("✅ Score saved successfully to Firebase.");
    })
    .catch((error) => {
      console.error("❌ Error saving score to Firebase:", error);
    });
};


  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions[topic].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate score
  const calculateScore = () => {
    const totalQuestions = questions[topic].length;
    const correctAnswers = Object.keys(answers).filter(
      (key) => answers[key] === questions[topic][key].correct
    ).length;
    return (correctAnswers / totalQuestions) * 100;
  };


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
  
    // Close dropdown if clicked outside
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
    <div className="exercise-container">
      {/* Header */}
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

      <section className="exercise-section">
        <h2>Select a Topic</h2>
        <div className="topic-buttons">
          <button onClick={() => handleTopicSelect("C")}>C</button>
          <button onClick={() => handleTopicSelect("C++")}>C++</button>
          <button onClick={() => handleTopicSelect("HTML")}>HTML</button>
          <button onClick={() => handleTopicSelect("Python")}>Python</button>
          <button onClick={() => handleTopicSelect("Java")}>Java</button>
          <button onClick={() => handleTopicSelect("CSS")}>CSS</button>
          <button onClick={() => handleTopicSelect("JavaScript")}>JavaScript</button>
          <button onClick={() => handleTopicSelect("PHP")}>PHP</button>
          <button onClick={() => handleTopicSelect("CSharp")}>C#</button>
          <button onClick={() => handleTopicSelect("Bootstrap")}>Bootstrap</button>
          <button onClick={() => handleTopicSelect("JQuery")}>jQuery</button>
          <button onClick={() => handleTopicSelect("Django")}>Django</button>
          <button onClick={() => handleTopicSelect("MySQL")}>MySQL</button>
          <button onClick={() => handleTopicSelect("React")}>React</button>
          <button onClick={() => handleTopicSelect("Nodejs")}>Node.js</button>
        </div>

        {topic && (
          <div className="quiz-container">
            <h3>{topic} Quiz</h3>
            <div className="question-container">
              <h4>{questions[topic][currentQuestionIndex].question}</h4>
              <div className="options-container">
                {questions[topic][currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={
                      answers[currentQuestionIndex] === option ? "selected" : ""
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="navigation-buttons">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions[topic].length - 1}
              >
                Next
              </button>
            </div>

            <div className="submit-button">
            {currentQuestionIndex === questions[topic].length - 1 && (
  <button onClick={handleSubmitQuiz}>
  Submit Quiz
</button>

)}

            </div>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
        </div>
        <p>© 2025 FullStackAcademy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Exercise;
