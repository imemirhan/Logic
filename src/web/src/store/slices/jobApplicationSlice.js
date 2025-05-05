import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Axios instance

export const createJobApplication = createAsyncThunk(
  "jobApplications/createJobApplication",
  async (jobApplicationData, thunkAPI) => {
    try {
      const response = await api.post("/job-applications", { jobApplication: jobApplicationData });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  applicationStatus: "idle",
  applicationError: null,
  submittedApplication: null,
};

const jobApplicationSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {
    clearJobApplicationState: (state) => {
      state.applicationStatus = "idle";
      state.applicationError = null;
      state.submittedApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobApplication.pending, (state) => {
        state.applicationStatus = "loading";
        state.applicationError = null;
      })
      .addCase(createJobApplication.fulfilled, (state, action) => {
        state.applicationStatus = "succeeded";
        state.submittedApplication = action.payload;
        state.applicationError = null;
      })
      .addCase(createJobApplication.rejected, (state, action) => {
        state.applicationStatus = "failed";
        state.applicationError = action.payload;
      });
  },
});

export const { clearJobApplicationState } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
