import express from "express";
import { placeOrder, getUserOrders, getRestaurantOrders, updateOrderStatus } from "../Controller/order.controller.js";

const router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/userOrders/:userId", getUserOrders);
router.get("/restaurantOrders/:restaurantId", getRestaurantOrders);
router.put("/updateOrder/:orderId", updateOrderStatus);

export default router;
