import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from "@/redux/chatHistorySlice";
import userReducer from "@/redux/userSlice";
import conversationReducer from "@/redux/conversationSlice";
import skillReducer from "@/redux/skillSlice";

export const store = configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
    user: userReducer,
    conversation: conversationReducer,
    skill: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
