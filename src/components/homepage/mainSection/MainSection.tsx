"use client";

import { Button } from "@/components/ui/button";
import { API_ENDPOINT_FOR_MESSAGE } from "@/lib/constants";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { History } from "@/types/history.type";

const MainSection = () => {
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
  ];
  const [chatHistory, setChatHistory] = useState<History>(presetHistory);

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = chatTextAreaRef.current?.value;
    console.log("msg = ", msg);
    const response = await axios.post(API_ENDPOINT_FOR_MESSAGE, {
      history: chatHistory,
      message: msg,
    });
    console.log(response.data);
    // setChatHistory([response.data.history]);
  };

  return (
    <MainSectionContainer>
      <div className="flex flex-col justify-between h-full">
        <div className="p-10">
          {chatHistory.map((messageObj, index) => {
            // console.log("msg obj = ", messageObj);
            const role = messageObj.role;
            return (
              <div
                key={index}
                className={`flex my-5 ${
                  role === `user` ? `justify-end` : `justify-start`
                }`}
              >
                <div
                  className={`p-5 rounded-lg w-fit max-w-[70%] ${
                    role === `user` ? `bg-green-300 ` : `bg-blue-300 `
                  }`}
                >
                  {messageObj.parts[0].text}
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-10 bg-gray-600">
          <form onSubmit={handleSendMessage} className="flex">
            <textarea
              // onChange={handleMessageChange}
              className="border w-full resize-none"
              ref={chatTextAreaRef}
              rows={1}
            />
            <Button type="submit">Generate</Button>
          </form>
        </div>
      </div>
    </MainSectionContainer>
  );
};

const MainSectionContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="col-span-5 h-full">{children}</div>;
};

export default MainSection;
