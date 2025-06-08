import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

// Spinner component for inline use
const Spinner = () => (
  <div style={{
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    animation: 'spin 1s linear infinite',
    marginLeft: '8px',
  }} />
);

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        }
      );

      if (response.data.msg === "User created successfully") {
        alert("✅ Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(`❌ ${response.data.msg || "Registration failed."}`);
      }
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      alert("⚠️ Invalid Email.");
    }
    setLoading(false);
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? (
            <>
              Registering
              <Spinner />
            </>
          ) : (
            "Register"
          )}
        </button>
        <p className="switch-page">
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </form>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Registration;
