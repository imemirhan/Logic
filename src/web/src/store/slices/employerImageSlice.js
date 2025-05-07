import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadEmployerImage = createAsyncThunk(
  "employerImage/upload",
  async ({ employerId, file }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("employerId", employerId);
      formData.append("file", file);

      const response = await axios.post("/api/employers/profile-picture", formData, {
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

const employerImageSlice = createSlice({
  name: "employerImage",
  initialState: {
    loading: false,
    error: null,
    imageUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadEmployerImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadEmployerImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadEmployerImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employerImageSlice.reducer;
