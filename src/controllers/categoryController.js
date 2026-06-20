const Category = require("../models/Category");

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({ success:false, message: "Category name is required" });
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory) {
            return res.status(400).json({ success:false, message: "Category already exists" });
        }
        const category = await Category.create({ name });
        res.status(201).json({ success:true, message: `Category with name ${name} created` })
    } catch (error) {
        res.status(500).json({ success:false, message: "Internal server error" });
    }
};