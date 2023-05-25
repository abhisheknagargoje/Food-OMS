import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomersPage.css";
import { useNavigate, Link } from "react-router-dom";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const navigate = useNavigate();
  const handleEdit = (customerId) => {
    navigate(`/customers/${customerId}/edit`);
  };

  const handleDelete = async (customerId) => {
    await axios.delete(`http://localhost:3001/customers/${customerId}/`);
    fetchCustomers();
  };

  const handleViewOrders = (customerId) => {
    navigate(`/orders/${customerId}/`);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Customers</h1>
      <Link to="/customers/add" className="add-customer-button">
        Add Customer
      </Link>
      <div className="row">
        {customers.map((customer) => (
          <div className="col-md-4 mb-4" key={customer.Customer_id}>
            <div className="card">
              <h5 className="card-header">{customer.Customer_id}</h5>
              <div className="card-body">
                <h5 className="card-title">
                  {customer.First_name} {customer.Last_name}
                </h5>
                <p className="card-text">Email: {customer.Email}</p>
                <div className="card-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(customer.Customer_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(customer.Customer_id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewOrders(customer.Customer_id)}
                  >
                    View Customer Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
