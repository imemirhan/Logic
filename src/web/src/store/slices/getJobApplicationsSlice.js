import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getJobApplicationsByJobSeeker = createAsyncThunk(
  "jobApplications/getByJobSeeker",
  async (jobSeekerId, thunkAPI) => {
    try {
      const response = await api.get(`/job-applications/job-seeker/${jobSeekerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJobApplicationsByEmployer = createAsyncThunk(
  "jobApplications/getByEmployer",
  async (employerId, thunkAPI) => {
    try {
      const response = await api.get(`/job-applications/employer/${employerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const getJobApplications = createSlice({
  name: "jobApplications",
  initialState: {
    applications: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobApplicationsByJobSeeker.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobApplicationsByJobSeeker.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = action.payload;
      })
      .addCase(getJobApplicationsByJobSeeker.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getJobApplicationsByEmployer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobApplicationsByEmployer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = action.payload;
      })
      .addCase(getJobApplicationsByEmployer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getJobApplications.reducer;
