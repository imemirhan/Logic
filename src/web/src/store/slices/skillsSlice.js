import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const addSkill = createAsyncThunk(
    "skills/addSkill",
    async ({ jobSeekerId, title, description, skillType }, thunkAPI) => {
      try {
        const payload = {
          jobSeekerId: jobSeekerId,
          title: title,
          description: description,
          skillType: skillType,
        };
        console.log(payload);
        const response = await api.post("/skills", payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  

// DELETE Skill remains unchanged
export const deleteSkill = createAsyncThunk("skills/deleteSkill", async (skillId, thunkAPI) => {
  try {
    await api.delete(`/skills/${skillId}`);
    return skillId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSkill.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills.push(action.payload); // Assume API returns the added skill
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteSkill.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = state.skills.filter(skill => skill.id !== action.payload);
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default skillsSlice.reducer;
