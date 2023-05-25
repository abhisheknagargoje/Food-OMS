const mysql = require("mysql2");
require("dotenv").config();
// Create a connection
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "FoodOrderManagement",
});

module.exports = connection;
