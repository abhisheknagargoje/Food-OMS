import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomerPage";
import EditCustomer from "./pages/EditCustomerPage";
import AddCustomer from "./pages/AddCustomerPage";
import OrdersPage from "./pages/OrdersPage";
import NewOrderPage from "./pages/NewOrderPage";
import CustomerOrders from "./pages/CustomerOrders";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:customerId/edit" element={<EditCustomer />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/orders/:Customer_id" element={<CustomerOrders />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/new" element={<NewOrderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
