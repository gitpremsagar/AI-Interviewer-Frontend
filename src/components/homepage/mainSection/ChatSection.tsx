"use client";

import { Button } from "@/components/ui/button";
import { API_ENDPOINT_FOR_MESSAGE } from "@/lib/constants";
import customAxios from "@/lib/axiosInterceptor";
import { useRef, useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addMessage, setFirstChatHistory } from "@/redux/chatHistorySlice";
import { useRouter } from "next/navigation";
import { History } from "@/types/history.type";

const ChatSection = ({ jobId }: { jobId: String }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const chatHistory = useSelector((state: RootState) => state.chatHistory);
  const userDetail = useSelector((state: RootState) => state.user);
  const jobs = useSelector((state: RootState) => state.job);

  const currentJobId = jobId;
  const currentJobDetail = jobs.find((job) => job.jobId === currentJobId);
  const [sendingMessage, setSendingMessage] = useState(false);

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentJobDetail) {
      return;
    }
    function buildFirstChatHistory() {
      const firstChatHistory: History = [
        {
          role: "user",
          parts: [
            {
              text: `Act as an interviewer and take my interview. I'm going to apply for the job with following details:
              jobTitle: ${currentJobDetail?.jobTitle}
              jobDescription: ${currentJobDetail?.jobDescription}`,
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: "Ok. Are you ready for the first question?" }],
        },
        {
          role: "user",
          parts: [{ text: "Yes. I'm Ready." }],
        },
        {
          role: "model",
          parts: [{ text: "First of all tell me your name." }],
        },
      ];
      return firstChatHistory;
    }

    const firstChatHistory = buildFirstChatHistory();
    dispatch(setFirstChatHistory(firstChatHistory));
  }, [currentJobDetail, router]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = chatTextAreaRef.current?.value;
    if (!msg) return;
    chatTextAreaRef.current!.value = "";
    dispatch(addMessage({ role: "user", text: msg }));
    setSendingMessage(true);
    try {
      const response = await customAxios.post(API_ENDPOINT_FOR_MESSAGE, {
        history: chatHistory,
        message: msg,
        jobId,
        conversationId: "newConversation",
      });
      setSendingMessage(false);
      dispatch(
        addMessage({ role: "model", text: response.data.geminiResponse })
      );

      console.log(response.data);
    } catch (error: any) {
      if (error.response?.data?.message === "Refresh Token expired") {
        router.push("/login");
        // console.log("Access Token Expired");
      } else {
        console.error("error = ", error);
        alert("something went wrong");
      }
    }
  };

  // scroll to bottom of chat box
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatHistory]);

  return (
    <ChatSectionContainer>
      <div className="">
        <div
          ref={chatBoxRef}
          className="px-10 min-h-screen py-32 flex flex-col justify-end"
        >
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
                <p
                  className={`p-5 rounded-lg w-fit max-w-[70%] ${
                    role === `user` ? `bg-green-300 ` : `bg-blue-300 `
                  }`}
                >
                  {messageObj.parts[0].text}
                </p>
              </div>
            );
          })}
          {sendingMessage && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <div className="p-10 bg-gray-600 fixed bottom-0 left-[20%] w-[80%]">
          <form onSubmit={handleSendMessage} className="flex opacity-100">
            <textarea
              className="border w-full resize-none"
              ref={chatTextAreaRef}
              rows={1}
            />
            <Button type="submit">Generate</Button>
          </form>
        </div>
      </div>
    </ChatSectionContainer>
  );
};

const ChatSectionContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="col-span-8">{children}</div>;
};

export default ChatSection;
