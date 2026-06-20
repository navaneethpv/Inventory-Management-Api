const Category = require("../models/Category");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }
    const category = await Category.create({ name });
    res
      .status(201)
      .json({ success: true, message: `Category with name ${name} created` });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while creating category",
    });
  }
};

//Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, categories, count: categories.length });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching categories",
    });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: `Category updated successfully`,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while updating category",
    });
  }
};
