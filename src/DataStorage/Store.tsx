import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./TabelSlice";
import menuReducer from "./MenuSlice";
import ordersReducer from "./OrderSlice";
// import historyReducer from "../components/history/History";

 const store = configureStore({
  reducer: {
    tables: tablesReducer,
    menu: menuReducer,
    orders: ordersReducer,
    // history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
