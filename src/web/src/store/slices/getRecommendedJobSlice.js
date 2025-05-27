import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Axios instance

export const fetchRecommendedJobs = createAsyncThunk(
  "recommendedJobs/fetch",
  async (jobSeekerId, thunkAPI) => {
    try {
      const response = await api.post(
        `/jobseekers/${jobSeekerId}/recommendations`,
        { jobSeekerId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommended jobs"
      );
    }
  }
);

const getRecommendedJobSlice = createSlice({
  name: "recommendedJobs",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecommendedJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchRecommendedJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getRecommendedJobSlice.reducer;