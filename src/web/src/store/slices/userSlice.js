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



var userData = null;

const initialState = {
  user: userData ?? [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      userData = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      userData = null;
      state.error = null;
    },
    getUser: (state) => {
      if(state.user === null) {
        state.user = localStorage.getItem('persist:root')?.user;
      }
      return state.user;
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
      });
  },
});

export const { setUser, clearUser, getUser } = userSlice.actions;
export default userSlice.reducer;