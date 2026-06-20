const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createCategory } = require("../controllers/categoryController");
    
router.post("/create", authMiddleware, createCategory);

module.exports = router;