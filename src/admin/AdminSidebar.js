import { NavLink } from "react-router-dom";
import "./AdminSidebar.css"; // You can also inline style if you want

export default function AdminSidebar() {
  return (
    <div className="sidebar">
      <h3>Admin</h3>
      <ul>
        <li><NavLink to="/admin/Dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/ManageCourses">Manage Courses</NavLink></li>
        <li><NavLink to="/UserManagement">User Management</NavLink></li>
        <li><NavLink to="/ContentModeration">Content Moderation</NavLink></li>
        <li><NavLink to="/Home">Logout</NavLink></li>
      </ul>
    </div>
  );
}