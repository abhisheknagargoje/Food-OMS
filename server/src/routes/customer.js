const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all customers
router.get("/", (req, res) => {
  db.query("SELECT * FROM Customer", (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

// GET a specific customer by ID
router.get("/:id", (req, res) => {
  const customerId = req.params.id;
  db.query(
    "SELECT * FROM Customer WHERE Customer_id = ?",
    [customerId],
    (err, results) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results[0]);
    }
  );
});

// POST a new customer
router.post("/", (req, res) => {
  const { Customer_id, First_name, Last_name, Email } = req.body;
  db.query(
    "INSERT INTO Customer (Customer_id, First_name, Last_name, Email) VALUES (?, ?, ?, ?)",
    [Customer_id, First_name, Last_name, Email],
    (err, result) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(201).json({
        message: "Customer created successfully",
      });
    }
  );
});

// UPDATE a customer by ID
router.put("/:id", (req, res) => {
  const customerId = req.params.id;
  const { First_name, Last_name, Email } = req.body;
  const updateData = {
    First_name: First_name,
    Last_name: Last_name,
    Email: Email,
  };

  db.query(
    "UPDATE Customer SET ? WHERE Customer_id = ?",
    [updateData, customerId],
    (err, result) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.json({ message: "Customer updated successfully" });
      }
    }
  );
});

// DELETE a customer by ID
router.delete("/:id", (req, res) => {
  const customerId = req.params.id;
  db.query(
    "DELETE FROM Customer WHERE Customer_id = ?",
    [customerId],
    (err, result) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.json({ message: "Customer deleted successfully" });
      }
    }
  );
});

module.exports = router;
