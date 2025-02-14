import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, restaurantId, totalPrice } = req.body;

    if (!userId || !restaurantId || !totalPrice) {
      return res.status(400).json({message: "Compelete data not sent"})
    }

    const cart = await Cart.findOne({ userId, restaurantId });

    console.log(req.body);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const newOrder = new Order({
      userId,
      restaurantId,
      items: cart.items, 
      totalPrice,
    });

    await newOrder.save();

    await Cart.deleteOne({ userId, restaurantId });

    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).populate("items.foodId");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const getRestaurantOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const orders = await Order.find({ restaurantId }).populate("items.foodId userId");  

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
    console.log(error);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log(orderId, status);

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
