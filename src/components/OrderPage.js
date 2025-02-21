import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();

    const handleStorageChange = () => {
      loadOrders();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  };

  const clearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]); // Update state to remove orders from UI
  };

  return (
    <div className="order-container">
      <h2>My Orders</h2>

      <div className="order-tabs">
        <button
          className={activeTab === "ongoing" ? "active-tab" : ""}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={activeTab === "completed" ? "active-tab" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {activeTab === "ongoing" && (
        <div className="order-list">
          {orders.length > 0 ? (
            <>
              <button className="clear-orders-btn" onClick={clearOrders}>
                Clear Orders
              </button>
              {orders.map((order, index) => (
                <div key={index} className="order-item">
                  <img src={order.image} alt={order.name} />
                  <div className="order-details">
                    <h3>{order.name}</h3>
                    <p>Price per unit: ${order.price}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Total Price: ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-orders">
              <p>No ongoing orders found.</p>
              <button className="add-to-cart-btn" onClick={() => navigate("/")}>
                Add Gadget or Accessories to Cart
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="order-list">
          <p>No completed orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
