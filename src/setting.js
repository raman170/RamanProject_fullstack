import React from "react";
import "./admin.css";
const Setting = () => {
  return (
    <div className="section">
      <h2>Settings</h2>
      <form className="settings-form">
        <label>Site Name:</label>
        <input type="text" placeholder="Enter site name" />
        <button className="button">Save</button>
      </form>
    </div>
  );
};

export default Setting;
