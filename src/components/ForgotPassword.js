import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });
      setMessage(res.data.msg || 'Check your email for reset instructions.');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your registered email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
