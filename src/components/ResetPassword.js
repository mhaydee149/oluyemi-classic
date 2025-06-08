import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/reset-password/${resetToken}`, 
        { password }
      );
      setMessage(res.data.msg || 'Password reset successful!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Reset password failed.');
    }

    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          placeholder="Enter new password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <input 
          type="password" 
          placeholder="Confirm new password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
