import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./Codingtutorial.css";

const DjangoTutorial = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInitial, setUserInitial] = useState("U");
  const dropdownRef = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName || user.email;
        setUserInitial(name.charAt(0).toUpperCase());
      } else {
        navigate("/login");
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => navigate("/home"));
  };
  return (
    <div className="home-container">
      <header className="navbar">
              <div className="nav-left">
                <ul className="logo">
                  <li><Link to="/User" className="logo-link">FullStackAcademy</Link></li>
                  <li><Link to="/tutorial">Tutorials</Link></li>
                  <li><Link to="/exercise">Exercises</Link></li>
                  <li><Link to="/LearnmorePage">Services</Link></li>
                </ul>
              </div>
      
              <div className="auth-buttons" ref={dropdownRef}>
                <div className="user-icon" onClick={() => setShowDropdown(prev => !prev)}>
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
            {/* Layout: Sidebar + Content */}
        <div class="main-layout">
            <aside class="sidebar">
                <h3>Django Topics</h3>
                <ul>
                    <li><a href="#intro">Introduction</a></li>
                    <li><a href="#setup">Installation & Setup</a></li>
                    <li><a href="#project">Creating a Project</a></li>
                    <li><a href="#app">Creating an App</a></li>
                    <li><a href="#views">Views</a></li>
                    <li><a href="#urls">URL Routing</a></li>
                    <li><a href="#templates">Templates</a></li>
                    <li><a href="#models">Models</a></li>
                    <li><a href="#admin">Admin Panel</a></li>
                    <li><a href="#forms">Forms</a></li>
                    <li><a href="#auth">Authentication</a></li>
                    <li><a href="#api">REST APIs</a></li>
                </ul>
            </aside>

            {/*Main Tutorial Content */}
            <main class="tutorial-content">
                {/*Django Introduction */}
                <section id="intro">
  <h2>Django Introduction</h2>
  <p>
    Django is a powerful and robust high-level Python web framework that enables developers to build secure, scalable, and maintainable web applications quickly. Its philosophy is based on the idea of "Don't Repeat Yourself" (DRY) and "Rapid Development", making it a favorite for startups, enterprises, and solo developers alike. Built by experienced developers and released as open-source in 2005, Django abstracts many of the complexities of web development by providing a well-structured system that includes everything from routing to templating, from form handling to security, and even an automatic admin panel.
  </p>

  <p>
    At its core, Django is designed to make the lives of developers easier. It includes an Object-Relational Mapper (ORM) that maps Python objects to database tables, a URL dispatcher, a powerful templating engine, built-in authentication, and much more. It is often described as “the web framework for perfectionists with deadlines” because it allows developers to build feature-rich applications with minimal effort and maximum consistency.
  </p>

  <p>
    Django is built on the Model-Template-View (MTV) architectural pattern. While this is similar in spirit to the more widely known Model-View-Controller (MVC) design pattern, Django’s terminology reflects the framework's specific philosophy:
    <ul>
      <li><strong>Model:</strong> Handles the data layer, representing the data structure through Python classes and interfacing with the database.</li>
      <li><strong>Template:</strong> Manages the presentation layer, defining how data is displayed to the user using Django’s templating language.</li>
      <li><strong>View:</strong> Contains the business logic, pulling in data from models and rendering it using templates.</li>
    </ul>
  </p>

  <p>
    Django’s extensive documentation, thriving community, and rich ecosystem of packages (such as Django REST Framework for APIs) make it highly approachable for beginners and powerful enough for advanced use cases. Many top-tier websites and platforms, such as Instagram, Pinterest, Disqus, and Mozilla, have been built (or are still running) using Django.
  </p>

  <h3>Historical Background</h3>
  <p>
    Django was originally developed in 2003 by Adrian Holovaty and Simon Willison at the Lawrence Journal-World newspaper. The aim was to create a content-driven site management system that was both fast and efficient for journalists to update and manage. It was open-sourced in 2005 and has since been maintained by the Django Software Foundation (DSF), a non-profit organization that supports the growth and sustainability of the Django project.
  </p>

  <p>
    Over the years, Django has evolved to adopt new technologies and standards, such as supporting asynchronous programming, database migrations, improved security features, and full compatibility with Python 3.x. Its releases are regularly scheduled and version-controlled, ensuring stability and predictability for developers building long-term projects.
  </p>

  <h3>Core Features of Django</h3>
  <ul>
    <li><strong>Admin Interface:</strong> An automatically-generated backend for managing models and data. Highly customizable and extremely powerful for internal use cases.</li>
    <li><strong>ORM (Object-Relational Mapper):</strong> Allows seamless database interaction using Python code, abstracting SQL and providing a high-level API.</li>
    <li><strong>URL Dispatcher:</strong> Routes URLs to views using regular expressions or path converters in a clean and manageable way.</li>
    <li><strong>Template Engine:</strong> Uses its own templating language to dynamically generate HTML content.</li>
    <li><strong>Security:</strong> Built-in protection against XSS, CSRF, SQL injection, clickjacking, and more.</li>
    <li><strong>Scalability:</strong> Easily handles large volumes of traffic and can be integrated with caching, load balancing, and database replication.</li>
    <li><strong>Extensibility:</strong> Includes a rich ecosystem of third-party packages and middleware for adding functionality like APIs, authentication systems, search, messaging, etc.</li>
    <li><strong>Internationalization:</strong> Tools for building multi-lingual websites with built-in localization support.</li>
    <li><strong>Testing:</strong> Comes with a built-in testing framework that integrates with Python's unittest module.</li>
  </ul>

  <h3>Why Use Django?</h3>
  <p>
    Django is preferred by many developers for a number of compelling reasons. It reduces the time needed to build complex applications, enforces best practices out of the box, and ensures that developers write code that is clean, maintainable, and secure. Whether you are building a blog, a corporate portal, a RESTful API, or an e-commerce site, Django provides the tools you need without requiring extensive boilerplate code.
  </p>

  <ul>
    <li><strong>Rapid Development:</strong> Django allows developers to move from idea to implementation incredibly quickly.</li>
    <li><strong>Batteries Included:</strong> Comes with nearly everything needed to build a full-fledged site right out of the box.</li>
    <li><strong>Robust Documentation:</strong> Offers some of the most comprehensive documentation of any open-source project.</li>
    <li><strong>Large Community:</strong> A massive community of developers means abundant tutorials, packages, and support.</li>
    <li><strong>Scalable & Secure:</strong> Suitable for both small-scale apps and large-scale systems, with built-in security best practices.</li>
    <li><strong>Versatile:</strong> From CMS platforms to scientific computing dashboards to mobile backends, Django can do it all.</li>
  </ul>

  <h3>Use Cases for Django</h3>
  <p>
    Django is not limited to one kind of web application. Its versatility allows it to serve a wide range of industries and purposes, including:
  </p>
  <ul>
    <li><strong>News and Content Management Systems:</strong> Perfect for editorial workflows and content-heavy websites.</li>
    <li><strong>eCommerce:</strong> Handles product listings, shopping carts, secure payments, and more.</li>
    <li><strong>Scientific Research:</strong> Powers dashboards, data analysis tools, and visualization platforms.</li>
    <li><strong>FinTech:</strong> Reliable for building secure, transaction-based platforms.</li>
    <li><strong>Social Networks:</strong> Facilitates building scalable user systems with feeds, notifications, and real-time updates.</li>
  </ul>

  <h3>Comparison with Other Frameworks</h3>
  <p>
    Django often gets compared to other popular web frameworks such as Flask (Python), Ruby on Rails (Ruby), Laravel (PHP), Express.js (Node.js), and ASP.NET (C#). Here's a quick comparison:
  </p>
  <ul>
    <li><strong>Django vs Flask:</strong> Flask is minimalist and great for microservices or smaller apps, but Django is better for projects needing a built-in admin, ORM, and scalable architecture.</li>
    <li><strong>Django vs Rails:</strong> Both offer batteries-included approaches; Django has more predictable behavior and Python syntax, while Rails is more opinionated and dynamic.</li>
    <li><strong>Django vs Laravel:</strong> Laravel is a PHP framework with similar features, but Django leverages the Python ecosystem which many developers prefer for modern development.</li>
    <li><strong>Django vs Express:</strong> Express offers freedom and flexibility, but Django reduces boilerplate with conventions and structure.</li>
  </ul>

  <h3>Conclusion</h3>
  <p>
    Django stands out as one of the most complete and reliable frameworks for web development today. Whether you're building a prototype or a production-grade enterprise application, Django empowers developers to write clean, maintainable code and ship features quickly. With its rich ecosystem, built-in security, and seamless integration of modern web features, Django remains the go-to choice for many developers across the world.
  </p>
  <p>
    In this tutorial series, you will learn how to set up Django, create and manage projects, develop custom apps, build forms, work with models and templates, secure your application, and even expose data via REST APIs using Django REST Framework. Let's dive in!
  </p>
</section>

                 {/*Installation & Setup */}
 
<section id="setup">
  <h2>Installation & Setup</h2>

  <p>
    Setting up Django properly is the crucial first step toward building robust web applications with this powerful framework. A clean, consistent environment ensures fewer bugs, smoother development, and greater productivity. In this section, you’ll learn everything from installing Python and Django to configuring virtual environments, understanding project scaffolding, and launching your first development server. Whether you are working on Windows, macOS, or Linux, these instructions will guide you through best practices for installing Django and ensuring your environment is scalable and secure.
  </p>

  <h3>1. Installing Python</h3>
  <p>
    Django is built on Python, so the first requirement is to install Python (version 3.8 or later is recommended). Visit <a href="https://www.python.org/downloads/" target="_blank">python.org/downloads</a> and download the latest stable release for your operating system. Ensure Python is added to your system’s PATH so you can access it via the terminal or command prompt.
  </p>
  <pre>{`# Verify Python installation
python --version

# or on some systems
python3 --version`}</pre>

  <h3>2. Setting Up pip and pip3</h3>
  <p>
    pip is Python’s package installer, used to install and manage packages such as Django. Most Python installations come with pip, but if not, you can manually install it:
  </p>
  <pre>{`# Check if pip is available
pip --version

# or
python -m pip --version`}</pre>

  <p>If pip is not installed, you can install it manually by downloading get-pip.py and running:</p>
  <pre>{`python get-pip.py`}</pre>

  <h3>3. Creating a Virtual Environment (Best Practice)</h3>
  <p>
    A virtual environment is an isolated Python environment that allows you to manage dependencies for different projects separately. This prevents version conflicts and keeps your system Python installation clean.
  </p>
  <pre>{`# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\\Scripts\\activate

# On Unix or MacOS
source venv/bin/activate`}</pre>

  <p>Once activated, you will see your environment name in the terminal prompt. This means that pip will now install packages in your isolated environment.</p>

  <h3>4. Installing Django</h3>
  <p>
    With your virtual environment activated, you can now install Django using pip. The official package is available from the Python Package Index (PyPI).
  </p>
  <pre>{`pip install django`}</pre>

  <p>To confirm installation:</p>
  <pre>{`django-admin --version`}</pre>

  <p>
    This command will output the installed version of Django. It’s good practice to freeze your dependencies in a requirements file so others can replicate your environment:
  </p>
  <pre>{`pip freeze > requirements.txt`}</pre>

  <h3>5. Starting a Django Project</h3>
  <p>
    Django provides a command-line tool called <code>django-admin</code> to help you bootstrap a new project. You can name your project anything you like, such as <code>mysite</code>:
  </p>
  <pre>{`django-admin startproject mysite`}</pre>

  <p>This creates a new directory called <code>mysite</code> with the following structure:</p>
  <pre>{`
mysite/
├── manage.py
├── mysite/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
`}</pre>

  <p>Here's what each file does:</p>
  <ul>
    <li><strong>manage.py</strong> – A command-line utility for managing your project.</li>
    <li><strong>settings.py</strong> – Project configuration (databases, apps, middleware).</li>
    <li><strong>urls.py</strong> – The URL dispatcher that maps URLs to views.</li>
    <li><strong>wsgi.py / asgi.py</strong> – Entry-points for deploying your app on servers.</li>
  </ul>

  <h3>6. Running the Development Server</h3>
  <p>
    Navigate into your new project directory and run the development server:
  </p>
  <pre>{`
cd mysite
python manage.py runserver
`}</pre>

  <p>
    You’ll see output similar to:
  </p>
  <pre>{`
Watching for file changes with StatReloader
Performing system checks...
Starting development server at http://127.0.0.1:8000/
`}</pre>

  <p>
    Open a browser and visit <code>http://127.0.0.1:8000/</code>. You’ll see the Django welcome screen — your first Django application is now live!
  </p>

  <h3>7. Common Django CLI Commands</h3>
  <p>Django includes a powerful set of command-line tools:</p>
  <pre>{`
# Start a new app
python manage.py startapp blog

# Make database migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Open shell
python manage.py shell
`}</pre>

  <h3>8. Understanding Debug Mode</h3>
  <p>
    By default, Django runs in DEBUG mode (see <code>settings.py</code>). This enables detailed error messages and stack traces. Never leave DEBUG enabled in production — it can expose sensitive information.
  </p>
  <pre>{`DEBUG = True  # Change to False for production`}</pre>

  <h3>9. Installing Django with Other Tools</h3>
  <p>You can also install Django using other methods depending on your workflow:</p>
  <ul>
    <li><strong>pipenv:</strong> Combines pip and virtualenv in one.</li>
    <li><strong>Poetry:</strong> A modern dependency manager for Python.</li>
    <li><strong>Docker:</strong> Containerize your Django app for consistency and portability.</li>
  </ul>

  <pre>{`
# Using pipenv
pip install pipenv
pipenv install django
pipenv shell

# Using Poetry
poetry add django
`}</pre>

  <h3>10. IDE Recommendations</h3>
  <p>Popular IDEs for Django development include:</p>
  <ul>
    <li>PyCharm (Professional edition has Django support)</li>
    <li>VS Code with Python + Django extensions</li>
    <li>Sublime Text with Python plugins</li>
  </ul>

  <h3>11. Best Practices for Setup</h3>
  <ul>
    <li>Use version control (Git) to track changes from the start.</li>
    <li>Keep secrets (like API keys) in environment variables or .env files.</li>
    <li>Separate development and production settings (e.g., use a <code>settings/</code> folder).</li>
    <li>Use `requirements.txt` or `Pipfile` to manage dependencies.</li>
    <li>Keep a README.md explaining how to install and run the project.</li>
  </ul>

  <h3>12. Conclusion</h3>
  <p>
    Setting up Django properly is the foundation for a productive development experience. From installing Python to running your first server, each step contributes to a clean, scalable environment. This setup is not just about starting — it's about preparing for future growth, collaboration, and deployment. Now that your project is live and running, you’re ready to dive into Django’s core functionality — starting with how to create apps and define their responsibilities.
  </p>
</section>


<section id="project">
  <h2>Creating a Django Project</h2>

  <p>
    Now that you’ve successfully installed Django and configured your development environment, the next step is to **create a Django project** — the starting point of your web application. A Django project is a collection of settings and configurations for an instance of Django, typically consisting of apps, URL routing, settings, templates, static files, and more. Whether you're building a blog, an e-commerce platform, or an internal dashboard, your journey always begins by creating a project that serves as the container for all subsequent components.
  </p>

  <h3>1. What is a Django Project?</h3>
  <p>
    A Django project is the highest-level organizational unit in a Django application. Think of it as the master controller — it knows how to connect different parts (apps) together and provides global configurations such as database settings, installed apps, middleware, time zones, languages, and security options. A Django project typically manages:
  </p>
  <ul>
    <li>Global configuration and settings</li>
    <li>Shared URLs and routing logic</li>
    <li>Static and media file management</li>
    <li>Wiring together multiple Django apps</li>
  </ul>

  <h3>2. Starting a Project with django-admin</h3>
  <p>
    To create a new Django project, use the `django-admin` command-line tool. Make sure your virtual environment is activated before running this command:
  </p>
  <pre>{`django-admin startproject myproject`}</pre>

  <p>This will generate a new folder named <code>myproject</code> with the following structure:</p>
  <pre>{`
myproject/
├── manage.py
└── myproject/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── asgi.py
    └── wsgi.py
`}</pre>

  <h4>Let’s break this down:</h4>
  <ul>
    <li><strong>manage.py</strong>: A command-line utility for managing the Django project. You’ll use this for running servers, migrations, and shell commands.</li>
    <li><strong>myproject/</strong>: An inner directory with the same name as your project. It contains your project’s settings, URL configuration, and application entry points.</li>
    <li><strong>settings.py</strong>: Global configuration for apps, databases, middleware, etc.</li>
    <li><strong>urls.py</strong>: Main URL routing table for the project.</li>
    <li><strong>asgi.py / wsgi.py</strong>: Entry-points for deployment using ASGI (for async) or WSGI (traditional sync apps).</li>
  </ul>

  <h3>3. Running Your New Project</h3>
  <p>
    Navigate into the new project directory and run the development server to verify everything works:
  </p>
  <pre>{`
cd myproject
python manage.py runserver
`}</pre>
  <p>Open your browser and go to <code>http://127.0.0.1:8000/</code>. You’ll see the default Django welcome page, which confirms the project is up and running!</p>

  <h3>4. The Role of manage.py</h3>
  <p>
    The <code>manage.py</code> file is your gateway into Django’s internal utilities. It wraps the <code>django-admin</code> tool and adds project-specific settings to your environment.
  </p>
  <pre>{`
# Common manage.py commands
python manage.py runserver        # Start the development server
python manage.py migrate          # Apply migrations to the database
python manage.py createsuperuser  # Create an admin user
python manage.py startapp appname # Create a new app
`}</pre>

  <h3>5. Customizing Project Settings</h3>
  <p>
    The <code>settings.py</code> file is the heart of your project configuration. It includes:
  </p>
  <ul>
    <li><code>INSTALLED_APPS</code>: A list of active Django apps.</li>
    <li><code>MIDDLEWARE</code>: A list of hooks for processing requests/responses.</li>
    <li><code>TEMPLATES</code>: Configuration for Django’s template engine.</li>
    <li><code>DATABASES</code>: Default database engine and credentials.</li>
    <li><code>STATIC_URL</code>, <code>MEDIA_URL</code>: Static/media file URLs.</li>
    <li><code>ALLOWED_HOSTS</code>: Hosts/domains the app can serve.</li>
    <li><code>DEBUG</code>: Toggles debug mode — never use <code>True</code> in production!</li>
  </ul>

  <h3>6. Project Naming Tips</h3>
  <p>Choose meaningful project names that reflect your application domain. Avoid using names that clash with Python standard libraries like <code>test</code>, <code>email</code>, <code>site</code>, etc.</p>

  <h3>7. Git Initialization</h3>
  <p>
    It’s highly recommended to initialize a Git repository at this stage. This lets you track all changes and collaborate efficiently:
  </p>
  <pre>{`
git init
echo "venv/" >> .gitignore
echo "__pycache__/" >> .gitignore
echo "*.sqlite3" >> .gitignore
git add .
git commit -m "Initial Django project setup"
`}</pre>

  <h3>8. Environment Management</h3>
  <p>
    Keep sensitive data out of <code>settings.py</code>. Instead, use environment variables or a `.env` file:
  </p>
  <pre>{`
# .env file example
SECRET_KEY="your-secret"
DEBUG=True
DATABASE_URL="sqlite:///db.sqlite3"
`}</pre>

  <p>Load them in <code>settings.py</code> using libraries like <code>python-decouple</code> or <code>dotenv</code>.</p>

  <h3>9. Security Considerations</h3>
  <p>
    Although you’re just starting, consider best practices now to avoid trouble later:
  </p>
  <ul>
    <li>Always set <code>DEBUG = False</code> in production.</li>
    <li>Set strong <code>SECRET_KEY</code> values.</li>
    <li>Use HTTPS with secure cookies.</li>
    <li>Restrict <code>ALLOWED_HOSTS</code>.</li>
    <li>Use Content Security Policies (CSP) and X-Content-Type-Options.</li>
  </ul>

  <h3>10. Multi-Environment Structure</h3>
  <p>
    A scalable project structure separates development, staging, and production environments. You can create:
  </p>
  <pre>{`
project/
├── myproject/
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── dev.py
│   │   ├── prod.py
`}</pre>

  <p>Then in <code>manage.py</code>, set the environment:</p>
  <pre>{`os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings.dev')`}</pre>

  <h3>11. What Comes Next?</h3>
  <p>
    You’ve now created a Django project. This is your central hub for routing, configuration, and serving apps. Next, you’ll build one or more Django apps within this project — each responsible for a particular business logic or feature. Projects often contain many apps (e.g., blog, shop, users) working together.
  </p>

  <h3>12. Summary</h3>
  <p>
    To summarize:
    <ul>
      <li>A Django <strong>project</strong> is the outermost configuration for your site.</li>
      <li>Use <code>django-admin startproject</code> to scaffold your project.</li>
      <li><code>manage.py</code> is your project’s command center.</li>
      <li>Configurations live inside <code>settings.py</code>.</li>
      <li>You can run your first Django server in minutes!</li>
    </ul>
  </p>

  <p>
    With your Django project ready and verified, it’s time to take the next big step — creating and wiring up Django **apps**. Apps are the core units of logic and functionality in Django, and they deserve their own deep dive. Let’s continue!
  </p>
</section>


<section id="app">
  <h2>Creating an App in Django</h2>

  <p>
    In Django, the term “app” refers to a web application that performs a specific function within your overall project. You can think of an app as a modular unit of functionality — for example, a blog, a forum, a user authentication system, or a product catalog. A Django **project** is essentially a collection of apps configured to work together.
  </p>

  <p>
    Apps are designed to be reusable, loosely coupled, and easy to plug into different Django projects. This modular approach allows developers to build complex web applications with better organization, maintainability, and scalability. In this section, we’ll explore how to create your first Django app, understand its internal structure, and connect it with your project through configuration and routing.
  </p>

  <h3>1. App vs. Project: Understanding the Distinction</h3>
  <p>
    Before diving into creation, it’s critical to understand how a Django app differs from a project:
  </p>
  <ul>
    <li><strong>Project:</strong> The entire website or web service — the top-level configuration container.</li>
    <li><strong>App:</strong> A smaller unit of web functionality (like “blog”, “shop”, “cart”) that can be added to a project.</li>
  </ul>

  <p>
    Most Django projects contain multiple apps working in harmony. For example, an e-commerce site might have these apps:
    <ul>
      <li><code>products</code> – Displaying items</li>
      <li><code>accounts</code> – Managing user accounts</li>
      <li><code>cart</code> – Shopping cart system</li>
      <li><code>orders</code> – Order processing</li>
    </ul>
  </p>

  <h3>2. Creating Your First App</h3>
  <p>
    To create a new app inside your Django project, use the following command (from the project root directory):
  </p>
  <pre>{`python manage.py startapp myapp`}</pre>

  <p>This will generate a new folder named <code>myapp</code> with this structure:</p>
  <pre>{`
myapp/
├── __init__.py
├── admin.py
├── apps.py
├── migrations/
│   └── __init__.py
├── models.py
├── tests.py
└── views.py
`}</pre>

  <h3>3. Breakdown of the App Structure</h3>
  <ul>
    <li><strong>admin.py</strong> – Configuration for Django’s auto-generated admin panel.</li>
    <li><strong>apps.py</strong> – App-specific settings and metadata.</li>
    <li><strong>migrations/</strong> – Stores database migration files for the app’s models.</li>
    <li><strong>models.py</strong> – Contains your data models that define the database schema.</li>
    <li><strong>tests.py</strong> – For writing unit tests and integration tests.</li>
    <li><strong>views.py</strong> – Where you define the logic that responds to HTTP requests.</li>
  </ul>

  <h3>4. Registering the App in settings.py</h3>
  <p>
    After creating the app, you must register it in your project’s settings. Open <code>myproject/settings.py</code> and add your app to the <code>INSTALLED_APPS</code> list:
  </p>
  <pre>{`
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'myapp',  # Add your app here
]
`}</pre>

  <h3>5. Creating a Simple View</h3>
  <p>
    In <code>myapp/views.py</code>, create a simple view function that returns an HTTP response:
  </p>
  <pre>{`
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, this is my first Django app!")
`}</pre>

  <h3>6. Connecting the View with a URL</h3>
  <p>
    Next, you’ll need to map a URL to your new view. Inside the app directory, create a file named <code>urls.py</code> and add the following:
  </p>
  <pre>{`
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
]
`}</pre>

  <p>
    Then, include this app’s URLs in the main project’s <code>urls.py</code> (located in the outer <code>myproject</code> folder):
  </p>
  <pre>{`
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),  # Include app's URLs
]
`}</pre>

  <h3>7. Testing the Setup</h3>
  <p>
    Run your Django development server:
  </p>
  <pre>{`python manage.py runserver`}</pre>

  <p>
    Visit <code>http://127.0.0.1:8000/</code> in your browser, and you should see the message:
    <blockquote>Hello, this is my first Django app!</blockquote>
  </p>

  <h3>8. Adding Models to Your App</h3>
  <p>
    In <code>models.py</code>, define your data models using Python classes. Example:
  </p>
  <pre>{`
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
`}</pre>

  <p>
    Then, run the following commands to create the database table:
  </p>
  <pre>{`
python manage.py makemigrations
python manage.py migrate
`}</pre>

  <h3>9. Making Models Visible in the Admin Panel</h3>
  <p>
    Open <code>admin.py</code> and register your model:
  </p>
  <pre>{`
from django.contrib import admin
from .models import Post

admin.site.register(Post)
`}</pre>

  <p>
    Create an admin user if you haven’t already:
  </p>
  <pre>{`python manage.py createsuperuser`}</pre>

  <p>Then visit <code>/admin</code> in your browser and log in to manage your app's models through the UI.</p>

  <h3>10. App Naming Best Practices</h3>
  <ul>
    <li>Keep app names lowercase and use underscores if needed (e.g., <code>blog_posts</code>).</li>
    <li>Avoid generic names like <code>test</code> or <code>core</code> that may conflict with Python modules.</li>
    <li>Use descriptive names that match the app's purpose (e.g., <code>inventory</code>, <code>accounts</code>).</li>
  </ul>

  <h3>11. Reusability and Modularity</h3>
  <p>
    Django apps are designed to be pluggable. You can easily reuse a well-built app in other projects. Some tips to make apps reusable:
  </p>
  <ul>
    <li>Avoid hardcoding URLs — use the <code>reverse</code> function or the <code>url</code> template tag.</li>
    <li>Use relative imports (<code>from .models</code>) within the app.</li>
    <li>Keep business logic inside models or services, not views.</li>
    <li>Use app-specific templates and static directories.</li>
  </ul>

  <h3>12. Summary</h3>
  <p>
    Creating apps is a fundamental part of building with Django. An app holds models, views, templates, and logic for a particular part of your application. Whether you’re building a simple blog or a sophisticated analytics dashboard, organizing functionality into apps allows your codebase to stay clean, testable, and scalable.
  </p>

  <p>
    You now know how to create a Django app, register it in settings, define views, set up routing, and connect it to the admin panel. Next, we’ll explore how to build more complex view logic using class-based views and templates to render dynamic HTML pages.
  </p>
</section>


<section id="views">
  <h2>Django Views</h2>

  <p>
    Views are the heart of Django’s logic layer. They define what data gets returned when a user visits a URL. Simply put, a Django view is a Python function (or class) that takes a web request and returns a web response. These responses may include HTML content, a redirect, JSON data, or even errors like 404.
  </p>

  <p>
    When someone types a URL into their browser or clicks a link, Django uses its URL dispatcher to figure out which view to call. Views are where you write the core logic that powers your application — whether that’s pulling records from the database, performing calculations, or rendering an HTML template.
  </p>

  <h3>1. What is a View in Django?</h3>
  <p>
    In Django, views are Python functions or classes that process requests and return responses. They act as a middle layer between models (data) and templates (presentation).
  </p>

  <ul>
    <li><strong>Function-based views (FBVs):</strong> Use standard Python functions to define logic.</li>
    <li><strong>Class-based views (CBVs):</strong> Use classes to encapsulate behavior using inheritance and mixins.</li>
  </ul>

  <h3>2. Anatomy of a Function-Based View</h3>
  <p>
    A simple function-based view looks like this:
  </p>
  <pre>{`
from django.http import HttpResponse

def hello_view(request):
    return HttpResponse("Hello, World!")
`}</pre>

  <p>
    - <code>request</code>: The HTTP request object passed by Django.
    - <code>HttpResponse</code>: A class that builds an HTTP response with content.
  </p>

  <h3>3. Using Views with URL Patterns</h3>
  <p>
    You need to map a view to a URL in your app’s <code>urls.py</code>:
  </p>
  <pre>{`
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_view, name='hello'),
]
`}</pre>

  <p>Now, accessing <code>/hello/</code> in your browser will display the “Hello, World!” message.</p>

  <h3>4. Rendering HTML with Templates</h3>
  <p>
    While returning plain text is fine for testing, most views render HTML using Django’s templating engine.
  </p>
  <pre>{`
from django.shortcuts import render

def homepage(request):
    context = {
        'title': 'Welcome to My Website',
        'description': 'This is the homepage built with Django views.'
    }
    return render(request, 'home.html', context)
`}</pre>

  <p>
    The <code>render()</code> function combines a template with a context dictionary and returns an <code>HttpResponse</code>. You’ll need to create a <code>home.html</code> file inside a <code>templates/</code> directory.
  </p>

  <h3>5. Template Directories and Settings</h3>
  <p>
    Make sure your project is configured to find templates. In <code>settings.py</code>, check the <code>TEMPLATES</code> setting:
  </p>
  <pre>{`
TEMPLATES = [
  {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [BASE_DIR / 'templates'],
    ...
  },
]
`}</pre>

  <h3>6. Class-Based Views (CBVs)</h3>
  <p>
    Django also supports writing views as classes. These are called class-based views and are powerful when working with reusable patterns.
  </p>
  <pre>{`
from django.views import View
from django.http import HttpResponse

class HelloView(View):
    def get(self, request):
        return HttpResponse("Hello from a class-based view!")
`}</pre>

  <p>
    Add this view to <code>urls.py</code> using <code>as_view()</code>:
  </p>
  <pre>{`
from .views import HelloView

urlpatterns = [
    path('hello/', HelloView.as_view(), name='hello_cbv'),
]
`}</pre>

  <h3>7. Built-in Generic Views</h3>
  <p>
    Django comes with generic class-based views like <code>ListView</code>, <code>DetailView</code>, <code>CreateView</code>, etc., which save you time when working with models.
  </p>
  <pre>{`
from django.views.generic import ListView
from .models import Post

class PostListView(ListView):
    model = Post
    template_name = 'posts.html'
`}</pre>

  <p>This view will automatically:</p>
  <ul>
    <li>Fetch all <code>Post</code> objects</li>
    <li>Render <code>posts.html</code> with <code>post_list</code> in context</li>
  </ul>

  <h3>8. View Lifecycle</h3>
  <p>
    The Django view lifecycle follows these steps:
  </p>
  <ol>
    <li>User makes a request (e.g., clicks a link)</li>
    <li>Django URL dispatcher finds the right view</li>
    <li>The view executes logic and fetches data</li>
    <li>The view returns an HttpResponse (HTML, redirect, JSON)</li>
    <li>Browser renders the response</li>
  </ol>

  <h3>9. View Decorators</h3>
  <p>
    Django provides decorators to modify view behavior. Common ones include:
  </p>
  <ul>
    <li><code>@login_required</code> – Only allow logged-in users</li>
    <li><code>@require_http_methods</code> – Limit HTTP methods</li>
    <li><code>@csrf_exempt</code> – Disable CSRF protection (use with caution)</li>
  </ul>

  <pre>{`
from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')
`}</pre>

  <h3>10. Returning JSON Responses</h3>
  <p>
    To return JSON (e.g., for APIs), use <code>JsonResponse</code>:
  </p>
  <pre>{`
from django.http import JsonResponse

def api_data(request):
    data = {'name': 'John', 'age': 30}
    return JsonResponse(data)
`}</pre>

  <h3>11. Handling 404 and 403</h3>
  <p>
    You can manually raise exceptions like:
  </p>
  <pre>{`
from django.http import Http404

def get_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        raise Http404("Post not found")
`}</pre>

  <p>You can also use <code>get_object_or_404()</code> shortcut:</p>
  <pre>{`
from django.shortcuts import get_object_or_404

post = get_object_or_404(Post, id=post_id)
`}</pre>

  <h3>12. Organizing Views</h3>
  <ul>
    <li>Split large views.py files into modules (e.g., <code>views/home.py</code>, <code>views/posts.py</code>).</li>
    <li>Use mixins or service layers to keep views clean.</li>
    <li>Group CBVs by domain functionality.</li>
  </ul>

  <h3>13. Best Practices</h3>
  <ul>
    <li>Use FBVs for simple views and CBVs for reusable logic.</li>
    <li>Keep views focused — avoid doing too much in a single function.</li>
    <li>Use <code>render()</code> and <code>get_object_or_404()</code> to simplify code.</li>
    <li>Use meaningful names for views (e.g., <code>post_list</code>, <code>user_profile</code>).</li>
    <li>Use decorators to enforce access control.</li>
  </ul>

  <h3>14. Conclusion</h3>
  <p>
    Views are where Django apps come to life. They hold the logic that fetches data, processes input, renders templates, or returns JSON responses. Django gives you multiple ways to write views — from simple functions to powerful class-based generics — so you can build exactly the kind of interface you need.
  </p>

  <p>
    With views now under your belt, the next piece of the puzzle is Django’s URL dispatcher — the router that connects incoming requests to the correct view logic. Let’s explore that next.
  </p>
</section>


<section id="urls">
  <h2>URL Routing in Django</h2>

  <p>
    In Django, the URL dispatcher (or URL routing system) is the mechanism that maps URLs requested by the user to the appropriate views that generate a response. Think of it as a traffic director that sends requests to the correct function or class based on the path in the browser's address bar.
  </p>

  <p>
    Unlike many frameworks that rely on controllers or predefined route patterns, Django provides a clean, explicit way to define routes using Python code. This design emphasizes clarity, flexibility, and maintainability. With Django’s powerful URL routing system, you can define simple or complex routes, apply namespaces for modularization, create dynamic URLs with parameters, and more.
  </p>

  <h3>1. How Django URL Routing Works</h3>
  <p>
    Each Django project includes a top-level <code>urls.py</code> file, typically located in the project folder (e.g., <code>myproject/urls.py</code>). This file acts as the main entry point for routing. Inside, it imports views and child route configurations from apps and dispatches URLs accordingly.
  </p>

  <pre>{`
# myproject/urls.py
from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
  path('admin/', admin.site.urls),
  path('hello/', views.hello_view, name='hello'),
]
`}</pre>

  <p>
    In the example above, Django listens for requests to <code>/hello/</code> and maps them to the <code>hello_view</code> function in <code>myapp/views.py</code>.
  </p>

  <h3>2. The path() Function</h3>
  <p>
    Django 2.0+ introduced the <code>path()</code> function for URL routing, which simplifies the process of creating clean, readable URLs.
  </p>

  <pre>{`
path(route, view, kwargs=None, name=None)
`}</pre>

  <ul>
    <li><strong>route:</strong> A string representing the URL pattern.</li>
    <li><strong>view:</strong> A function or class-based view to call.</li>
    <li><strong>kwargs:</strong> Optional dictionary of keyword arguments passed to the view.</li>
    <li><strong>name:</strong> An optional name for referencing the URL in templates and redirects.</li>
  </ul>

  <h3>3. Dynamic URL Patterns</h3>
  <p>
    You can include variables in your URL using angle brackets. Django supports built-in path converters like:
  </p>
  <ul>
    <li><code>str</code> – Matches any non-empty string, excluding slashes.</li>
    <li><code>int</code> – Matches integers.</li>
    <li><code>slug</code> – Matches slug strings (letters, numbers, hyphens).</li>
    <li><code>uuid</code> – Matches UUID strings.</li>
    <li><code>path</code> – Matches entire remaining path, including slashes.</li>
  </ul>

  <pre>{`
# views.py
def greet_user(request, username):
    return HttpResponse(f"Hello, {username}!")

# urls.py
path('greet/<str:username>/', views.greet_user, name='greet_user')
`}</pre>

  <p>
    Now, visiting <code>/greet/john/</code> will return "Hello, john!".
  </p>

  <h3>4. Using include() for App-Level URLs</h3>
  <p>
    As your project grows, you'll want to keep your URL configuration modular. The <code>include()</code> function lets you create separate <code>urls.py</code> files in each app and link them to the main project routes.
  </p>

  <pre>{`
# myproject/urls.py
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')),
]
`}</pre>

  <p>
    In your <code>blog</code> app, you’d create a <code>urls.py</code> file like this:
  </p>

  <pre>{`
# blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog_home, name='blog_home'),
    path('post/<int:post_id>/', views.post_detail, name='post_detail'),
]
`}</pre>

  <h3>5. URL Namespacing</h3>
  <p>
    Namespacing helps you avoid conflicts between apps with the same view or URL names. Use <code>app_name</code> in the app’s <code>urls.py</code> and specify the namespace in the main routing.
  </p>

  <pre>{`
# blog/urls.py
app_name = 'blog'

urlpatterns = [
    path('post/<int:id>/', views.post_detail, name='detail'),
]
`}</pre>

  <pre>{`
# In templates
{% url 'blog:detail' post.id %}
`}</pre>

  <h3>6. Reversing URLs</h3>
  <p>
    Rather than hardcoding URLs, Django encourages you to use the URL name and <code>reverse()</code> function to retrieve paths:
  </p>
  <pre>{`
from django.urls import reverse

def redirect_to_post(request, post_id):
    return redirect(reverse('blog:detail', args=[post_id]))
`}</pre>

  <h3>7. Regular Expressions with re_path()</h3>
  <p>
    For complex matching, Django provides <code>re_path()</code> which uses regex:
  </p>
  <pre>{`
from django.urls import re_path

re_path(r'^article/(?P<slug>[a-z0-9-]+)/$', views.article_detail)
`}</pre>

  <h3>8. Redirecting with Views</h3>
  <p>
    You can redirect users to different pages using Django’s <code>HttpResponseRedirect</code> or <code>redirect()</code> shortcut:
  </p>
  <pre>{`
from django.shortcuts import redirect

def old_page_redirect(request):
    return redirect('new_page')
`}</pre>

  <h3>9. Error Handling Routes</h3>
  <p>
    Customize 404 or 500 errors with custom views in your root URL config:
  </p>
  <pre>{`
handler404 = 'myapp.views.custom_404'
handler500 = 'myapp.views.custom_500'
`}</pre>

  <h3>10. Trailing Slashes and APPEND_SLASH</h3>
  <p>
    Django appends slashes to URLs by default. For example, if a user visits <code>/hello</code>, it redirects to <code>/hello/</code> if <code>APPEND_SLASH = True</code> in settings.
  </p>

  <h3>11. Including Static and Media URLs (Development)</h3>
  <p>
    During development, serve static and uploaded media files by extending <code>urlpatterns</code>:
  </p>
  <pre>{`
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
`}</pre>

  <h3>12. Best Practices</h3>
  <ul>
    <li>Keep root <code>urls.py</code> minimal — delegate to apps using <code>include()</code>.</li>
    <li>Name your URLs with the <code>name</code> argument for reverse lookups.</li>
    <li>Use path converters for clean, readable routes (e.g., <code>&lt;slug:slug&gt;</code>).</li>
    <li>Use <code>app_name</code> and namespacing for clarity in multi-app projects.</li>
    <li>Group related routes (e.g., user profile views) logically in the same file.</li>
  </ul>

  <h3>13. Summary</h3>
  <p>
    Django’s URL routing system is one of its greatest strengths. It offers unmatched flexibility and clarity in connecting your application’s views to user-facing URLs. You can use simple paths for basic routes, dynamic parameters for detailed views, and namespaces for organizing large applications.
  </p>

  <p>
    With URL routing mastered, you’re ready to move on to Django’s powerful **templating system**, which lets you render dynamic HTML using variables, loops, filters, and inheritance. Let's dive into templates next.
  </p>
</section>


<section id="templates">
  <h2>Django Templates</h2>

  <p>
    Django’s template system is a powerful tool for dynamically generating HTML content on the server side. It allows you to separate the business logic (Python code in views) from the presentation layer (HTML templates), promoting a clean and maintainable codebase. With templates, you can reuse design layouts, populate HTML with dynamic content, loop through data, conditionally display elements, and more — all using a readable, secure, and extendable syntax.
  </p>

  <p>
    Django templates are not just static HTML pages — they are enhanced with template tags, filters, and inheritance mechanisms that allow for powerful rendering of complex web pages. This templating engine is fast, secure (auto-escaping HTML by default), and extensible.
  </p>

  <h3>1. How the Template System Works</h3>
  <p>
    When a view calls <code>render(request, template_name, context)</code>, Django loads the specified template, processes it with the given context data (a dictionary), and returns an HTTP response with the rendered HTML.
  </p>

  <p>
    The process looks like this:
  </p>
  <ol>
    <li>A request is made to a URL</li>
    <li>The view function queries the database and prepares data</li>
    <li>The view passes data to a template using the context</li>
    <li>The template renders HTML using template syntax</li>
    <li>Django returns the rendered HTML to the browser</li>
  </ol>

  <h3>2. Template Directory Structure</h3>
  <p>
    Templates can be organized in several ways. A common convention is to create a <code>templates/</code> directory inside each app:
  </p>
  <pre>{`
myapp/
├── templates/
│   └── myapp/
│       └── home.html
`}</pre>

  <p>
    You can also define a global templates directory in your project root and add it to <code>TEMPLATES['DIRS']</code> in <code>settings.py</code>:
  </p>
  <pre>{`
TEMPLATES = [
    {
        ...
        'DIRS': [BASE_DIR / 'templates'],
        ...
    },
]
`}</pre>

  <h3>3. Creating and Rendering a Template</h3>
  <p>Let’s create a simple template:</p>
  <pre>{`
<!-- templates/myapp/home.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>{{ heading }}</h1>
    <p>{{ message }}</p>
</body>
</html>
`}</pre>

  <p>And in the view:</p>
  <pre>{`
from django.shortcuts import render

def homepage(request):
    context = {
        'title': 'Welcome',
        'heading': 'Django Templates',
        'message': 'This page is powered by Django templates.'
    }
    return render(request, 'myapp/home.html', context)
`}</pre>

  <h3>4. Template Tags</h3>
  <p>
  Template tags are logic embedded within templates. They are enclosed in 
  <code>{`{% ... %}`}</code> and can perform loops, conditionals, template inheritance, etc.
</p>


  <p>Example: if-else condition</p>
  <pre>{`
{% if user.is_authenticated %}
  <p>Welcome, {{ user.username }}!</p>
{% else %}
  <p>Please log in.</p>
{% endif %}
`}</pre>

  <p>Example: looping through a list</p>
  <pre>{`
<ul>
{% for post in posts %}
  <li>{{ post.title }}</li>
{% endfor %}
</ul>
`}</pre>

  <h3>5. Template Filters</h3>
  <p>
    Filters are used to modify variables. They are placed after the variable name using the pipe (<code>|</code>) symbol.
  </p>

  <p>Examples:</p>
  <pre>{`
{{ name|lower }}       <!-- lowercase -->
{{ name|upper }}       <!-- uppercase -->
{{ date|date:"Y-m-d" }}<!-- format date -->
{{ list|length }}      <!-- list length -->
`}</pre>

  <h3>6. Template Inheritance</h3>
  <p>
    Inheritance helps you avoid repeating common HTML code like headers, footers, and navigation. Define a base layout in a <code>base.html</code> template, then extend it in child templates.
  </p>

  <pre>{`
<!-- base.html -->
<html>
  <head><title>{% block title %}My Site{% endblock %}</title></head>
  <body>
    <header>Header Content</header>
    <main>{% block content %}{% endblock %}</main>
    <footer>Footer Content</footer>
  </body>
</html>
`}</pre>

  <pre>{`
<!-- home.html -->
{% extends "base.html" %}
{% block title %}Home{% endblock %}
{% block content %}
  <h1>Welcome to the homepage</h1>
{% endblock %}
`}</pre>

  <h3>7. Template Inclusion</h3>
  <p>
  You can reuse small components using the 
  <code>{`{% include %}`}</code> tag:
</p>

  <pre>{`
<!-- navbar.html -->
<nav>...</nav>

<!-- home.html -->
{% include 'navbar.html' %}
`}</pre>

  <h3>8. Escaping and Safe Output</h3>
  <p>
    By default, Django escapes HTML to prevent XSS attacks. If you trust a variable to contain safe HTML, use the <code>|safe</code> filter:
  </p>
  <pre>{`{{ variable|safe }}`}</pre>

  <h3>9. Static Files in Templates</h3>
  <p>
    To include CSS, JS, or image files, use Django’s static files system:
  </p>

  <pre>{`
{% load static %}
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<img src="{% static 'images/logo.png' %}">
`}</pre>

  <p>
    Be sure <code>django.contrib.staticfiles</code> is in <code>INSTALLED_APPS</code> and <code>STATIC_URL</code> is configured.
  </p>

  <h3>10. Template Context</h3>
  <p>
    Context is a dictionary that maps keys to values passed to templates. For example:
  </p>

  <pre>{`
context = {
  'name': 'Alice',
  'items': ['Book', 'Pen', 'Notebook'],
  'is_logged_in': True
}
`}</pre>

  <p>Use the variables in your template:</p>
  <pre>{`
<h1>Hello, {{ name }}</h1>
{% if is_logged_in %}
  <p>Welcome back!</p>
{% endif %}
`}</pre>

  <h3>11. Using Template Blocks</h3>
  <p>
    You can define multiple named blocks in your base template. Child templates can override them:
  </p>

  <pre>{`
<!-- base.html -->
{% block sidebar %}{% endblock %}
{% block scripts %}{% endblock %}
`}</pre>

  <h3>12. Working with Django Forms in Templates</h3>
  <p>
    When using Django’s forms, rendering the form in a template is simple:
  </p>

  <pre>{`
<form method="post">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit">Submit</button>
</form>
`}</pre>

  <p>
    The <code>csrf_token</code> tag ensures security by protecting against Cross-Site Request Forgery.
  </p>

  <h3>13. Template Loading and Debugging</h3>
  <ul>
    <li>TemplateDoesNotExist: Check template name and directory.</li>
    <li>Use <code>django.template.loader.get_template()</code> for manual loading.</li>
    <li>Enable template debugging with <code>DEBUG = True</code>.</li>
  </ul>

  <h3>14. Best Practices</h3>
  <ul>
    <li>Keep templates clean: avoid embedding business logic.</li>
    <li>Use blocks and inheritance to avoid repetition.</li>
    <li>Split reusable UI into partial templates.</li>
    <li>Use custom template tags/filters for reusable logic.</li>
    <li>Use consistent naming (e.g., <code>appname/template_name.html</code>).</li>
  </ul>

  <h3>15. Summary</h3>
  <p>
    Django’s templating engine is elegant, powerful, and secure. It lets you render dynamic HTML based on context data passed from views. With features like tags, filters, inheritance, and includes, you can create scalable layouts with minimal duplication and maximum maintainability.
  </p>

  <p>
    With templates in place, your Django app can now display data. But where does that data come from? The answer lies in Django's ORM and **models** — the subject of our next section.
  </p>
</section>


<section id="models">
  <h2>Django Models</h2>

  <p>
    Django models are the backbone of your application’s data layer. A model in Django is a Python class that subclasses <code>django.db.models.Model</code> and represents a table in the database. Each attribute of the class represents a database field. With models, Django provides an abstraction layer over your database, known as the Object-Relational Mapper (ORM), allowing you to interact with your data using Python code instead of writing raw SQL.
  </p>

  <p>
    Models handle the creation, retrieval, update, and deletion (CRUD) of your application's data. They also support relationships between tables like one-to-many, many-to-many, and one-to-one. When working with Django, defining models is often the first step in building your application logic.
  </p>

  <h3>1. What is a Model in Django?</h3>
  <p>
    A Django model is a blueprint for a database table. It defines what fields (columns) the table has, what types they are (strings, integers, dates, etc.), whether they’re required or optional, and how they relate to other models.
  </p>

  <pre>{`
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    published_date = models.DateField()
    is_available = models.BooleanField(default=True)
`}</pre>

  <p>
    This model creates a <code>Book</code> table with four fields: <code>title</code>, <code>author</code>, <code>published_date</code>, and <code>is_available</code>.
  </p>

  <h3>2. Common Field Types</h3>
  <ul>
    <li><code>CharField</code> – Strings (with max_length)</li>
    <li><code>TextField</code> – Large text (no max length)</li>
    <li><code>IntegerField</code> – Integer values</li>
    <li><code>FloatField</code> – Decimal numbers</li>
    <li><code>BooleanField</code> – True/False</li>
    <li><code>DateField</code> – Dates</li>
    <li><code>DateTimeField</code> – Date and time</li>
    <li><code>FileField</code> – Upload files</li>
    <li><code>ImageField</code> – Upload images</li>
    <li><code>EmailField</code> – Validated email addresses</li>
  </ul>

  <h3>3. Creating Your First Model</h3>
  <p>Let’s define a simple <code>Post</code> model for a blog app:</p>
  <pre>{`
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
`}</pre>

  <p>
    <code>auto_now_add</code> sets the timestamp only once when created. <code>auto_now</code> updates it every time the object is saved.
  </p>

  <h3>4. Adding Models to the Database</h3>
  <p>
    Once you've defined your models, Django needs to sync them with the database:
  </p>

  <pre>{`
python manage.py makemigrations
python manage.py migrate
`}</pre>

  <ul>
    <li><code>makemigrations</code>: Creates migration files</li>
    <li><code>migrate</code>: Applies changes to the actual database</li>
  </ul>

  <h3>5. Registering Models in admin.py</h3>
  <p>
    To manage your model data in the Django Admin interface:
  </p>
  <pre>{`
from django.contrib import admin
from .models import Post

admin.site.register(Post)
`}</pre>

  <p>Now, your model appears in the admin panel.</p>

  <h3>6. Model Methods</h3>
  <p>Models can have custom methods:</p>
  <pre>{`
class Post(models.Model):
    ...
    def snippet(self):
        return self.content[:100] + "..."
`}</pre>

  <h3>7. Model Meta Class</h3>
  <p>
    The <code>Meta</code> class provides metadata for your model:
  </p>
  <pre>{`
class Post(models.Model):
    ...
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
`}</pre>

  <h3>8. String Representation</h3>
  <p>
    Define how the model appears in admin and shell with <code>__str__</code>:
  </p>
  <pre>{`
def __str__(self):
    return self.title
`}</pre>

  <h3>9. Relationships Between Models</h3>

  <ul>
    <li><code>ForeignKey</code> – One-to-many</li>
    <li><code>ManyToManyField</code> – Many-to-many</li>
    <li><code>OneToOneField</code> – One-to-one</li>
  </ul>

  <pre>{`
class Author(models.Model):
    name = models.CharField(max_length=100)

class Post(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
`}</pre>

  <h3>10. Querying the Database</h3>
  <p>
    Django allows you to interact with your models using the ORM:
  </p>

  <pre>{`
# Create
Post.objects.create(title="Hello", content="World")

# Read
Post.objects.all()
Post.objects.filter(title__icontains='hello')
Post.objects.get(id=1)

# Update
post = Post.objects.get(id=1)
post.title = "Updated"
post.save()

# Delete
post.delete()
`}</pre>

  <h3>11. Model Inheritance</h3>
  <p>
    You can define base models and extend them:
  </p>
  <pre>{`
class CommonInfo(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Product(CommonInfo):
    name = models.CharField(max_length=100)
`}</pre>

  <h3>12. Custom Managers</h3>
  <p>
    Managers let you define custom queries:
  </p>
  <pre>{`
class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(published=True)

class Article(models.Model):
    published = models.BooleanField(default=False)
    objects = models.Manager()
    published_objects = PublishedManager()
`}</pre>

  <h3>13. Validations</h3>
  <p>
    You can define validation rules using <code>clean()</code>:
  </p>
  <pre>{`
def clean(self):
    if self.title == "":
        raise ValidationError("Title cannot be blank.")
`}</pre>

  <h3>14. Best Practices</h3>
  <ul>
    <li>Use singular class names for models (e.g., <code>Post</code>, not <code>Posts</code>)</li>
    <li>Always include a <code>__str__</code> method</li>
    <li>Use indexes for fields queried frequently</li>
    <li>Use verbose_name and help_text to improve admin UI</li>
    <li>Group related models in the same app</li>
    <li>Use migrations properly — commit them to version control</li>
  </ul>

  <h3>15. Summary</h3>
  <p>
    Django models define your database schema using simple Python classes. With the ORM, you can work with databases using Pythonic queries. By mastering models, you gain control over how your data is structured, validated, related, and accessed.
  </p>

  <p>
    Now that your models are storing and organizing your data, it’s time to look at how you can manage that data visually using Django’s powerful <strong>admin interface</strong> — up next!
  </p>
</section>

<section id="admin">
  <h2>Admin Panel</h2>
  <p>
    The Django Admin Panel is one of the most powerful features of the Django framework, allowing developers to manage the backend of a web application with minimal effort. It is a web-based interface that automatically generates management tools for your application's data models. With Django’s Admin, you can create, update, delete, and view your application’s data directly from the interface without writing any additional code for this functionality. The Django Admin is highly customizable, enabling you to tailor the user interface to match your specific needs and to provide your users with a smooth and user-friendly experience when interacting with your data.
    <br/><br/>
    The Admin Panel is built on top of Django’s Object-Relational Mapping (ORM) system, which means that it interacts with the database through Python code rather than SQL queries. When you define models in Django, the Admin interface is automatically generated based on those models, allowing you to quickly add, edit, and delete entries from the database without needing to manually create views or forms. This is an essential feature for any project that requires an easy-to-use interface for managing data, whether for content management systems (CMS), product catalogs, user management, or other backend data management purposes.
    <br/><br/>
    Setting up the Admin Panel in Django is a straightforward process. Once you have your Django project and app created, you only need to register your models in the `admin.py` file. This will allow Django to automatically generate the necessary forms for each model. Additionally, Django provides a built-in superuser system, which allows you to create an admin account and access the admin interface with full control over the data.
    <br/><br/>
    After you define your models and register them in the `admin.py` file, you need to run the migrations command to sync the models with your database. This will create the necessary database tables, which will then be accessible from the Admin Panel. Once everything is set up, you can access the Admin Panel by running the Django development server and navigating to `/admin` in your browser. The admin interface will prompt you to log in with the superuser account you created earlier, and once logged in, you will be presented with a list of your models.
    <br/><br/>
    The Admin Panel allows you to perform CRUD operations (Create, Read, Update, and Delete) on your data. It provides a clean and intuitive interface that makes managing your data a breeze. The Admin interface also comes with many powerful built-in features, such as search functionality, filtering, and sorting, which make it easy to navigate through large datasets. Django’s Admin Panel automatically provides these features out of the box, and they can be further customized to fit your needs.
    <br/><br/>
    **Creating and Registering Models for Admin Panel**
    <br/><br/>
    One of the first steps in setting up the Django Admin Panel is defining your models. A model in Django is a Python class that subclasses `django.db.models.Model`. It represents a table in your database and defines the fields of the table as class attributes. Once you have defined your models, the next step is to register them in the `admin.py` file so that they appear in the Admin Panel.
    <br/><br/>
    Here is a basic example of defining and registering a model for the Admin Panel:
    <pre>{`
from django.db import models
from django.contrib import admin

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ['title']
    list_filter = ['created_at']
    
admin.site.register(Post, PostAdmin)
    `}</pre>
    In this example, we have defined a `Post` model with three fields: `title`, `content`, and `created_at`. We have also defined a `PostAdmin` class, which customizes the appearance of the model in the admin interface. The `list_display` attribute determines which fields should be shown in the list view of the Admin Panel, while the `search_fields` attribute enables searching by the `title` field. The `list_filter` attribute adds a filter by the `created_at` field, which allows users to easily filter posts by date.
    <br/><br/>
    Once you have registered your model, it will automatically appear in the Admin Panel, and you will be able to perform CRUD operations on it. The list view will display the `title` and `created_at` fields, and you can click on individual posts to edit them or create new ones. The search and filter options will allow you to quickly find and organize your data.
    <br/><br/>
    **Customizing the Admin Interface**
    <br/><br/>
    Django provides a great deal of flexibility when it comes to customizing the Admin Panel. You can easily adjust the way your models are displayed, add custom forms, and even create custom actions to be performed on your data.
    <br/><br/>
    For example, you can customize the form used to add or edit a model by defining a custom form class and associating it with the model in the `admin.py` file. This allows you to add validation, custom widgets, or extra fields that are not part of the model itself. You can also customize the list view by adding extra actions, grouping fields, or controlling how the model’s data is presented.
    <br/><br/>
    Here’s an example of how to define a custom form for a model in Django Admin:
    <pre>{`
from django import forms
from django.contrib import admin
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']
    
    def clean_title(self):
        title = self.cleaned_data.get('title')
        if 'bad' in title.lower():
            raise forms.ValidationError("Title cannot contain the word 'bad'.")
        return title

class PostAdmin(admin.ModelAdmin):
    form = PostForm
    list_display = ('title', 'created_at')
    
admin.site.register(Post, PostAdmin)
    `}</pre>
    In this example, we have created a custom form class, `PostForm`, which adds validation to the `title` field. Specifically, it checks if the word “bad” appears in the title and raises a validation error if it does. This custom form is then associated with the `PostAdmin` class, which ensures that it is used in the Admin Panel when creating or editing posts.
    <br/><br/>
    In addition to customizing forms, Django Admin also allows you to customize the list view. For example, you can add actions that can be performed on multiple items at once, such as deleting selected posts or marking them as published. You can also add inline forms to display related models directly within the model’s detail page, allowing for a seamless editing experience.
    <br/><br/>
    **Managing User Access with Admin Panel**
    <br/><br/>
    One of the key features of the Django Admin Panel is its ability to manage user access. Django provides a built-in authentication system, which means you can assign different permissions to different users and restrict their access to certain parts of the Admin Panel based on their roles.
    <br/><br/>
    Django’s built-in user model supports a range of permissions, including the ability to add, change, delete, and view objects. You can create custom user roles, assign permissions to them, and then assign those roles to users. This allows you to create a secure and flexible admin environment where users have access only to the parts of the application that are relevant to them.
    <br/><br/>
    To create a superuser, which is a user with full access to the Admin Panel, run the following command:
    <pre>{`
python manage.py createsuperuser
    `}</pre>
    During the superuser creation process, you will be prompted to enter a username, email, and password. Once the superuser is created, you can log into the Admin Panel with the credentials you provided. Superusers have access to all models and data and can manage users and permissions.
    <br/><br/>
    You can also create custom user roles and assign permissions to those roles. For example, you can create a staff user who only has permission to edit posts but not delete them, or a read-only user who can only view the data without making any changes. To manage user permissions, go to the Admin Panel and navigate to the “Users” section under the “Authentication and Authorization” menu.
    <br/><br/>
    **Extending the Admin Panel with Third-Party Packages**
    <br/><br/>
    Django’s Admin Panel is already packed with features, but you can further enhance it by using third-party packages. There are many open-source packages available that provide additional functionality, such as adding rich text editors, enabling drag-and-drop functionality, or integrating with external APIs.
    <br/><br/>
    Some popular third-party packages for Django Admin include:
    - `django-grappelli`: A modern and flexible theme for the Django Admin interface.
    - `django-suit`: A customizable and user-friendly admin interface.
    - `django-import-export`: A package that allows you to import and export data from the Admin Panel in various formats like CSV, Excel, and JSON.
    - `django-adminsortable`: A package that enables drag-and-drop sorting of items in the Admin Panel.
    <br/><br/>
    To install a third-party package, use pip:
    <pre>{`
pip install django-grappelli
    `}</pre>
    Then, add the package to your `INSTALLED_APPS` in `settings.py`:
    <pre>{`
INSTALLED_APPS = [
    ...
    'grappelli',
    ...
]
    `}</pre>
    After installation, the features provided by the package will automatically be integrated into the Admin Panel.
    <br/><br/>
    **Conclusion**
    <br/><br/>
    Django’s Admin Panel is an incredibly powerful tool that simplifies the process of managing data within a Django application. It allows developers to create rich, data-driven web applications with minimal effort, while also providing an intuitive interface for non-technical users. By customizing the Admin Panel to fit your project’s needs, you can create a seamless and efficient user experience. With the ability to easily manage models, extend functionality with third-party packages, and control user access, the Django Admin Panel is an indispensable feature for any Django project.
  </p>
</section>


<section id="forms">
  <h2>Forms</h2>
  <p>
    Forms in Django are an essential part of web development. They provide a simple way to handle user input, including text fields, checkboxes, and other types of data, ensuring that the data entered is validated and processed correctly. Django forms simplify the handling of forms in HTML, and their integration with Django's model system allows for seamless data validation, user input handling, and security.
  </p>
  <p>
    A Django form is created by subclassing the <code>django.forms.Form</code> class. Each field in the form is defined as an attribute of the class. Django provides a variety of fields such as <code>CharField</code>, <code>IntegerField</code>, <code>BooleanField</code>, and others, which map to corresponding HTML form elements.
  </p>
  <p>
    Here’s a basic example of how to create a simple contact form using Django forms:
  </p>
  <pre>{`from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
    agree = forms.BooleanField(required=True)`}</pre>
  <p>
    In this example, the <code>ContactForm</code> contains four fields:
    <ul>
      <li><code>name</code>: A character field for the user's name.</li>
      <li><code>email</code>: A field for the user's email, which uses Django's built-in <code>EmailField</code> for validation.</li>
      <li><code>message</code>: A large text area for the user’s message, defined using the <code>TextArea</code> widget.</li>
      <li><code>agree</code>: A boolean field that checks whether the user agrees to the terms and conditions, with the <code>required</code> attribute set to <code>True</code>.</li>
    </ul>
  </p>
  <p>
    Django forms provide several features that help manage the user input securely and efficiently:
    <ul>
      <li><strong>Validation</strong>: Django automatically validates the fields based on their types. For example, the <code>EmailField</code> ensures that the value entered is a valid email address.</li>
      <li><strong>Rendering</strong>: Forms can be rendered automatically to HTML, allowing you to insert them into templates with minimal code.</li>
      <li><strong>Handling Post-Data</strong>: Forms handle the process of receiving data via HTTP POST requests, and Django takes care of sanitizing the data before storing it in the database or performing any action.</li>
    </ul>
  </p>
  <p>
    To render this form in a template, you can use Django’s built-in form rendering methods. Here’s an example of rendering the form in an HTML template:
  </p>
  <pre>{`<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Submit</button>
</form>`}</pre>
<p>
    The <code>&#123;&#37; csrf_token &#125;&#37;</code> tag is part of Django's template system and helps protect against Cross-Site Request Forgery (CSRF) attacks in Django forms. In a React application, you would need to handle CSRF protection in a different manner, such as passing the CSRF token from your Django backend to the React frontend via a meta tag. 
    In React, you can handle form submission securely by ensuring that the CSRF token is included in the request headers when submitting forms to the Django backend. You can also render form fields as paragraph elements or customize their rendering as needed.
</p>

  <p>
    Once the form is submitted, Django automatically checks whether the form is valid by calling <code>form.is_valid()</code>. If the form is valid, the cleaned data can be accessed via <code>form.cleaned_data</code>, and you can process it as needed. Here's an example view function to handle the form submission:
  </p>
  <pre>{`from django.shortcuts import render
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process the form data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            # Send an email, save data, or other actions
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})`}</pre>
  <p>
    This view processes the form data if the form is valid. If the form is submitted via a POST request, Django populates the form with the data from the request. If the form is valid, the view accesses the cleaned data and performs the necessary actions. If the form is not valid, it will be re-rendered with error messages.
  </p>
</section>

<section id="auth">
  <h2>Authentication</h2>
  <p>
    Django provides a built-in authentication system that allows developers to easily manage user login, logout, registration, and password management. The authentication system in Django is based on user models, session management, and authentication views that allow you to authenticate users securely and manage their permissions.
  </p>
  <p>
    Django’s built-in authentication features include:
    <ul>
      <li><strong>User login and logout:</strong> Users can log in with their credentials and log out when they no longer need access to the application.</li>
      <li><strong>Session management:</strong> Django automatically manages user sessions, storing session data in the database or a session cookie.</li>
      <li><strong>User registration:</strong> Django provides tools to easily create new users, typically via a form where users provide their username, email, and password.</li>
      <li><strong>Password management:</strong> Django allows users to reset their passwords, change them, and even check password strength.</li>
    </ul>
  </p>
  <p>
    To get started with Django authentication, you can use Django’s built-in views for login, logout, and password management. For example, Django provides a login view at <code>/accounts/login/</code> and a logout view at <code>/accounts/logout/</code>.
  </p>
  <p>
    To enable user authentication in your project, make sure to include the `django.contrib.auth` app in your `INSTALLED_APPS` setting. Additionally, you can include URL patterns for login and logout in your project's <code>urls.py</code>:
  </p>
  <pre>{`from django.urls import path
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]`}</pre>
  <p>
    Django’s authentication system also provides middleware to track logged-in users, enforce permissions, and manage user access throughout the application. You can customize user access by restricting views to only logged-in users using the <code>@login_required</code> decorator or by using class-based views (CBVs) such as <code>LoginRequiredMixin</code>.
  </p>
  <p>
    Here's an example of using the <code>@login_required</code> decorator to protect a view:
  </p>
  <pre>{`from django.contrib.auth.decorators import login_required

@login_required
def profile_view(request):
    return render(request, 'profile.html')`}</pre>
  <p>
    Django’s authentication system also includes a permissions system, allowing you to define custom permissions and restrict access to specific views based on user roles. For example, you can check if a user has permission to edit a specific object by using the <code>has_perm()</code> method.
  </p>
  <p>
    Overall, Django’s authentication system makes it easy to secure your application and control user access, offering features like password hashing, user sessions, and permission management with minimal configuration.
  </p>
</section>

<section id="api">
  <h2>REST APIs</h2>
  <p>
    Django REST Framework (DRF) is a powerful toolkit for building Web APIs in Django. With DRF, you can easily build RESTful APIs to expose your application’s data to the front-end, other services, or third-party applications. DRF provides a simple and flexible way to serialize data, authenticate users, handle permissions, and customize views.
  </p>
  <p>
    To get started with DRF, you need to install it using <code>pip</code>:
  </p>
  <pre>{`pip install djangorestframework`}</pre>
  <p>
    After installing DRF, add it to your `INSTALLED_APPS` in your <code>settings.py</code>:
  </p>
  <pre>{`INSTALLED_APPS = [
    ...
    'rest_framework',
    ...
]`}</pre>
  <p>
    One of the core features of DRF is serialization. Serialization converts complex data types like Django models into JSON or XML format, allowing it to be easily consumed by APIs. DRF provides a <code>ModelSerializer</code> class that automatically creates serializers for your models, simplifying the process of exposing model data via APIs.
  </p>
  <p>
    Here's an example of how to create a simple API for the `Post` model using DRF:
  </p>
  <pre>{`from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at']`}</pre>
  <p>
    Once you have a serializer, you can create a view to handle API requests. DRF provides several view classes, such as <code>APIView</code> and <code>ModelViewSet</code>, which simplify the process of creating API views.
  </p>
  <pre>{`from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer`}</pre>
  <p>
    The <code>ModelViewSet</code> automatically provides CRUD operations for the `Post` model, including list, create, update, and delete functionality. To wire up the viewset to a URL, you need to use DRF’s router system:
  </p>
  <pre>{`from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = router.urls`}</pre>
  <p>
    This will create a RESTful API for the `Post` model, accessible at the `/posts/` endpoint. DRF automatically provides endpoints for retrieving, creating, updating, and deleting posts. You can also add authentication and permissions to your API views to ensure secure access.
  </p>
  <p>
    DRF supports a wide range of features, including pagination, filtering, and authentication. For example, you can require authentication for certain views by adding the <code>authentication_classes</code> and <code>permission_classes</code> attributes to your view or viewset. DRF supports several authentication methods, including token-based authentication, session-based authentication, and OAuth2.
  </p>
  <p>
    With Django REST Framework, building and managing RESTful APIs becomes a straightforward and powerful task, allowing you to seamlessly connect your Django backend with other services or front-end frameworks like React or Angular.
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

export default DjangoTutorial;
