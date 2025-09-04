import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Dish = {
  id: number;
  dishName: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
};

type Order = {
  tableId: number;
  items: Dish[];
};

type HistoryState = {
  history: {
    [date: string]: {
      [tableId: number]: Dish[];
    };
  };
};

const initialState: HistoryState = {
  history: {},
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<Order>) => {
      const today = new Date().toISOString().split("T")[0]; 
      const { tableId, items } = action.payload;

      if (!state.history[today]) {
        state.history[today] = {};
      }

      state.history[today][tableId] = items;
    },
    clearHistory: (state) => {
      state.history = {};
    },
  },
});

export const { addHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
