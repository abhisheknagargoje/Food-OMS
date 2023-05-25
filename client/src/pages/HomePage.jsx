import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to OMS</h1>
      <div className="home-links">
        <Link to="/orders" className="home-link">
          Orders
        </Link>
        <Link to="/customers" className="home-link">
          Customers
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
