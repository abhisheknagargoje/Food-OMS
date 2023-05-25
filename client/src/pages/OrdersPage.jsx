import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersPage.css";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate !== "Invalid Date" ? formattedDate : datetime;
  };

  const formatAmount = (amount) => {
    return "₹" + amount.toFixed(2);
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3001/orders/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Orders</h1>
      <Link to="/orders/new" className="btn btn-primary mb-4">
        Create New Order
      </Link>
      {orders.map((order) => (
        <div className="card mb-4" key={order.Order_id}>
          <div className="card-header">
            Order ID: <strong>{order.Order_id}</strong>
          </div>
          <div className="card-body">
            <h5 className="card-title">{formatAmount(order.Amount)}</h5>
            <p className="card-text">Date: {formatDateTime(order.Date)}</p>
            <p className="card-text">Time: {order.Time}</p>
            <p className="card-text">Customer ID: {order.Customer_id}</p>
          </div>
          <div className="card-buttons">
            <button
              className="btn btn-danger"
              onClick={() => deleteOrder(order.Order_id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
