import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://oluyemiclassicit.free.nf/login.php", {
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

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://oluyemiclassicit.free.nf/forgot_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (data.success) {
        alert("A password reset link has been sent to your email.");
        setShowForgotPassword(false);
      } else {
        alert(data.error || "Email not found.");
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

      {showForgotPassword ? (
        <div className="forgot-password-container">
          <h3>Forgot Password</h3>
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <button onClick={handleForgotPassword} className="reset-btn">Reset Password</button>
          <button onClick={() => setShowForgotPassword(false)} className="back-btn">Back to Login</button>
        </div>
      ) : (
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

          <p className="forgot-password-link">
            <button onClick={() => setShowForgotPassword(true)} className="forgot-btn">Forgot Password?</button>
          </p>

          <p className="switch-page">
            Don't have an account? <Link to="/register">Register now</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
