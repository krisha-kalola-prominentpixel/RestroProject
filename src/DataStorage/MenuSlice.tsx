import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DishType = {
  id: number;
  dishName: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
};

type MenuType = {
  menu: DishType[];
};

const initialState: MenuType = {
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addDish: (
      state,
      action: PayloadAction<{
        dishName: string;
        description: string;
        price: number | string;
        category: string;
        available: boolean;
      }>
    ) => {
      if(+(action.payload.price)<=0){
        alert("price canot be negative")
        return
      }
      const dishExists = state.menu.some(
        (dish) =>
          dish.dishName.toLowerCase() ===
          action.payload.dishName.toLowerCase() )
      
      if (dishExists) {
        alert("Dish already exists! or the price can't be negative");
        return;
      }
      const newDish: DishType = {
        id: Date.now(),
        dishName: action.payload.dishName,
        description: action.payload.description,
        price: parseFloat(action.payload.price as string),
        category: action.payload.category,
        available: action.payload.available,
      };
      state.menu.push(newDish);
    },

    removeDish: (state, action: PayloadAction<number>) => {
      state.menu = state.menu.filter((dish) => dish.id !== action.payload);
    },

    toggleAvailability: (state, action: PayloadAction<number>) => {
      const dish = state.menu.find((d) => d.id === action.payload);
      if (dish) {
        dish.available = !dish.available;
      }
    },

    editDish: (
      state,
      action: PayloadAction<{
        id: number;
        updatedDish: Partial<DishType>;
      }>
    ) => {
      const { id, updatedDish } = action.payload;
      if(+(action.payload.updatedDish.price!)<=0){
        alert("price canot be negative")
        return
      }
      const dishExists = state.menu.some(
        (dish) =>
          dish.id !== id &&
          dish.dishName.toLowerCase() ===
            updatedDish.dishName?.toLowerCase()
      );

      if (dishExists) {
        alert("Dish already exists!");
        return;
      }

      const dishIndex = state.menu.findIndex((d) => d.id === id);
      if (dishIndex !== -1) {
        state.menu[dishIndex] = {...state.menu[dishIndex],...updatedDish,
        };
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
