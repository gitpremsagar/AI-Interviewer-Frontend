import { createSlice } from "@reduxjs/toolkit";
import Skill from "@/types/skill.type";

const initialState: Skill[] = [];

export const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkill: (state, action) => {
      return action.payload;
    },
    addSkill: (state, action) => {
      state.push(action.payload);
    },
    removeSkill: (state, action) => {
      return state.filter((skill) => skill.skillId !== action.payload);
    },
    updateSkill: (state, action) => {
      const { skillId, skillName, skillDescription } = action.payload;
      const existingSkill = state.find((skill) => skill.skillId === skillId);
      if (existingSkill) {
        existingSkill.skillName = skillName;
        existingSkill.skillDescription = skillDescription;
      }
    },
  },
});

export const { setSkill, addSkill, removeSkill, updateSkill } =
  skillSlice.actions;

export default skillSlice.reducer;
