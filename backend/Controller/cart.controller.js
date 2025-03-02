import Cart from "../Models/Cart.js";
import Restaurant from "../Models/Restaurant.js";




export const addToCart = async (req, res) => {
  try {
    const { userId, restaurantId, foodId, quantity, price, name } = req.body;

    let cart = await Cart.findOne({ userId, restaurantId });

    if (!cart) {
      await Cart.deleteMany({ userId });

      cart = new Cart({
        userId,
        restaurantId,
        items: [],
        totalPrice: 0
      });
    }

    const existingItem = cart.items.find(item => item.foodId.toString() === foodId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity, price, name });
    }

    // Recalculate total
    cart.totalPrice = cart.items.reduce((total, item) =>
      total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      success: true,
      cart: await Cart.populate(cart, { path: 'items.foodId' })
    });
  } catch (error) {
    console.error("Error in add to cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { restaurantId } = req.query;

    // Always return a cart structure
    let cart = await Cart.findOne({ userId, restaurantId })
      .populate("items.foodId");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          userId,
          restaurantId,
          items: [],
          totalPrice: 0
        }
      });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { userId, restaurantId, foodId } = req.body;

    const cart = await Cart.findOne({ userId, restaurantId });


    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);

    console.log(itemIndex);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    cart.items.splice(itemIndex, 1)

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );

      await cart.save();

      // Populate fresh data
      const updatedCart = await Cart.populate(cart, { path: 'items.foodId' });

      return res.status(200).json({
        success: true,
        message: "Item quantity updated",
        cart: updatedCart
      });
    


  } catch (error) {
    console.error("Remove cart item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;

    if (!userId || !restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId or restaurantId in request body"
      });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId, restaurantId },
      {
        $set: {
          items: [],
          totalPrice: 0
        }
      },
      { new: true, runValidators: true }
    ).populate('items.foodId');

    console.log(cart);


    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user and restaurant"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart
    });

  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: "Server error while clearing cart",
      error: error.message
    });
  }
};

export const IncreaseNumberOfItem = async (req, res) => {

  try {

    const { foodId, restaurantId, userId } = req.body

    const cart = await Cart.findOne({ userId, restaurantId })

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" })
    }

    const item = cart.items.find((item) => item.foodId.toString() === foodId)
console.log("This is item", item);

    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    item.quantity += 1

    cart.totalPrice = cart.items.reduce((total, item) =>
      total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      success: true,
      cart: await Cart.populate(cart, { path: 'items.foodId' })
    });

  } catch (error) {

    console.error("Error increasing cart:", error);

    res.status(500).json({
      success: false,
      message: "Server error while increasing cart",
      error: error.message
    });

  }
}

export const DecreaseNumberOfItem = async (req, res) => {

  try {

    const { foodId, restaurantId, userId } = req.body

    const cart = await Cart.findOne({ userId, restaurantId })
    
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" })
    }

    const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId)
    

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1

      cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      await cart.save();

      const updatedCart = await Cart.populate(cart, { path: 'items.foodId' });
      
      return res.status(200).json({
        success: true,
        message: "Item quantity updated",
        cart: updatedCart
      });

    }

    return res.status(200).json({
      success: true,
      message: "Minimum quantity reached (1)",
      cart: await Cart.populate(cart, { path: 'items.foodId' })
    });


  } catch (error) {

    console.error("Error decreasing cart:", error);

    res.status(500).json({
      success: false,
      message: "Server error while decreasing cart",
      error: error.message
    });

  }
}