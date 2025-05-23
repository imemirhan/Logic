import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Axios instance

// Existing createJobApplication thunk
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

// New thunk: fetch applications by employer ID
export const fetchApplicationsByEmployerId = createAsyncThunk(
  "jobApplications/fetchByEmployerId",
  async (employerId, thunkAPI) => {
    try {
      const response = await api.get(`/job-applications/employer/${employerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// New thunk: fetch applications by job seeker ID
export const fetchApplicationsByJobSeekerId = createAsyncThunk(
  "jobApplications/fetchByJobSeekerId",
  async (jobSeekerId, thunkAPI) => {
    try {
      const response = await api.get(`/job-applications/job-seeker/${jobSeekerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a job application
export const updateJobApplication = createAsyncThunk(
  "jobApplications/updateJobApplication",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/job-applications/${id}`, {
        jobApplication: updateData,
      });
      return response.data.jobApplication;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update job application"
      );
    }
  }
);

const initialState = {
  applicationStatus: "idle",
  applicationError: null,
  submittedApplication: null,

  // Add these to hold fetched lists
  applicationsByEmployer: [],
  employerApplicationsStatus: "idle",
  employerApplicationsError: null,

  applicationsByJobSeeker: [],
  jobSeekerApplicationsStatus: "idle",
  jobSeekerApplicationsError: null,

  updateStatus: "idle",
  updateError: null,
};

const jobApplicationSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {
    clearJobApplicationState: (state) => {
      state.applicationStatus = "idle";
      state.applicationError = null;
      state.submittedApplication = null;

      state.applicationsByEmployer = [];
      state.employerApplicationsStatus = "idle";
      state.employerApplicationsError = null;

      state.applicationsByJobSeeker = [];
      state.jobSeekerApplicationsStatus = "idle";
      state.jobSeekerApplicationsError = null;

      state.updateStatus = "idle";
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createJobApplication cases
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
      })

      // fetchApplicationsByEmployerId cases
      .addCase(fetchApplicationsByEmployerId.pending, (state) => {
        state.employerApplicationsStatus = "loading";
        state.employerApplicationsError = null;
      })
      .addCase(fetchApplicationsByEmployerId.fulfilled, (state, action) => {
        state.employerApplicationsStatus = "succeeded";
        state.applicationsByEmployer = action.payload;
        state.employerApplicationsError = null;
      })
      .addCase(fetchApplicationsByEmployerId.rejected, (state, action) => {
        state.employerApplicationsStatus = "failed";
        state.employerApplicationsError = action.payload;
      })

      // fetchApplicationsByJobSeekerId cases
      .addCase(fetchApplicationsByJobSeekerId.pending, (state) => {
        state.jobSeekerApplicationsStatus = "loading";
        state.jobSeekerApplicationsError = null;
      })
      .addCase(fetchApplicationsByJobSeekerId.fulfilled, (state, action) => {
        state.jobSeekerApplicationsStatus = "succeeded";
        state.applicationsByJobSeeker = action.payload;
        state.jobSeekerApplicationsError = null;
      })
      .addCase(fetchApplicationsByJobSeekerId.rejected, (state, action) => {
        state.jobSeekerApplicationsStatus = "failed";
        state.jobSeekerApplicationsError = action.payload;
      })

      // updateJobApplication
      .addCase(updateJobApplication.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateJobApplication.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.updateError = null;

        const updated = action.payload;
        const index = state.applications.findIndex(app => app.id === updated.id);
        if (index !== -1) {
          state.applications[index] = updated;
        }

        if (state.application?.id === updated.id) {
          state.application = updated;
        }
      })
      .addCase(updateJobApplication.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error.message;
      });
  },
});

export const { clearJobApplicationState } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
