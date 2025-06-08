import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [orders, setOrders] = useState([]);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(storedUser);
    setUpdatedUser(storedUser);

    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders.filter(order => order.userEmail === storedUser?.email));
  }, [navigate]);

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditing(false);
    showSuccessModal('Profile updated successfully!');
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      showSuccessModal("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://oluyemiclassicit.free.nf/change_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        showSuccessModal("Password changed successfully!");
        setShowChangePassword(false);
      } else {
        showSuccessModal(data.error || "Incorrect current password.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showSuccessModal("An error occurred. Please try again later.");
    }
  };

  const showSuccessModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        {editing ? (
          <>
            <label>Name:</label>
            <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />
            <label>Email:</label>
            <input type="email" name="email" value={updatedUser.email} onChange={handleChange} disabled />
            <button onClick={handleSave} className="save-btn">Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
            <button onClick={() => setShowChangePassword(true)} className="change-password-btn">Change Password</button>
          </>
        )}
      </div>

      {showChangePassword && (
        <div className="change-password-container">
          <h3>Change Password</h3>
          <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handleChangePassword} className="save-password-btn">Save Password</button>
          <button onClick={() => setShowChangePassword(false)} className="cancel-btn">Cancel</button>
        </div>
      )}

      <h3>Order History</h3>
      {orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <strong>Order #{order.id}</strong> - {order.productName} - 
              <span className={`status ${order.status.toLowerCase()}`}> {order.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      {showModal && (
        <div className="success-modal">
          <p>{modalMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
