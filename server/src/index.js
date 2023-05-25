const express = require("express");
const cors = require("cors");
const app = express();
const customerRouter = require("./routes/customer");
const orderRouter = require("./routes/orders");

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.use("/customers", customerRouter);
app.use("/orders", orderRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
