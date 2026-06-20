const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");


// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let totalAmount = 0;

    const order = await Order.create({
      user: req.user.userId,
      totalAmount: 0,
    });

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (item.quantity > product.stockQuantity) {
        return res.status(400).json({
          message: "Insufficient stock available",
        });
      }

      totalAmount += product.price * item.quantity;

      await OrderItem.create({
        order: order._id,
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    order.totalAmount = totalAmount;

    await order.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// List all orders

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get order details by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const orderItems = await OrderItem.find({
      order: order._id,
    }).populate("product", "name price");

    res.status(200).json({
      success: true,
      order,
      items: orderItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};