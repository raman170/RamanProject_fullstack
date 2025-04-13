import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css";
import "./Home";
import "./User";
import "./admin/AdminRoutes";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      // Check if it's the admin credentials
      if (email === "ramandeepkaur860220@gmail.com" && password === "admin@123") {
        navigate("./admin/AdminRoutes");
      } else {
        navigate("/User");
      }
  
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box" >
        <h2 className="login-title">Welcome to StackFullAcademy</h2>
        <h3 className="login-subtitle">Login</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <table>
            <tbody>
              <tr>
                <td><label>Email:</label></td>
                <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></td>
              </tr>
              <tr>
                <td><label>Password:</label></td>
                <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></td>
              </tr>
              <tr>
                <td colSpan="2" className="center">
                  <button type="submit" className="login-button">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p className="login-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <p className="login-link"><Link to="/forgotpass">Forgot Password?</Link></p>
      </div>
    </div>
  );
};

export default Login;