import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import "./Codingtutorial.css";

const MySQLTutorial = () => {
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
          <h2>MySQL Topics</h2>
          <ul className="menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#install">Installation</a></li>
            <li><a href="#create">Creating Databases & Tables</a></li>
            <li><a href="#crud">CRUD Operations</a></li>
            <li><a href="#constraints">Constraints</a></li>
            <li><a href="#joins">Joins</a></li>
            <li><a href="#functions">Functions</a></li>
            <li><a href="#views">Views</a></li>
            <li><a href="#indexes">Indexes</a></li>
            <li><a href="#triggers">Triggers</a></li>
            <li><a href="#procedures">Stored Procedures</a></li>
            <li><a href="#transactions">Transactions</a></li>
            <li><a href="#users">User Management</a></li>
            <li><a href="#backup">Backup & Restore</a></li>
            <li><a href="#security">Security Practices</a></li>
            <li><a href="#optimization">Performance Optimization</a></li>
          </ul>
        </aside>

        <main className="tutorial-content">
          <section id="intro">
  <h2>Introduction to MySQL</h2>
  <p>MySQL is a powerful, open-source relational database management system (RDBMS) that uses Structured Query Language (SQL) for managing data. It is widely used in web applications and is known for its reliability, speed, and ease of use. MySQL is capable of handling large-scale databases and supports complex queries, transactions, and joins between tables.</p>
  
  <h3>Key Features of MySQL</h3>
  <ul>
    <li><strong>Open Source:</strong> MySQL is free and open-source, which means developers can use it, modify it, and distribute it freely.</li>
    <li><strong>Cross-Platform:</strong> MySQL is available on most operating systems, including Windows, macOS, and Linux.</li>
    <li><strong>ACID Compliant:</strong> MySQL supports ACID properties (Atomicity, Consistency, Isolation, Durability) for reliable transactions.</li>
    <li><strong>Scalability:</strong> MySQL is highly scalable, capable of managing large datasets and high-traffic applications.</li>
    <li><strong>Security:</strong> MySQL offers multiple layers of security features like user authentication, encryption, and access control.</li>
  </ul>

  <h3>MySQL Use Cases</h3>
  <ul>
    <li><strong>Web Applications:</strong> MySQL is commonly used as the database for web applications, especially those using server-side languages like PHP, Node.js, Python, and Java.</li>
    <li><strong>Data Warehousing:</strong> MySQL is suitable for data warehousing applications that require fast data retrieval and analysis.</li>
    <li><strong>Content Management Systems (CMS):</strong> Platforms like WordPress, Drupal, and Joomla rely on MySQL for storing content and managing user data.</li>
    <li><strong>Customer Relationship Management (CRM) Systems:</strong> MySQL is used in many CRM systems to manage customer data and interactions.</li>
  </ul>

</section>


<section id="install">
  <h2>Installing MySQL</h2>
  <p>MySQL can be installed using the official website or a package manager, depending on your operating system. Here are installation instructions for Linux, macOS, and Windows.</p>

  <h3>Installing MySQL on Linux (Ubuntu/Debian)</h3>
  <p>Use the following commands to install MySQL on a Debian-based Linux distribution (like Ubuntu):</p>
  <pre>{`sudo apt update
sudo apt install mysql-server`}</pre>
  <p>Once the installation is complete, you can start the MySQL service:</p>
  <pre>{`sudo service mysql start`}</pre>
  <p>To enter the MySQL shell, run:</p>
  <pre>{`mysql -u root -p`}</pre>
  <p>This will prompt you for the root user password.</p>

  <h3>Installing MySQL on macOS</h3>
  <p>On macOS, you can install MySQL using Homebrew:</p>
  <pre>{`brew install mysql`}</pre>
  <p>After installation, start MySQL with:</p>
  <pre>{`brew services start mysql`}</pre>
  <p>To access MySQL, use:</p>
  <pre>{`mysql -u root -p`}</pre>

  <h3>Installing MySQL on Windows</h3>
  <p>On Windows, you can download the MySQL installer from the official website: <a href="https://dev.mysql.com/downloads/installer/">MySQL Installer</a>. Follow the installation steps in the installer to install MySQL on your system. After installation, you can access MySQL through the command prompt or MySQL Workbench.</p>

  <h3>Verifying MySQL Installation</h3>
  <p>Once MySQL is installed, you can check its version to confirm that it is running properly:</p>
  <pre>{`mysql --version`}</pre>
  <p>This will return the version of MySQL installed on your system.</p>
</section>


<section id="create">
  <h2>Creating Databases & Tables in MySQL</h2>
  <p>After installing MySQL, you can begin creating databases and tables to store your data. Let’s start by creating a database and a table for storing products in an e-commerce store.</p>

  <h3>Creating a Database</h3>
  <p>To create a new database, you use the <code>CREATE DATABASE</code> statement:</p>
  <pre>{`CREATE DATABASE shop;`}</pre>
  <p>This creates a database named "shop". You can then switch to the "shop" database using:</p>
  <pre>{`USE shop;`}</pre>
  
  <h3>Creating a Table</h3>
  <p>Now, let’s create a table named <code>products</code> to store information about products in the shop, such as the product ID, name, and price:</p>
  <pre>{`CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);`}</pre>
  <p>In this statement:</p>
  <ul>
    <li><strong>id:</strong> An integer column that auto-increments with each new product entry. This is set as the primary key of the table.</li>
    <li><strong>name:</strong> A string column to store the product name, limited to 100 characters.</li>
    <li><strong>price:</strong> A decimal column to store the price of the product with two decimal places.</li>
  </ul>

  <h3>Verifying Table Creation</h3>
  <p>To verify that the table was created successfully, you can run the following command to list all tables in the current database:</p>
  <pre>{`SHOW TABLES;`}</pre>
  <p>This will show a list of all tables in the "shop" database. You should see the "products" table listed.</p>

  <h3>Adding Data to the Table</h3>
  <p>Let’s insert a product into the <code>products</code> table:</p>
  <pre>{`INSERT INTO products (name, price) 
VALUES ('Laptop', 1000.00);`}</pre>
  <p>This will insert a new product with the name "Laptop" and a price of 1000.00 into the table.</p>

  <h3>Viewing Data</h3>
  <p>To see the data you’ve inserted, use the following query:</p>
  <pre>{`SELECT * FROM products;`}</pre>
  <p>This will display all records in the <code>products</code> table.</p>
</section>


          <section id="crud">
  <h2>CRUD Operations</h2>
  <p>CRUD stands for Create, Read, Update, and Delete. These are the four basic operations you can perform on any database. Let’s dive into each operation with examples:</p>

  <h3>Create Operation (INSERT)</h3>
  <pre>{`INSERT INTO products (name, price) 
VALUES ('Laptop', 1000.00);`}</pre>
  <p>The <code>INSERT INTO</code> statement adds a new row into the `products` table. In this case, it adds a product with the name "Laptop" and a price of 1000.00.</p>

  <h3>Read Operation (SELECT)</h3>
  <pre>{`SELECT * FROM products;`}</pre>
  <p>The <code>SELECT</code> statement retrieves all rows from the `products` table. You can also filter data using the <code>WHERE</code> clause.</p>

  <h3>Update Operation (UPDATE)</h3>
  <pre>{`UPDATE products 
SET price = 950.00 
WHERE name = 'Laptop';`}</pre>
  <p>The <code>UPDATE</code> statement is used to modify existing records. In this case, the price of the product "Laptop" is updated to 950.00.</p>

  <h3>Delete Operation (DELETE)</h3>
  <pre>{`DELETE FROM products 
WHERE id = 1;`}</pre>
  <p>The <code>DELETE</code> statement removes rows from the table. In this case, it deletes the product with the ID of 1 from the `products` table.</p>
</section>


<section id="constraints">
  <h2>Constraints in MySQL</h2>
  <p>Constraints are used in SQL to specify the rules for data in a table. They help ensure data integrity and accuracy by restricting the types of data that can be inserted, updated, or deleted in a database.</p>

  <h3>Types of Constraints</h3>
  <p>MySQL provides several types of constraints, each serving a specific purpose:</p>

  <ul>
    <li><strong>PRIMARY KEY</strong></li>
    <li><strong>FOREIGN KEY</strong></li>
    <li><strong>NOT NULL</strong></li>
    <li><strong>UNIQUE</strong></li>
    <li><strong>CHECK</strong></li>
    <li><strong>DEFAULT</strong></li>
  </ul>

  <h3>1. PRIMARY KEY</h3>
  <p>The <code>PRIMARY KEY</code> constraint uniquely identifies each record in a table. A primary key must contain unique values and cannot contain <code>NULL</code> values. A table can have only one primary key, which can consist of one or multiple columns (a composite key).</p>
  <pre>{`CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  PRIMARY KEY (user_id)
);`}</pre>
  <p>In this example, <code>user_id</code> is the primary key, ensuring each user has a unique ID.</p>

  <h3>2. FOREIGN KEY</h3>
  <p>The <code>FOREIGN KEY</code> constraint ensures that a column (or a combination of columns) in one table matches the primary key or unique key in another table. It is used to establish and enforce a link between the data in two tables. Foreign keys help maintain referential integrity by ensuring that records are consistent across related tables.</p>
  <pre>{`CREATE TABLE orders (
  order_id INT AUTO_INCREMENT,
  user_id INT,
  order_date DATE,
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);`}</pre>
  <p>Here, <code>user_id</code> in the <code>orders</code> table is a foreign key that references the <code>user_id</code> in the <code>users</code> table. This ensures that every order is associated with a valid user.</p>

  <h3>3. NOT NULL</h3>
  <p>The <code>NOT NULL</code> constraint ensures that a column cannot have a <code>NULL</code> value. This is used when you want to make sure that every record has a valid value in that column.</p>
  <pre>{`CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  hire_date DATE
);`}</pre>
  <p>In this example, the <code>first_name</code> and <code>last_name</code> columns cannot be left empty, ensuring that every employee has a first and last name.</p>

  <h3>4. UNIQUE</h3>
  <p>The <code>UNIQUE</code> constraint ensures that all values in a column are distinct. Unlike the primary key, a table can have multiple unique constraints. A column defined with a unique constraint can accept <code>NULL</code> values, but the <code>NULL</code> values must be unique.</p>
  <pre>{`CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  phone_number VARCHAR(15) UNIQUE
);`}</pre>
  <p>In this example, the <code>email</code> and <code>phone_number</code> columns must contain unique values, meaning no two customers can have the same email or phone number.</p>

  <h3>5. CHECK</h3>
  <p>The <code>CHECK</code> constraint ensures that values in a column meet a specific condition. It allows you to define conditions that must be true for the data to be inserted or updated in the table. Note that in MySQL, the <code>CHECK</code> constraint is only enforced in version 8.0.16 and above.</p>
  <pre>{`CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  salary DECIMAL(10, 2),
  CHECK (salary >= 3000)
);`}</pre>
  <p>This table ensures that the <code>salary</code> value is always greater than or equal to 3000. If an attempt is made to insert or update a salary lower than 3000, it will be rejected.</p>

  <h3>6. DEFAULT</h3>
  <p>The <code>DEFAULT</code> constraint provides a default value for a column when no value is specified during insertion. This is useful when you want to insert a default value for a column if no specific value is provided.</p>
  <pre>{`CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2) DEFAULT 0.00
);`}</pre>
 <p>In this example, if no value is provided for the <code>price</code> column during an insert operation, MySQL will assign a default value of <code>0.00</code>.</p>
 
  <h3>Example: Combining Multiple Constraints</h3>
  <p>You can also combine multiple constraints on a single column:</p>
  <pre>{`CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  hire_date DATE,
  salary DECIMAL(10, 2) CHECK (salary >= 3000)
);`}</pre>
  <p>In this example, the <code>username</code> and <code>email</code> columns are both <code>NOT NULL</code> and <code>UNIQUE</code>, and the <code>salary</code> column is required to be greater than or equal to 3000 using the <code>CHECK</code> constraint.</p>
  
</section>

          <section id="joins">
  <h2>Joins</h2>
  <p>Joins are used to combine rows from two or more tables based on a related column between them. MySQL supports different types of joins:</p>
  
  <h3>Types of Joins</h3>
  <ul>
    <li><strong>INNER JOIN:</strong> Returns only the rows with matching values in both tables.</li>
    <li><strong>LEFT JOIN (or LEFT OUTER JOIN):</strong> Returns all rows from the left table, along with matching rows from the right table.</li>
    <li><strong>RIGHT JOIN (or RIGHT OUTER JOIN):</strong> Returns all rows from the right table, along with matching rows from the left table.</li>
    <li><strong>FULL OUTER JOIN:</strong> Returns all rows when there is a match in one of the tables.</li>
  </ul>

  <h3>INNER JOIN Example</h3>
  <pre>{`SELECT o.id, c.name FROM orders o
JOIN customers c ON o.customer_id = c.id;`}</pre>
  <p>This query selects the `id` from the `orders` table and the `name` from the `customers` table where the `customer_id` in the `orders` table matches the `id` in the `customers` table.</p>

  <h3>LEFT JOIN Example</h3>
  <pre>{`SELECT o.id, c.name FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id;`}</pre>
  <p>This query selects all orders, and if there is no matching customer, it still shows the order, with the `name` field being `NULL` for unmatched rows.</p>

  <h3>Join with Multiple Tables Example</h3>
  <pre>{`SELECT o.id, c.name, p.name FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id;`}</pre>
  <p>This query joins three tables: `orders`, `customers`, and `products`, fetching the order `id`, customer `name`, and product `name` for each order.</p>
</section>


<section id="functions">
  <h2>Functions in MySQL</h2>
  <p>MySQL provides a variety of built-in functions that allow you to perform operations on your data, such as calculating aggregate values, manipulating strings, and working with dates and times.</p>

  <h3>Aggregate Functions</h3>
  <p>Aggregate functions perform a calculation on a set of values and return a single value.</p>
  <ul>
    <li><strong>COUNT(*):</strong> Returns the number of rows in a table or group.</li>
    <li><strong>AVG(price):</strong> Returns the average value of a numeric column.</li>
    <li><strong>SUM(quantity):</strong> Returns the sum of a numeric column.</li>
  </ul>
  <pre>{`SELECT COUNT(*) FROM products;
SELECT AVG(price) FROM products;
SELECT SUM(quantity) FROM orders;`}</pre>

  <h3>String Functions</h3>
  <p>MySQL offers several functions for working with strings.</p>
  <ul>
    <li><strong>CONCAT(first, ' ', last):</strong> Concatenates two or more strings together.</li>
    <li><strong>UPPER(name):</strong> Converts a string to uppercase.</li>
    <li><strong>LOWER(name):</strong> Converts a string to lowercase.</li>
  </ul>
  <pre>{`SELECT CONCAT(first_name, ' ', last_name) FROM employees;
SELECT UPPER(name) FROM products;`}</pre>

  <h3>Datetime Functions</h3>
  <p>MySQL includes functions for manipulating dates and times.</p>
  <ul>
    <li><strong>NOW():</strong> Returns the current date and time.</li>
    <li><strong>CURDATE():</strong> Returns the current date.</li>
    <li><strong>DATE_ADD(date, INTERVAL 1 DAY):</strong> Adds a specified time interval to a date.</li>
  </ul>
  <pre>{`SELECT NOW();
SELECT CURDATE();
SELECT DATE_ADD('2025-04-06', INTERVAL 1 DAY);`}</pre>
</section>


<section id="views">
  <h2>Views in MySQL</h2>
  <p>A view is a virtual table based on the result of a SELECT query. Views simplify complex queries, improve security, and enhance the modularity of the database design.</p>

  <h3>Creating a View</h3>
  <p>To create a view, use the <code>CREATE VIEW</code> statement. A view can be used just like a table in SELECT queries.</p>
  <pre>{`CREATE VIEW product_summary AS
SELECT name, price FROM products;`}</pre>
  <p>This view simplifies querying the `products` table by only selecting the product name and price.</p>

  <h3>Querying a View</h3>
  <pre>{`SELECT * FROM product_summary;`}</pre>

  <h3>Updating Views</h3>
  <p>In some cases, you can update a view, but it must be updatable (i.e., not based on multiple tables or complex operations). If the view is updatable, you can use the same INSERT, UPDATE, or DELETE statements as for regular tables.</p>
</section>


<section id="indexes">
  <h2>Indexes in MySQL</h2>
  <p>Indexes improve the performance of database queries by allowing MySQL to find rows more quickly. An index can be created on one or more columns in a table.</p>

  <h3>Creating an Index</h3>
  <p>Indexes are created using the <code>CREATE INDEX</code> statement:</p>
  <pre>{`CREATE INDEX idx_product_name ON products(name);`}</pre>
  <p>This index will speed up queries that filter on the `name` column of the `products` table.</p>

  <h3>Using Indexes</h3>
  <p>When a query uses a column that has an index, MySQL can retrieve the results much faster.</p>
  <pre>{`SELECT * FROM products WHERE name = 'Laptop';`}</pre>
  
  <h3>Dropping an Index</h3>
  <p>To remove an index, use the <code>DROP INDEX</code> statement:</p>
  <pre>{`DROP INDEX idx_product_name ON products;`}</pre>
</section>


<section id="triggers">
  <h2>Triggers in MySQL</h2>
  <p>A trigger is a set of SQL statements that are automatically executed (or "triggered") when a specific event occurs in a table or view, such as an INSERT, UPDATE, or DELETE operation.</p>

  <h3>Creating a Trigger</h3>
  <pre>{`CREATE TRIGGER before_insert
BEFORE INSERT ON products
FOR EACH ROW
SET NEW.created_at = NOW();`}</pre>
  <p>This trigger sets the <code>created_at</code> column to the current time whenever a new row is inserted into the `products` table.</p>

  <h3>Trigger Events</h3>
  <ul>
    <li><strong>BEFORE INSERT:</strong> Executes before an insert operation.</li>
    <li><strong>AFTER INSERT:</strong> Executes after an insert operation.</li>
    <li><strong>BEFORE UPDATE:</strong> Executes before an update operation.</li>
    <li><strong>AFTER UPDATE:</strong> Executes after an update operation.</li>
    <li><strong>BEFORE DELETE:</strong> Executes before a delete operation.</li>
    <li><strong>AFTER DELETE:</strong> Executes after a delete operation.</li>
  </ul>
</section>

<section id="procedures">
  <h2>Stored Procedures in MySQL</h2>
  <p>A stored procedure is a set of SQL statements that can be stored in the database and executed whenever needed. Stored procedures improve code reusability and efficiency.</p>

  <h3>Creating a Stored Procedure</h3>
  <pre>{`DELIMITER //
CREATE PROCEDURE GetAllProducts()
BEGIN
  SELECT * FROM products;
END //
DELIMITER ;`}</pre>
  <p>This procedure retrieves all products from the `products` table.</p>

  <h3>Executing a Stored Procedure</h3>
  <pre>{`CALL GetAllProducts();`}</pre>
</section>


<section id="transactions">
  <h2>Transactions in MySQL</h2>
  <p>A transaction is a way to execute multiple queries as a single unit of work. If any query fails, the entire transaction can be rolled back to maintain data integrity.</p>

  <h3>Starting a Transaction</h3>
  <pre>{`START TRANSACTION;`}</pre>
  
  <h3>Committing a Transaction</h3>
  <pre>{`COMMIT;`}</pre>

  <h3>Rolling Back a Transaction</h3>
  <pre>{`ROLLBACK;`}</pre>

  <h3>Example</h3>
  <pre>{`START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`}</pre>
  <p>This example transfers money from one account to another, and if any part of the transaction fails, it can be rolled back to maintain consistency.</p>
</section>

<section id="users">
  <h2>User Management in MySQL</h2>
  <p>MySQL allows you to create, manage, and assign privileges to users. Proper user management ensures the security and integrity of the database.</p>

  <h3>Creating a User</h3>
  <pre>{`CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';`}</pre>

  <h3>Granting Privileges</h3>
  <pre>{`GRANT ALL PRIVILEGES ON shop.* TO 'admin'@'localhost';`}</pre>
  <p>This grants all privileges on the `shop` database to the `admin` user.</p>

  <h3>Revoking Privileges</h3>
  <pre>{`REVOKE ALL PRIVILEGES ON shop.* FROM 'admin'@'localhost';`}</pre>
</section>

<section id="backup">
  <h2>Backup & Restore in MySQL</h2>
  <p>Backing up and restoring MySQL databases is essential for data protection and disaster recovery. You can use <code>mysqldump</code> to create backups and <code>mysql</code> to restore them.</p>

  <h3>Backing Up a Database</h3>
  <pre>{`mysqldump -u root -p shop > shop_backup.sql`}</pre>

  <h3>Restoring a Database</h3>
  <pre>{`mysql -u root -p shop < shop_backup.sql`}</pre>
</section>


<section id="security">
  <h2>Security Practices in MySQL</h2>
  <p>To ensure the security of your MySQL database, follow these best practices:</p>
  <ul>
    <li><strong>Use Strong Passwords:</strong> Always use strong passwords for MySQL accounts to prevent unauthorized access.</li>
    <li><strong>Disable Remote Root Access:</strong> Prevent root access from remote machines to avoid security risks.</li>
    <li><strong>Keep MySQL Updated:</strong> Regularly update MySQL to apply security patches and improvements.</li>
    <li><strong>Use SSL for Connections:</strong> Use SSL encryption to secure data transmitted between the client and MySQL server.</li>
  </ul>
</section>


<section id="optimization">
  <h2>Performance Optimization in MySQL</h2>
  <p>Optimizing your MySQL queries and database design can significantly improve the performance of your application. Below are some key optimization techniques:</p>
  <ul>
    <li><strong>Normalize Tables:</strong> Use normalization to reduce redundancy and improve data integrity.</li>
    <li><strong>Use Indexes Wisely:</strong> Create indexes on columns that are frequently queried or used in JOINs.</li>
    <li><strong>Optimize Queries:</strong> Use the <code>EXPLAIN</code> command to analyze and optimize query execution plans.</li>
    <li><strong>Optimize Database Configuration:</strong> Tune the MySQL configuration to better suit your hardware and workload.</li>
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

export default MySQLTutorial;

