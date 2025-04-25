import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Import Axios instance

// Fetch jobs from API using the Axios instance
export const getSingleJob = createAsyncThunk(
    "jobs/fetchSingleJob",
    async (id) => {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    }
  );
  
  const singleJobSlice = createSlice({
    name: "job",  // this is fine
    initialState: {
      job: [],  // job is an object, not an array
      status: "idle",
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSingleJob.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getSingleJob.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.job = action.payload; // Store the job data here
        })
        .addCase(getSingleJob.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });
  
  export default singleJobSlice.reducer;
  