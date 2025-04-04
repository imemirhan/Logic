import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Import the Axios instance

// Async thunks for fetching data
export const getEmployers = createAsyncThunk("employers/getEmployers", async (_, thunkAPI) => {
  try {
    const response = await api.get("/employers");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const getEmployerById = createAsyncThunk("employers/getEmployerById", async (employerId, thunkAPI) => {
  try {
    const response = await api.get(`/employers/${employerId}`); // Fetch employer by ID
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Initial state
const initialState = {
  employers: [], // Ensure this is an array
  employerStatus: "idle",
  employerError: null,
};

// Slice
const employerSlice = createSlice({
  name: "employers",
  initialState,
  reducers: {
    clearEmployer: (state) => {
      state.employer = null;
      state.employerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getEmployers
      .addCase(getEmployers.pending, (state) => {
        state.employerStatus = "loading";
        state.employerError = null;
      })
      .addCase(getEmployers.fulfilled, (state, action) => {
        state.employerStatus = "succeeded";
        state.employers = action.payload.employers || []; // Extracting the array correctly
      }) 
      .addCase(getEmployers.rejected, (state, action) => {
        state.employerStatus = "failed";
        state.employerError = action.payload;
      })
      // getEmployerById
      .addCase(getEmployerById.pending, (state) => {
        state.employerStatus = "loading";
        state.employerError = null;
      })
      .addCase(getEmployerById.fulfilled, (state, action) => {
        state.employerStatus = "succeeded";
        state.employer = action.payload;
      })
      .addCase(getEmployerById.rejected, (state, action) => {
        state.employerStatus = "failed";
        state.employerError = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearEmployer } = employerSlice.actions;
export default employerSlice.reducer;