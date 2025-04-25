import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Axios instance

// Async thunk for fetching a single employer by ID
export const getEmployerById = createAsyncThunk("singleEmployer/getEmployerById", async (employerId, thunkAPI) => {
  try {
    const response = await api.get(`/employers/${employerId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const initialState = {
  employer: null,
  status: "idle",
  error: null,
};

const singleEmployerSlice = createSlice({
  name: "singleEmployer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEmployerById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEmployerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employer = action.payload;
      })
      .addCase(getEmployerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export reducer
export default singleEmployerSlice.reducer;
