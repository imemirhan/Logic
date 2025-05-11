import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Import Axios instance

// Fetch jobs from API using the Axios instance
export const getJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params = {}) => {
    console.log("Fetching jobs with params:", params); // Log the params for debugging
    const response = await api.get("/jobs", { params });
    return response.data;
  }
);


const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
    totalItems: 0,
    page: 1,
    pageSize: 10,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload.jobs;
        state.totalItems = action.payload.totalItems;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export default jobsSlice.reducer;