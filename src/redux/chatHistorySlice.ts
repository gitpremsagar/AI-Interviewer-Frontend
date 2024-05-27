import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { History,Role } from "@/types/history.type";

const presetHistory: History = [
    {
      role: "user",
      parts: [
        {
          text: "Act as an interviewer and take my interview for testing my JavaScript skill",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "Ok. Are you ready for the first question?" }],
    },
    {
      role: "user",
      parts: [{ text: "Yes. Lets start the mock interview." }],
    },
    {
      role: "model",
      parts: [
        { text: "Great! Here is the first question. What is JavaScript?" },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a programming language that is characterized as dynamic, weakly typed, prototype-based, and multi-paradigm.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Good. Can you explain the difference between undefined and not defined in JavaScript?",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "In JavaScript, if you try to use a variable that doesn't exist and has not been declared, then JavaScript will throw an error 'variable is not defined'. However, if a variable is declared but not assigned a value, then JavaScript will return 'undefined' when you try to use such variable.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "What is the use of isNaN function?",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "The isNaN function is used to determine whether a value is an illegal number (Not-a-Number). This function returns true if the value equates to NaN; otherwise, it returns false.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "What is the use of isNaN function?",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "The isNaN function is used to determine whether a value is an illegal number (Not-a-Number). This function returns true if the value equates to NaN; otherwise, it returns false.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "What is the use of isNaN function?",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "The isNaN function is used to determine whether a value is an illegal number (Not-a-Number). This function returns true if the value equates to NaN; otherwise, it returns false.",
        },
      ],
    },
  ];

const initialState: History = presetHistory;

const chatHistorySlice = createSlice({
    name: "chatHistory",
    initialState: initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{ role: Role; text: string }>) => {
            state.push({
                role: action.payload.role,
                parts: [
                    {
                        text: action.payload.text,
                    },
                ],
            });
        },
        resetChatHistory: () => initialState,
    },
});

export const { addMessage, resetChatHistory} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
