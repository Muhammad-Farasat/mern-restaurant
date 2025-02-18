import express from "express";
import { placeOrder, getUserOrders, getRestaurantOrders, updateOrderStatus } from "../Controller/order.controller.js";

const router = express.Router();

router.post("/api/placeOrder", placeOrder);
router.get("/api/userOrders/:userId", getUserOrders);
router.get("/api/restaurantOrders/:restaurantId", getRestaurantOrders);
router.put("/api/updateOrder/:orderId", updateOrderStatus);

export default router;
