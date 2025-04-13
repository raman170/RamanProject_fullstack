// src/admin/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ManageCourses from './ManageCourses';
import UserManagement from './UserManagement';
import ContentModeration from './ContentModeration';
import Home from '../Home';
import AdminSidebar from './AdminSidebar';

export default function AdminRoutes() {
  return (
    <div>
        <Routes>
          <Route path="*" element={<Dashboard />} />
          <Route path="/ManageCourses" element={<ManageCourses />} />
          <Route path="/ContentModeration" element={<ContentModeration />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    
  );
}
