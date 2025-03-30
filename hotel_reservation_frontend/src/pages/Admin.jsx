import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css"; 

const Admin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = isSignup
        ? "http://localhost:5000/admin/register"
        : "http://localhost:5000/admin/login";

      const response = await axios.post(url, { username, password });

      if (!isSignup) {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redirect to Home after Login
      } else {
        alert("Admin registered successfully! Please log in.");
        setIsSignup(false);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="admin-container">
      <h2>{isSignup ? "Admin Sign-Up" : "Admin Login"}</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </div>
      <button onClick={handleSubmit} className="login-btn">
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="toggle-auth">
        {isSignup ? "Already have an account? " : "Don't have an account? "}
        <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
          {isSignup ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default Admin;
