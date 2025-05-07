import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// ADD Experience
export const addExperience = createAsyncThunk("experience/addExperience", async (data, thunkAPI) => {
  try {
    const response = await api.post("/experiences", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// DELETE Experience
export const deleteExperience = createAsyncThunk("experience/deleteExperience", async (experienceId, thunkAPI) => {
  try {
    await api.delete(`/experiences/${experienceId}`);
    return experienceId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    experience: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience.push(action.payload);
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience = state.experience.filter(e => e.id !== action.payload);
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default experienceSlice.reducer;
