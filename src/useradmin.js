import React from "react";
import "./admin.css";
const User = () => {
  return (
    <div className="section">
      <h2>User Management</h2>
      <button className="button">Add New User</button>
      <ul className="user-list">
        <li>
          <span className="user-name" placeholder="Enter user name and email"></span>
          <button className="button">Edit</button>
          <button className="button">Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default User;
