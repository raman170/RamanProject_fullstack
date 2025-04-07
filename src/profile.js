import React, { useState } from 'react';
import './profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contact: '',
    city: '',
    state: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    alert('Profile saved!');
    console.log(formData);
  };

  const handleCancel = () => {
    alert('Changes canceled');
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
  
      <label>First Name</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} />
  
      <label>Last Name</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} />
  
      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
  
      <label>Address</label>
      <input name="address" value={formData.address} onChange={handleChange} />
  
      <label>Contact Number</label>
      <input name="contact" value={formData.contact} onChange={handleChange} />
  
      <label>City</label>
      <input name="city" value={formData.city} onChange={handleChange} />
  
      <label>State</label>
      <input name="state" value={formData.state} onChange={handleChange} />
  
      <label>Password</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} />
  
      <div className="button-group">
        <button className="button-cancel" onClick={handleCancel}>Cancel</button>
        <button className="button-save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );  
};

export default Profile;
