"use client";

import { Button } from "@/components/ui/button";
import { API_ENDPOINT_FOR_MESSAGE } from "@/lib/constants";
import axios from "axios";
import { useRef, useEffect, useState, use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const MainSection = () => {
  const chatHistory = useSelector((state: RootState) => state.chatHistory);

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

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
      <div className="">
        <div className="p-10 min-h-screen pb-32 flex flex-col justify-end">
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
        <div className="p-10 bg-gray-600 fixed bottom-0 left-[20%] w-[80%]">
          <form onSubmit={handleSendMessage} className="flex opacity-100">
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
  return <div className="col-span-8">{children}</div>;
};

export default MainSection;
