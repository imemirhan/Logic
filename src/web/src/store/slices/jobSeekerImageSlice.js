import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Axios instance

export const uploadJobSeekerImage = createAsyncThunk(
  "jobSeekerImage/upload",
  async ({ jobSeekerId, file }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("jobSeekerId", jobSeekerId);
      formData.append("file", file);

      const response = await api.post("/jobseekers/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const jobSeekerImageSlice = createSlice({
  name: "jobSeekerImage",
  initialState: {
    loading: false,
    error: null,
    imageUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadJobSeekerImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadJobSeekerImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadJobSeekerImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSeekerImageSlice.reducer;
