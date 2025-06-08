import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        alert("✅ Login successful!");
        navigate("/");
      } else {
        alert(`❌ ${response.data.msg || "Invalid email or password."}`);
      }
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      alert("⚠️ Invalid Email or Password.");
    }
    setLoading(false);
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
        {/* Forgot Password Link */}
        <p style={{ marginTop: '10px' }}>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </p>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? (
            <>
              Logging in
              <Spinner />
            </>
          ) : (
            "Login"
          )}
        </button>
        <p className="switch-page">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </form>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .forgot-password-link {
          font-size: 0.9rem;
          color: #3498db;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }
        .forgot-password-link:hover {
          text-decoration: underline;
          color: #217dbb;
        }
      `}</style>
    </div>
  );
};

export default Login;
