import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://oluyemi-classic-production.up.railway.app/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <h1>Oluyemi Classic IT.</h1>
      <h2>Create New Account</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <button type="submit" className="register-btn">Register</button>

        <p className="switch-page">
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
