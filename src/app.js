const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to the Inventory Management API");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
