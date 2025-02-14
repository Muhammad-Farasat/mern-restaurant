import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { clearCart, clearCartState } from "./cartSlice";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, {dispatch}) => {
    console.log(orderData.restaurantId, orderData.userId);
    

      const res = await fetch("http://localhost:4000/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (res.status === 200 || 201) {
        toast.success("Order placed successfully")
        const data = await res.json();
        dispatch(clearCartState())
        return data.order;
      }else{      
      toast.error("Your order can't be placed")
      console.log(res);
      
    }
    
  }
);

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (userId) => {
    const res = await fetch(`http://localhost:4000/userOrders/${userId}`);
    const data = await res.json();
    return data.orders;
  }
);

// ✅ Fetch Orders for a Restaurant
export const fetchRestaurantOrders = createAsyncThunk(
  "order/fetchRestaurantOrders",
  async (restaurantId) => {
    const res = await fetch(
      `http://localhost:4000/restaurantOrders/${restaurantId}`
    );
    const data = await res.json();
    console.log(data.orders);
    return data.orders;
  }
);

// ✅ Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }) => {
    console.log("This is orderId",orderId);
    
    const res = await fetch(
      `http://localhost:4000/updateOrder/${orderId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    const data = await res.json();
    return data.order;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    restaurantOrders: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(fetchRestaurantOrders.fulfilled, (state, action) => {
        state.restaurantOrders = action.payload;
      })
      .addCase(fetchRestaurantOrders.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.restaurantOrders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.restaurantOrders[index] = action.payload; // Update order status
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});


export default orderSlice.reducer