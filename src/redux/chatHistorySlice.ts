import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { History, Role } from "@/types/history.type";

const presetHistory: History = [];

const initialState: History = presetHistory;

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ role: Role; text: string }>
    ) => {
      state.push({
        role: action.payload.role,
        parts: [
          {
            text: action.payload.text,
          },
        ],
      });
    },
    setFirstChatHistory: (state, action: PayloadAction<History>) => {
      return action.payload;
    },
    resetChatHistory: () => initialState,
  },
});

export const { addMessage, resetChatHistory, setFirstChatHistory } =
  chatHistorySlice.actions;

export default chatHistorySlice.reducer;
