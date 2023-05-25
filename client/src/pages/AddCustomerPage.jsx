import { useState } from "react";
import axios from "axios";
import "./AddCustomerPage.css";
import { useNavigate } from "react-router-dom";

const AddCustomerPage = () => {
  const [customer, setCustomer] = useState({
    Customer_id: "",
    First_name: "",
    Last_name: "",
    Email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/customers", customer);
      console.log("Customer added successfully");
      // Reset form fields after successful addition
      setCustomer({
        Customer_id: "",
        First_name: "",
        Last_name: "",
        Email: "",
      });
      navigate("/customers");
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="container">
      <h1>Add Customer</h1>
      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="text"
            id="customerId"
            name="Customer_id"
            value={customer.Customer_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="First_name"
            value={customer.First_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="Last_name"
            value={customer.Last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={customer.Email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomerPage;
