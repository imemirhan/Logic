import { createSlice } from "@reduxjs/toolkit";

var userData = null;

const initialState = {
  user: userData ?? null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      userData = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      userData = null;
      state.error = null;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});

export const { setUser, clearUser, getUser } = userSlice.actions;
export default userSlice.reducer;