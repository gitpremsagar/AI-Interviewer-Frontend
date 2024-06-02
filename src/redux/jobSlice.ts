import { createSlice } from "@reduxjs/toolkit";
import { Job } from "../types/job.type";

const initialState: Job[] = [];

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      return action.payload;
    },
    addJob: (state, action) => {
      state.push(action.payload);
    },
    removeJob: (state, action) => {
      return state.filter((job) => job.jobId !== action.payload);
    },
    updateJob: (state, action) => {
      const { jobId, ...job } = action.payload;
      const existingJob = state.find((job) => job.jobId === jobId);
      if (existingJob) {
        Object.assign(existingJob, job);
      }
    },
  },
});

export const { setJobs, addJob, removeJob, updateJob } = jobSlice.actions;

export default jobSlice.reducer;
