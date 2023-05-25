import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewOrderPage.css";

const NewOrderPage = () => {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/orders", {
        Customer_id: customerId,
        Amount: amount,
      });

      // Redirect to the orders page after successful creation
    } catch (error) {
      console.error("Error creating order:", error);
    }
    navigate("/orders");
  };

  return (
    <div className="container">
      <h1 className="title">Create New Order</h1>
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default NewOrderPage;
