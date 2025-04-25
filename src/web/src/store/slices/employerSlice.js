import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Import the Axios instance

// Async thunk for fetching all employers
export const getEmployers = createAsyncThunk("employers/getEmployers", async (_, thunkAPI) => {
  try {
    const response = await api.get("/employers");
    return response.data;  // Assuming this returns an array of employers
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Initial state
const initialState = {
  employers: [],  // This will hold the array of employers
  employerStatus: "idle",  // Track the status of fetching data
  employerError: null,  // Track any errors during fetching
};

// Slice
const employerSlice = createSlice({
  name: "employers",
  initialState,
  reducers: {
    clearEmployers: (state) => {
      state.employers = [];  // Clear the employers list
      state.employerError = null;  // Clear any errors
    },
  },
  extraReducers: (builder) => {
    builder
      // getEmployers
      .addCase(getEmployers.pending, (state) => {
        state.employerStatus = "loading";  // Set loading status
        state.employerError = null;  // Clear errors while loading
      })
      .addCase(getEmployers.fulfilled, (state, action) => {
        state.employerStatus = "succeeded";  // Set success status
        state.employers = action.payload || [];  // Store the fetched employers
      })
      .addCase(getEmployers.rejected, (state, action) => {
        state.employerStatus = "failed";  // Set failure status
        state.employerError = action.payload;  // Store the error message
      });
  },
});

// Export actions and reducer
export const { clearEmployers } = employerSlice.actions;
export default employerSlice.reducer;