import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// ADD Education
export const addEducation = createAsyncThunk("education/addEducation", async (data, thunkAPI) => {
  try {
    const response = await api.post("/educations", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// DELETE Education
export const deleteEducation = createAsyncThunk("education/deleteEducation", async (educationId, thunkAPI) => {
  try {
    await api.delete(`/educations/${educationId}`);
    return educationId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const educationSlice = createSlice({
  name: "education",
  initialState: {
    education: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEducation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.education.push(action.payload);
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteEducation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.education = state.education.filter(e => e.id !== action.payload);
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default educationSlice.reducer;
