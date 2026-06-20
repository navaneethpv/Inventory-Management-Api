const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRouter");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to the Inventory Management API");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
module.exports = app;
