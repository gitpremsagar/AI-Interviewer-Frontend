import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from "@/redux/chatHistorySlice";
import userReducer from "@/redux/userSlice";

export const store = configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
