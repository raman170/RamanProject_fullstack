// src/admin/ManageCourses.js
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import './AdminSidebar.css';

export default function ManageCourses(){
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([
    { id: 1, name: "C" },
    { id: 2, name: "C++" },
    { id: 3, name: "HTML" },
    { id: 4, name: "Python" },
    { id: 5, name: "Java" },
    { id: 6, name: "CSS" },
    { id: 7, name: "JavaScript" },
    { id: 8, name: "PHP" },
    { id: 9, name: "C#" },
    { id: 10, name: "Bootstrap" },
    { id: 11, name: "jQuery" },
    { id: 12, name: "Django" },
    { id: 13, name: "MySQL" },
    { id: 14, name: "React" },
    { id: 15, name: "Node.js" }
  ]);

  const handleSearch = () => {
    const cards = document.querySelectorAll(".course-row");
    let matchFound = false;

    cards.forEach((card) => {
      const name = card.getAttribute("data-name").toLowerCase();
      if (name.includes(query.toLowerCase().trim()) && query !== "") {
        card.style.border = "2px solid #1976d2";
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        matchFound = true;
      } else {
        card.style.border = "1px solid #ccc";
      }
    });

    if (!matchFound && query !== "") {
      alert("No matching course found.");
    }

    setTimeout(() => {
      cards.forEach((card) => {
        card.style.border = "1px solid #ccc";
      });
    }, 3000);
  };

  const handleEdit = (id) => {
    const courseToEdit = courses.find(c => c.id === id);
    const newName = prompt("Edit course name:", courseToEdit.name);
    if (newName && newName.trim() !== "") {
      setCourses(courses.map(course =>
        course.id === id ? { ...course, name: newName.trim() } : course
      ));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleAdd = () => {
    const name = prompt("Enter course name:");
    if (name && name.trim() !== "") {
      const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
      setCourses([...courses, { id: newId, name: name.trim() }]);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
      <h2>Manage Courses</h2>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="search-bar"
            aria-label="Search"
          />
          <button onClick={handleSearch} className="btn" style={{ marginLeft: '10px' }}>Search</button>
          <button onClick={handleAdd} className="btn" style={{ marginLeft: '10px' }}>Add New Course</button>
        </div>

        <div className="course-list-container">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-row"
              data-name={course.name.toLowerCase()}
            >
              <span>{course.name}</span>
              <div>
                <button onClick={() => handleEdit(course.id)} className="btn" style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(course.id)} className="btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
    </div>
    </div>
  );
}
