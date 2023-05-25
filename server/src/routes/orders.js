const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// GET /?customer_id=:customer_id
router.get("/", (req, res) => {
  const { customer_id } = req.query;

  if (customer_id) {
    const query = "SELECT * FROM Order_placed WHERE Customer_id = ?";
    connection.query(query, [customer_id], (err, results) => {
      if (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results);
      }
    });
  } else {
    const query = "SELECT * FROM Order_placed";
    connection.query(query, (err, rows) => {
      if (err) {
        console.error("Error retrieving orders:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(rows);
      }
    });
  }
});

// Get order by ID
router.get("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const query = "SELECT * FROM Order_placed WHERE Order_id = ?";
  connection.query(query, [orderId], (err, rows) => {
    if (err) {
      console.error("Error retrieving order:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (rows.length === 0) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.json(rows[0]);
    }
  });
});

// Create a new order
router.post("/", (req, res) => {
  const { Amount, Customer_id } = req.body;
  const query =
    "INSERT INTO Order_placed (Amount, Date, Time, Customer_id) VALUES (?, CURRENT_DATE(), CURRENT_TIME(), ?)";
  connection.query(query, [Amount, Customer_id], (err, result) => {
    if (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(201).json({ orderId: result.insertId });
    }
  });
});

// Update an order
router.put("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { Amount, Customer_id } = req.body;
  const query =
    "UPDATE Order_placed SET Amount = ?, Customer_id = ? WHERE Order_id = ?";
  connection.query(query, [Amount, Customer_id, orderId], (err, result) => {
    if (err) {
      console.error("Error updating order:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json({ message: "Order updated successfully" });
    }
  });
});

// Delete an order
router.delete("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const query = "DELETE FROM Order_placed WHERE Order_id = ?";
  connection.query(query, [orderId], (err, result) => {
    if (err) {
      console.error("Error deleting order:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json({ message: "Order deleted successfully" });
    }
  });
});

module.exports = router;
