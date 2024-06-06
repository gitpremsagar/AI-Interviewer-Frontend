"use client";

import { Button } from "@/components/ui/button";
import { API_ENDPOINT_FOR_MESSAGE } from "@/lib/constants";
import customAxios from "@/lib/axiosInterceptor";
import { useRef, useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addMessage,
  setFirstChatHistory,
  resetChatHistory,
} from "@/redux/chatHistorySlice";
import { useRouter } from "next/navigation";
import { History } from "@/types/history.type";

const ChatSection = ({
  jobId,
  interviewId,
}: {
  jobId: String;
  interviewId?: String;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const chatHistory = useSelector((state: RootState) => state.chatHistory);
  const userDetail = useSelector((state: RootState) => state.user);
  const jobs = useSelector((state: RootState) => state.job);

  const currentJobId = jobId;
  const currentJobDetail = jobs.find((job) => job.jobId === currentJobId);
  const [sendingMessage, setSendingMessage] = useState(false);

  const [conversationId, setConversationId] = useState(
    interviewId ? interviewId : "newConversation"
  );

  // fetch chat history if conversationId is present
  useEffect(() => {
    async function fetchChatHistory() {
      console.log("fetching chat history, conversationsId = ", conversationId);
      try {
        const response = await customAxios.get(
          API_ENDPOINT_FOR_MESSAGE + `/${conversationId}`
        );
        console.log("fetch chat history response = ", response.data);
        const unformatedHistory = response.data;
        const formattedHistory: History = unformatedHistory.map(
          (messageItem: any) => {
            return {
              role: messageItem.sender,
              parts: [
                {
                  text: messageItem.message,
                },
              ],
            };
          }
        );
        dispatch(setFirstChatHistory(formattedHistory));
      } catch (error: any) {
        console.error("error while fetching chat history = ", error);
        // alert("something went wrong"); //:TODO replace with shadcn toast
      }
    }
    if (conversationId !== "newConversation") {
      fetchChatHistory();
    }
    return () => {
      dispatch(resetChatHistory());
    };
  }, [router]);

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const chatBoxRef = useRef<HTMLDivElement>(null);

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
        conversationId,
        jobTitle: currentJobDetail?.jobTitle,
        jobDescription: currentJobDetail?.jobDescription,
      });
      setSendingMessage(false);
      dispatch(
        addMessage({ role: "model", text: response.data.geminiResponse })
      );
      setConversationId(response.data.conversationId);

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

  // scroll to bottom of chat box on new message
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
