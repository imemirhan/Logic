import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// ------------------ Async Thunks ------------------

// Fetch jobs
export const getJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params = {}) => {
    const response = await api.get("/jobs", { params });
    return response.data;
  }
);

//Fetch by employer id
export const getJobsByEmployerId = createAsyncThunk(
  "jobs/fetchJobsByEmployerId",
  async (employerId) => {
    const response = await api.get(`/jobs/employer/${employerId}`);
    return response.data;
  }
);

// Create job
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData) => {
    const response = await api.post("/jobs", jobData);
    return response.data.job; // Assuming response has a `job` property
  }
);

// Update job
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async (jobData) => {
    const response = await api.put("/jobs", jobData);
    return response.data.job;
  }
);

// Delete job
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId) => {
    await api.delete(`/jobs/${jobId}`);
    return jobId; // So we can remove it from state
  }
);

// ------------------ Slice ------------------

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
      // Fetch
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
      })

      .addCase(getJobsByEmployerId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobsByEmployerId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload.jobs;
        state.totalItems = action.payload.totalItems;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(getJobsByEmployerId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.unshift(action.payload); // Add new job to the top
        state.totalItems += 1;
      })

      // Update
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
        state.totalItems -= 1;
      });
  },
});

export default jobsSlice.reducer;
