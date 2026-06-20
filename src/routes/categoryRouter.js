const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

router.post("/create", authMiddleware, createCategory);
router.get("/list", authMiddleware, getCategories);

module.exports = router;
