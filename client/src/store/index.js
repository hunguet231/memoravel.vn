import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
});

// reducer
const authReducer = authSlice.reducer;

// store
const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
