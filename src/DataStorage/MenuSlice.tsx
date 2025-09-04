import { createSlice } from "@reduxjs/toolkit";

type dishType = {
  id: number;
  dishName: any;
  description: any;
  price: number;
  category: any;
  available: any;
};

type menuType = {
  menu: dishType[];
};

const initialState: menuType = {
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addDish: (state, action) => {
      const newDish: dishType = {
        id: Date.now(),
        dishName: action.payload.dishName,
        description: action.payload.description,
        price: parseFloat(action.payload.price),
        category: action.payload.category,
        available: action.payload.available,
      };
      state.menu.push(newDish);
    },
    removeDish: (state, action) => {
      state.menu = state.menu.filter((dish) => dish.id !== action.payload);
    },
    toggleAvailability: (state, action) => {
      const dish = state.menu.find((d) => d.id === action.payload);
      if (dish) {
        dish.available = !dish.available;
      }
    },
    editDish: (state, action) => {
      const { id, updatedDish } = action.payload;
      const dishIndex = state.menu.findIndex((d) => d.id === id);
      if (dishIndex !== -1) {
        state.menu[dishIndex] = { ...state.menu[dishIndex], ...updatedDish };
      }
    },
    resetMenu: (state) => {
      state.menu = [];
    },
  },
});

export const { addDish, removeDish, toggleAvailability, editDish, resetMenu } =
  menuSlice.actions;
export default menuSlice.reducer;
