import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import {Link, useNavigate } from "react-router-dom"; // Ensure this is imported
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Using the useNavigate hook

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
      setError(""); // Clear previous errors
      setEmail(""); // Clear the email field
      // Navigate to the login page after successful email sent
      navigate("/login");
    } catch (error) {
      setError("Error sending password reset email. Please try again.");
      setMessage(""); // Clear success message
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Forgot Password</h2>
        <h3 className="login-subtitle">Enter your email to reset your password</h3>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handlePasswordReset} className="login-form">
          <table>
            <tbody>
              <tr>
                <td><label>Email:</label></td>
                <td><input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="center">
                  <button type="submit" className="login-button">Send Reset Link</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p className="login-link">Remembered your password? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPassword;
