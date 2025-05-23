import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const uploadResume = createAsyncThunk(
  "jobSeeker/uploadResume",
  async ({ jobSeekerId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("jobSeekerId", jobSeekerId);
      formData.append("file", file);

      const response = await api.post("/jobseekers/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload resume"
      );
    }
  }
);

export const deleteResume = createAsyncThunk(
  "jobSeeker/deleteResume",
  async (jobSeekerId, { rejectWithValue }) => {
    try {
      await api.delete(`/jobseekers/resume/${jobSeekerId}`);
      return "Resume deleted successfully.";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete resume"
      );
    }
  }
);

const jobSeekerResumeSlice = createSlice({
  name: "jobSeekerResume",
  initialState: {
    resumeUrl: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetResumeState: (state) => {
      state.resumeUrl = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadResume.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.resumeUrl = action.payload.imageUrl;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete
      .addCase(deleteResume.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state) => {
        state.status = "succeeded";
        state.resumeUrl = null;
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetResumeState } = jobSeekerResumeSlice.actions;
export default jobSeekerResumeSlice.reducer;
