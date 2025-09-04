import { createSlice } from "@reduxjs/toolkit";
type tableDetails={
    tables :number ,
    savedTables: number | null
}
const initialState: tableDetails = {
  tables: 0,
  savedTables: null,
};

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.tables = Number(action.payload) || 0;
    },
    saveTables: (state) => {
      state.savedTables = state.tables;
    },
    resetTables: (state) => {
      state.tables = 0;
      state.savedTables = null;
    },
  },
});

export const { setTables, saveTables, resetTables } = tablesSlice.actions;
export default tablesSlice.reducer;
