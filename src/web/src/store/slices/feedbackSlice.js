import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async ({ name, email, message }, { rejectWithValue }) => {
    try {
      const response = await api.post("/feedbacks", {
        name,
        email,
        message,
      });
      return response.data.feedback;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send feedback."
      );
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedback: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetFeedbackState: (state) => {
      state.feedback = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedback = action.payload;
        state.error = null;
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to send feedback.";
      });
  },
});

export const { resetFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;