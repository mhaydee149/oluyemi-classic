import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";  // Import Axios
import "./Registration.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      alert("⚠️ All fields are required!");
      return;
    }

    // ✅ Debugging: Log the data being sent
    console.log("Sending data:", JSON.stringify({ name: trimmedName, email: trimmedEmail, password: trimmedPassword }));

    try {
      // Use Axios for the POST request
      const response = await axios.post("http://localhost/oluyemi-backend/api/register", {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword
      });
      

      // ✅ Debugging: Log the response from the server
      console.log("Server Response:", response.data);

      if (response.data.success) {
        alert("✅ Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(`❌ ${response.data.error || "Registration failed."}`);
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("⚠️ Server error! Please check your backend.");
    }
  };

  return (
    <div className="register-container">
      <h1>Oluyemi Classic IT</h1>
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
