import React from "react";
import "./admin.css";
const Manage = () => {
  return (
    <div className="section">
      <h2>Manage Courses</h2>
      <button className="button">Add New Course</button>
      <ul className="course-list">
        <li>
          <span>React Basics</span>
          <button className="button">Edit</button>
          <button className="button">Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default Manage;
