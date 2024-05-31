"use client";

import { Button } from "@/components/ui/button";
import { API_ENDPOINT_FOR_MESSAGE } from "@/lib/constants";
import customAxios from "@/lib/axiosInterceptor";
import { useRef, useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addMessage } from "@/redux/chatHistorySlice";
import { useRouter } from "next/navigation";

const MainSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const chatHistory = useSelector((state: RootState) => state.chatHistory);
  const [fetchingResponse, setFetchingResponse] = useState(false);

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = chatTextAreaRef.current?.value;
    if (!msg) return;
    chatTextAreaRef.current!.value = "";
    dispatch(addMessage({ role: "user", text: msg }));
    setFetchingResponse(true);
    try {
      const response = await customAxios.post(API_ENDPOINT_FOR_MESSAGE, {
        history: chatHistory,
        message: msg,
        conversationId: "newConversation",
      });
      setFetchingResponse(false);
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

  return (
    <MainSectionContainer>
      <div className="">
        <div className="p-10 min-h-screen py-32 flex flex-col justify-end">
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
          {fetchingResponse && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
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
