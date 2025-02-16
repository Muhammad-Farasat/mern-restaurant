import jwt from "jsonwebtoken";
import Restaurant from "../Models/Restaurant.js";



export const restaurantSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, location, image } =
      req.body;

    const credential = {
      name,
      email,
      password,
      confirmPassword,
      location,
      image,
    };

    if (!credential) {
      return res.status(400).json({ message: "Fill all feilds" });
    }

    const checkEmail = await Restaurant.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({ message: "Already exits" });
    }

    const restaurant = new Restaurant({
      name,
      email,
      password,
      location,
      image,
    });

    await restaurant.save();

    const token = jwt.sign({ id: restaurant._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("restaurant-auth", token, { httpOnly: false, secure: true, sameSite: "None" });

    return res.status(200).json({
      success: true,
      restaurant,
      token,
      message: "Restaurant has been registered",
    });
  } catch (error) {
    console.error("Error in registering", error);
    res.status(500).json({ error: "Internal server error", error });
  }
};

export const restaurantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fill all fields" });
    }

    const restaurant = await Restaurant.findOne({ email });

    const token = jwt.sign({ id: restaurant._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("restaurant-auth", token, { httpOnly: false, secure: true, sameSite: "None" });

    res.status(200).json({ success: true, restaurant, token });
  } catch (error) {
    console.error("Error in logging restaurant", error);
    res.status(500).json({ error: "Internal server error", error });
  }
};

export const restaurantRemove = async (req, res) => {
  try {
    res.clearCookie("restaurant-auth", { httpOnly: false, secure: true, sameSite: "None" });

    return res
      .status(200)
      .json({ message: "Successfully logged out restaurant" });
  } catch (error) {
    console.error("Error in logging out restaurant", error);
    res.status(500).json({ error: "Internal server error", error });
  }
};

export const displayRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.find({});

    return res.status(200).json({ message: "There you go", restaurant });
  } catch (error) {
    console.error("Error in getting all restaurant", error);
    res.status(500).json({ error: "Internal server error", error });
  }
};

export const specificRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.findById(req.params.id);

    return res.status(200).json({ message: "There you go", restaurant });
  } catch (error) {
    console.error("Error in getting all restaurant", error);
    res.status(500).json({ error: "Internal server error", error });
  }
};
