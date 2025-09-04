import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Dish = {
  id: number;
  dishName: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
};

type OrderItem = Dish & { qty: number };

type OrdersState = {
  orders: { [tableId: number]: OrderItem[] };
  finishedOrders: {
    tableId: number;
    items: OrderItem[];
    total: number;
    date: string;
  }[];
};

const initialState: OrdersState = {
  orders: {},
  finishedOrders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (
      state,
      action: PayloadAction<{ tableId: number; dish: Dish }>
    ) => {
      const { tableId, dish } = action.payload;
      if (!state.orders[tableId]) {
        state.orders[tableId] = [];
      }
      const existing = state.orders[tableId].find((d) => d.id === dish.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.orders[tableId].push({ ...dish, qty: 1 });
      }
    },
    increaseQty: (
      state,
      action: PayloadAction<{ tableId: number; dishId: number }>
    ) => {
      const dish = state.orders[action.payload.tableId]?.find(
        (d) => d.id === action.payload.dishId
      );
      if (dish) dish.qty += 1;
    },
    decreaseQty: (
      state,
      action: PayloadAction<{ tableId: number; dishId: number }>
    ) => {
      const orderList = state.orders[action.payload.tableId];
      if (!orderList) return;
      const dish = orderList.find((d) => d.id === action.payload.dishId);
      if (dish) {
        dish.qty -= 1;
        if (dish.qty <= 0) {
          state.orders[action.payload.tableId] = orderList.filter(
            (d) => d.id !== action.payload.dishId
          );
        }
      }
    },
    finishOrder: (state, action: PayloadAction<number>) => {
      const tableId = action.payload;
      const items = state.orders[tableId] || [];
      if (items.length === 0) return;

      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      state.finishedOrders.push({
        tableId,
        items,
        total,
        date: new Date().toLocaleString(),
      });

      state.orders[tableId] = [];
    },
  },
});

export const { addOrder, increaseQty, decreaseQty, finishOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
