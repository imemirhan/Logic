import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getJobSeekers = createAsyncThunk("jobseekers/getJobSeekers", async (_, thunkAPI) => {
  try {
    const response = await api.get("/jobseekers");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const getJobSeekerById = createAsyncThunk("jobseekers/getJobSeekerById", async (jobSeekerId, thunkAPI) => {
  try {
    const response = await api.get(`/jobseekers/${jobSeekerId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const initialState = {
  jobSeekers: [],
  jobSeeker: null,
  jobSeekerStatus: "idle",
  jobSeekerError: null,
};

const jobSeekerSlice = createSlice({
  name: "jobSeekers",
  initialState,
  reducers: {
    clearJobSeeker: (state) => {
      state.jobSeeker = null;
      state.jobSeekerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobSeekers.pending, (state) => {
        state.jobSeekerStatus = "loading";
        state.jobSeekerError = null;
      })
      .addCase(getJobSeekers.fulfilled, (state, action) => {
        state.jobSeekerStatus = "succeeded";
        state.jobSeekers = action.payload.jobSeekers || [];
        state.jobSeekerError = null;
      })
      .addCase(getJobSeekers.rejected, (state, action) => {
        state.jobSeekerStatus = "failed";
        state.jobSeekerError = action.payload || action.error.message;
      })

      .addCase(getJobSeekerById.pending, (state) => {
        state.jobSeekerStatus = "loading";
        state.jobSeekerError = null;
      })
      .addCase(getJobSeekerById.fulfilled, (state, action) => {
        state.jobSeekerStatus = "succeeded";
        state.jobSeeker = action.payload;
        state.jobSeekerError = null;
      })
      .addCase(getJobSeekerById.rejected, (state, action) => {
        state.jobSeekerStatus = "failed";
        state.jobSeekerError = action.payload || action.error.message;
      });
  },
});

export const { clearJobSeeker } = jobSeekerSlice.actions;
export default jobSeekerSlice.reducer;