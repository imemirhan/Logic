import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
