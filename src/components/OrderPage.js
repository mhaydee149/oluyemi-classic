import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("successful"); // Default to 'successful' as per backend
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not authorized. Please login.");
        setLoading(false);
        // Consider redirecting to login: navigate('/login');
        return;
      }

      try {
        const response = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once on mount

  // Filter orders by paymentStatus (e.g., 'successful', 'pending', 'failed')
  // The tabs might need to be adjusted based on these statuses
  const filteredOrders = orders.filter(order => order.paymentStatus === activeTab);

  if (loading) {
    return <div className="order-container"><p>Loading orders...</p></div>;
  }

  if (error) {
    return <div className="order-container"><p>Error: {error}</p></div>;
  }

  return (
    <div className="order-container">
      <h2>My Orders</h2>

      <div className="order-tabs">
        <button
          className={activeTab === "successful" ? "active-tab" : ""}
          onClick={() => setActiveTab("successful")}
        >
          Successful
        </button>
        <button
          className={activeTab === "pending" ? "active-tab" : ""}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={activeTab === "failed" ? "active-tab" : ""}
          onClick={() => setActiveTab("failed")}
        >
          Failed
        </button>
        {/* Add more tabs if other statuses are relevant */}
      </div>

      {filteredOrders.length > 0 ? (
        <>
          {filteredOrders.map((order) => (
            <div key={order._id || order.paymentReference} className="order-item">
              {/* Display main order details */}
              <div className="order-summary">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Total Amount:</strong> ₦{order.totalAmount.toLocaleString()}</p>
                <p><strong>Payment Reference:</strong> {order.paymentReference}</p>
                <p><strong>Status:</strong> <span className={`status-${order.paymentStatus}`}>{order.paymentStatus}</span></p>
                {order.user && typeof order.user === 'object' && <p><strong>User:</strong> {order.user.name} ({order.user.email})</p>}
                {typeof order.user === 'string' && <p><strong>User ID:</strong> {order.user}</p>}
                 <p><strong>Email:</strong> {order.customerEmail}</p>
              </div>
              <h4>Items:</h4>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="order-sub-item">
                    {item.image && <img src={item.image} alt={item.name} className="order-item-image" />}
                    <div className="order-item-details">
                      <p><strong>{item.name}</strong></p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₦{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items listed for this order.</p>
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="no-orders">
          <p>No {activeTab} orders found.</p>
          <button className="add-to-cart-btn" onClick={() => navigate("/")}>
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
