import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from "@/redux/chatHistorySlice";
import userReducer from "@/redux/userSlice";
import conversationReducer from "@/redux/conversationSlice";
import skillReducer from "@/redux/skillSlice";
import jobReducer from "@/redux/jobSlice";

export const store = configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
    user: userReducer,
    conversation: conversationReducer,
    skill: skillReducer,
    job: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
