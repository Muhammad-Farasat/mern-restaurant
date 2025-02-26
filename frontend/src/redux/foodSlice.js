import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    dishesDisplay: [],
  },
  reducers: {
    addDish: (state, action) => {
      state.dishesDisplay.push(action.payload);
    },
    removeDish: (state, action) => {
      state.dishesDisplay = state.dishesDisplay.filter(
        (dish) => dish._id !== action.payload
      );
    },
    updateDish: (state, action) => {
      const index = state.dishesDisplay.findIndex(
        (dish) => dish._id === action.payload._id
      );
      if (index !== -1) {
        state.dishesDisplay[index] = action.payload;
      }
    },
    setDishes: (state, action) => {
      state.dishesDisplay = action.payload;
    },
  },
});

export const { addDish, removeDish, updateDish, setDishes } = foodSlice.actions;
export default foodSlice.reducer;