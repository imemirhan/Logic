import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const updateJobSeekerInfo = createAsyncThunk(
  "user/updateJobSeekerInfo",
  async ({ jobSeekerId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/jobseekers/${jobSeekerId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating job seeker:", error.response || error.message);

      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateEmployerInfo = createAsyncThunk(
  "user/updateEmployerInfo",
  async ({ employerId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/employers/${employerId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating employer:", error.response || error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const initialState = {
  user: null, // or {}
  status: "idle",
  error: null,
};


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateJobSeekerInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateJobSeekerInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.jobSeeker) {
          state.user = { ...state.user, ...action.payload.jobSeeker };
        } else {
          state.user = action.payload;
        }
      })
      .addCase(updateJobSeekerInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateEmployerInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateEmployerInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.employer) {
          state.user = { ...state.user, ...action.payload.employer };
        } else {
          state.user = action.payload;
        }
      })
      .addCase(updateEmployerInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;