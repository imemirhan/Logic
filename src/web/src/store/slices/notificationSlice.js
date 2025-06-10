import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../services/api";

// Async thunks

// Create notification
export const createJobSeekerNotification = createAsyncThunk(
  'notifications/create',
  async (notificationData, thunkAPI) => {
    const response = await api.post('jobseeker-notifications', notificationData);
    return response.data.notification;
  }
);

// Get all notifications by job seeker id
export const getNotificationsByJobSeekerId = createAsyncThunk(
  'notifications/getByJobSeekerId',
  async (jobSeekerId, thunkAPI) => {
    const response = await api.get(`jobseeker-notifications/${jobSeekerId}`);
    return response.data.notifications;
  }
);

// Get unopened notifications by job seeker id
export const getNotOpenedNotificationsByJobSeekerId = createAsyncThunk(
  'notifications/getNotOpenedByJobSeekerId',
  async (jobSeekerId, thunkAPI) => {
    const response = await api.get(`jobseeker-notifications/${jobSeekerId}/not-opened`);
    return response.data.notifications;
  }
);

const jobSeekerNotificationsSlice = createSlice({
  name: 'jobSeekerNotifications',
  initialState: {
    list: [],
    unopenedList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearNotifications(state) {
      state.list = [];
      state.unopenedList = [];
      state.error = null;
    },
    markNotificationOpened(state, action) {
      const id = action.payload;
      const notif = state.list.find(n => n.id === id);
      if (notif) notif.isOpened = true;
      const unopenedIndex = state.unopenedList.findIndex(n => n.id === id);
      if (unopenedIndex !== -1) state.unopenedList.splice(unopenedIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // Create notification
      .addCase(createJobSeekerNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobSeekerNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        if (!action.payload.isOpened) {
          state.unopenedList.push(action.payload);
        }
      })
      .addCase(createJobSeekerNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get all notifications
      .addCase(getNotificationsByJobSeekerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationsByJobSeekerId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.unopenedList = action.payload.filter(n => !n.isOpened);
      })
      .addCase(getNotificationsByJobSeekerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get unopened notifications
      .addCase(getNotOpenedNotificationsByJobSeekerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotOpenedNotificationsByJobSeekerId.fulfilled, (state, action) => {
        state.loading = false;
        state.unopenedList = action.payload;
      })
      .addCase(getNotOpenedNotificationsByJobSeekerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearNotifications, markNotificationOpened } = jobSeekerNotificationsSlice.actions;

export const selectNotifications = (state) => state.jobSeekerNotifications.list;
export const selectUnopenedNotifications = (state) => state.jobSeekerNotifications.unopenedList;
export const selectNotificationsLoading = (state) => state.jobSeekerNotifications.loading;
export const selectNotificationsError = (state) => state.jobSeekerNotifications.error;

export default jobSeekerNotificationsSlice.reducer;
