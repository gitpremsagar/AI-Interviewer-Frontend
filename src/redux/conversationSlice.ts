import { createSlice } from "@reduxjs/toolkit";
import { Conversation } from "@/types/conversation.type";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: [] as Conversation[],
  reducers: {
    setConversation: (state, action) => {
      return action.payload;
    },
    addConversation: (state, action) => {
      state.push(action.payload);
    },
    removeConversation: (state, action) => {
      return state.filter(
        (conversation) =>
          conversation.conversationId !== action.payload.conversationId
      );
    },
    resetConversation: () => [],
  },
});

export const { setConversation, addConversation, removeConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
