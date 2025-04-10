import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const backend_url = import.meta.env.VITE_BACKEND_URL


export const addToCart = createAsyncThunk('cart/addToCart', 
  async({ userId, restaurantId, foodId, price, quantity, name }) => {
    const res = await fetch(`${backend_url}/api/cart/add`, { // Update endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, restaurantId, foodId, quantity, name, price }),
    });

    if (res.status === 200) {
      toast.success("Added to cart..!")
    }

    const data = await res.json();
    return data.cart;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', 
  async({ userId, restaurantId, foodId }) => { // Add userId
    const res = await fetch(`${backend_url}/api/cart/remove`, { // Update endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, restaurantId, foodId }),
    });
    
    if (res.status === 200) {
      toast.success("Removed from cart..!")
    }
    
    const data = await res.json();
    return data.cart;
});

export const clearCart = createAsyncThunk('cart/clearCart', 
  async({ userId, restaurantId }) => {
    const res = await fetch(`${backend_url}/api/cart/clear`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, restaurantId }),
    });
    
    if (res.status === 200) {
      toast.success("Cleared the cart..!")
    }
    console.log(res);
    
    const data = await res.json();
    return data.cart;
});

export const fetchCart = createAsyncThunk("cart/getCart", 
  async({ userId, restaurantId }) => {
    const res = await fetch(
      `${backend_url}/api/cart/${userId}?restaurantId=${restaurantId}`
    );
    const data = await res.json();
    return data.cart; 
});

export const increaseItemCart = createAsyncThunk("cart/increaseItem", 
  async({foodId, restaurantId, userId}) => {
    const res = await fetch(`${backend_url}/api/cart/increase`, {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({ foodId, restaurantId, userId })
    })

    const data = await res.json()
    return data.cart
  }
)

export const decreaseItemCart = createAsyncThunk("cart/decreaseItem", 
  async({foodId, restaurantId, userId}) => {
    const res = await fetch(`${backend_url}/api/cart/decrease`, {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({ foodId, restaurantId, userId })
    })

    const data = await res.json()
    return data.cart
  }
)

const initialState = {
    items: [],
    restaurantId: null,
    totalPrice: 0,
    status: 'idle'
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartState: (state) => {
            state.items = []; 
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.restaurantId = action.payload.restaurantId;
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.restaurantId = action.payload.restaurantId;
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.restaurantId = action.payload.restaurantId;
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        })
        .addCase(clearCart.fulfilled, (state) => {
            state.cartItems = [];
            state.restaurantId = null;
            state.totalPrice = 0;
        })
        .addCase(increaseItemCart.fulfilled, (state, action) => {
          state.items = action.payload.items;
          state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        })
        .addCase(decreaseItemCart.fulfilled, (state, action) => {
          state.items = action.payload.items;
          state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        });

    }
})


export const { clearCartState}= cartSlice.actions
export default cartSlice.reducer