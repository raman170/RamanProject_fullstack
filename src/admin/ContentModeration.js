
import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { collection, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function ContentModeration() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(list);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = (id) => {
    alert(`✅ Approved message ID: ${id}`);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'messages', id));
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h2>Content Moderation</h2>
        {items.length === 0 && <p>No messages to moderate.</p>}
        {items.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
            <p><strong>Name:</strong> {item.name || "Anonymous"}</p>
            <p><strong>Message:</strong> {item.message}</p>
            <p><strong>Submitted:</strong> {item.timestamp?.toDate().toLocaleString() || "N/A"}</p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleApprove(item.id)} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white' }}>
                Approve
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
