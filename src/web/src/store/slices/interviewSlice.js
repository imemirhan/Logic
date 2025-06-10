import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../services/api";

// Async thunks
export const fetchInterviewById = createAsyncThunk(
  'interviews/fetchById',
  async (interviewId, thunkAPI) => {
    const response = await api.get(`/interviews/${interviewId}`);
    return response.data.interview;
  }
);

export const fetchInterviewByJobSeekerId = createAsyncThunk(
  'interviews/fetchByJobSeekerId',
  async (jobSeekerId, thunkAPI) => {
    const response = await api.get(`/interviews/${jobSeekerId}`);
    return response.data.interview;
  }
);

export const createInterview = createAsyncThunk(
  'interviews/create',
  async (interviewData, thunkAPI) => {
    const response = await api.post('/interviews', interviewData);
    return response.data.interview;
  }
);

export const updateInterview = createAsyncThunk(
  'interviews/update',
  async ({ id, data }, thunkAPI) => {
    console.log("Updating interview with ID:", id, "and data:", data);
    const response = await api.put(`/interviews/${id}`, data);
    return response.data.interview;
  }
);

export const cancelInterview = createAsyncThunk(
  'interviews/cancel',
  async (interviewId, thunkAPI) => {
    const response = await api.delete(`/interviews/${interviewId}`);
    return interviewId; // just return id for removing or marking canceled in state
  }
);

// Slice
const interviewSlice = createSlice({
  name: 'interviews',
  initialState: {
    currentInterview: null,
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentInterview(state) {
      state.currentInterview = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch by id
      .addCase(fetchInterviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInterview = action.payload;
      })
      .addCase(fetchInterviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create
      .addCase(createInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // update
      .addCase(updateInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInterview.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
        if (state.currentInterview?.id === action.payload.id) {
          state.currentInterview = action.payload;
        }
      })
      .addCase(updateInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // cancel (soft delete)
      .addCase(cancelInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelInterview.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex(i => i.id === action.payload);
        if (idx !== -1) {
          // Mark interview as canceled - depends on your backend field, here assume IsAccepted=false or a status
          state.list[idx].isCanceled = true; 
          if (state.currentInterview?.id === action.payload) {
            state.currentInterview.isCanceled = true;
          }
        }
      })
      .addCase(cancelInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentInterview } = interviewSlice.actions;

export const selectCurrentInterview = (state) => state.interviews.currentInterview;
export const selectInterviewLoading = (state) => state.interviews.loading;
export const selectInterviewError = (state) => state.interviews.error;

export default interviewSlice.reducer;
