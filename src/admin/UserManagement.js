// src/admin/UserManagement.js
import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { collection, deleteDoc, doc, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import './AdminSidebar.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Sync users from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), snapshot => {
      const userList = snapshot.docs.map(docSnap => ({
        ...docSnap.data(),
        id: docSnap.id
      }));

      console.log("Fetched users from Firestore:", userList); // Debug log
      setUsers(userList);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteDoc(doc(db, 'users', id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = async (id) => {
    const newName = prompt('Enter new username:');
    if (newName) {
      try {
        await updateDoc(doc(db, 'users', id), { username: newName });
      } catch (error) {
        console.error("Edit failed:", error);
      }
    }
  };

  const handleAdd = async () => {
    const username = prompt('Enter username:');
    const email = prompt('Enter email address:');
    if (username && email) {
      const uid = uuidv4();
      try {
        await setDoc(doc(db, 'users', uid), {
          id: uid,
          uid,
          username,
          email
        });
      } catch (error) {
        console.error("Add failed:", error);
      }
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <h2>User Management</h2>
        <button onClick={handleAdd} className="add-btn">Add New User</button>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="user-list" style={{ border: '1px solid #000', padding: '10px' }}>
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              users.map(user => (
                <div key={user.id} className="user-card" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  backgroundColor: '#fafafa'
                }}>
                  <span>{user.username} ({user.email})</span>
                  <div>
                    <button onClick={() => handleEdit(user.id)} className="btn" style={{ marginRight: '10px' }}>Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="btn">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
