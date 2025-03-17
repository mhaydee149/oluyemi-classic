import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";  // Import Axios
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Use Axios for the POST request
      const response = await axios.post("http://localhost/oluyemi-backend/api/login", {
        email,
        password
      });
      

      // ✅ Debugging: Log the response from the server
      console.log("Response:", response.data);

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("✅ Login successful!");
        navigate("/"); // Redirect to homepage
      } else {
        alert(`❌ ${response.data.error || "Invalid email or password."}`);
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("⚠️ Server error! Please check your backend.");
    }
  };

  return (
    <div className="login-container">
      <h1>Oluyemi Classic IT</h1>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        <p className="switch-page">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
