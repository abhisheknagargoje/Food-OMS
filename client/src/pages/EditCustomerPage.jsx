import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditCustomerPage.css";

const EditCustomerPage = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
  });

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customers/${customerId}`
      );
      setCustomer(response.data);
      setEditedCustomer(response.data); // Set the initial state when customer data is available
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/customers/${customerId}`,
        editedCustomer
      );
      navigate("/customers"); // Redirect to customers page after successful update
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Edit Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="First_name"
            value={editedCustomer.First_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="Last_name"
            value={editedCustomer.Last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="Email"
            value={editedCustomer.Email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCustomerPage;
