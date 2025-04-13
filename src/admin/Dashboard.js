// src/admin/Dashboard.js
import React from 'react';
import AdminSidebar from './AdminSidebar';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
      <h2>Dashboard</h2>
    <div style={{ border: '1px solid #000', padding: '20px', marginBottom: '20px' }}>
      <h3>Dashboard Overview</h3>
      <p>Key metrics and system updates displayed here.</p>
    </div>
    <div style={{ border: '1px solid #000', padding: '20px', marginBottom: '20px' }}>
      <h3>Manage Courses</h3>
      <p>Add, edit, and delete courses from the dashboard.</p>
    </div>
    <div style={{ border: '1px solid #000', padding: '20px', marginBottom: '20px' }}>
      <h3>User Management</h3>
      <p>Control user access and permissions.</p>
    </div>
    </div>
    </div>
  );
}
