import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Analytics from "./analytics";
import Content from "./content";
import Manage from "./manage";
import Setting from "./setting";
import User from "./useradmin";
import "./admin.css";

const Admin = () => {
  return (
    <Router>
      <div className="admin-container">
        <div className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/manage">Manage Courses</Link></li>
            <li><Link to="/useradmin">User Management</Link></li>
            <li><Link to="/content">Content Moderation</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/setting">Settings</Link></li>
          </ul>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/manage" element={<Manage />} />
            <Route path="/useradmin" element={<User />} />
            <Route path="/content" element={<Content />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
