import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/oluyemi_backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        navigate("/");  // ✅ Redirect to homepage
      } else {
        alert(data.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="login-container">
      <h1>Oluyemi Classic IT.</h1>
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

        {/* Link to Register Page */}
        <p className="switch-page">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
