import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null, // Stores user information
  status: "idle", // idle | loading | succeeded | failed
  error: null, // Stores error messages
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;