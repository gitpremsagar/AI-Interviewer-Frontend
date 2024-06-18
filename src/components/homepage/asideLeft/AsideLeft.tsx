"use client";

import customAxios from "@/lib/axiosInterceptor";
import { API_ENDPOINT_FOR_CONVERSATION } from "@/lib/constants";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setConversation } from "@/redux/conversationSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";

const AsideLeftForChat = () => {
  const dispatch = useDispatch();

  const conversations = useSelector((state: RootState) => state.conversation);

  useEffect(() => {
    async function fetchConversation() {
      try {
        const response = await customAxios.get(API_ENDPOINT_FOR_CONVERSATION);
        console.log("fetch conversation response = ", response.data);
        dispatch(setConversation(response.data));
      } catch (error: any) {
        console.error("error while fetching conversation = ", error);
        // alert("something went wrong"); //:TODO replace with shadcn toast
      }
    }
    fetchConversation();
  }, []);
  return (
    <div className="col-span-2 bg-gray-800 text-white min-h-screen p-5">
      <div className="fixed">
        <Link href="/ai-interview">
          <h1 className="text-xl font-bold text-center">AI Interviewer</h1>
        </Link>
        <menu className="mt-5">
          {conversations?.map((conversation) => {
            // extract date time, keep only date and time
            const date = new Date(conversation.createdAt).toLocaleString();
            return (
              <div
                key={conversation.conversationId}
                className="flex justify-between p-2"
              >
                <Link
                  href={`/ai-interview/job/${conversation.job.jobId}/${conversation.conversationId}`}
                >
                  <div>
                    <h6 className="text-lg font-bold">
                      {conversation.job.jobTitle}
                    </h6>
                    <p className="text-xs text-red-500">{`${date}`}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </menu>
      </div>
    </div>
  );
};

export default AsideLeftForChat;
