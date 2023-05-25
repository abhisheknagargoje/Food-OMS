import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CustomerOrder.css";

const CustomerOrders = () => {
  const { Customer_id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/orders?customer_id=${Customer_id}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="customer-orders-container">
      <h1>Orders for Customer ID: {Customer_id}</h1>
      {orders.map((order) => (
        <div className="order-card" key={order.Order_id}>
          <h3 className="order-id">Order ID: {order.Order_id}</h3>
          <p className="order-amount">Amount: {order.Amount}</p>
          <p className="order-date">Date: {order.Date}</p>
          <p className="order-time">Time: {order.Time}</p>
          <hr className="order-divider" />
        </div>
      ))}
    </div>
  );
};

export default CustomerOrders;
