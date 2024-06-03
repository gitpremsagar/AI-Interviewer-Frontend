"use client";

import WebsiteHeader from "@/components/common/WebsiteHeader";
import { useEffect } from "react";
import customAxios from "@/lib/axiosInterceptor";
import { API_ENDPOINT_FOR_USER, API_ENDPOINT_FOR_JOB } from "@/lib/constants";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { setJobs } from "@/redux/jobSlice";
import { useRouter } from "next/navigation";

export default function ProtectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    //fetch user data and store in redux
    async function fetchUser() {
      try {
        const response = await customAxios.get(
          `${API_ENDPOINT_FOR_USER}/decode-access-token`
        ); //no need to pass token since automatically added by browser

        dispatch(setUser(response.data));
        // console.log("response = ", response);
      } catch (error: any) {
        if (error.response?.data?.message === "Refresh Token expired") {
          router.push("/login");
          // console.log("Access Token Expired");
        } else {
          console.error(
            "error while fetching user info in rootlayout = ",
            error
          );
          // alert("something went wrong here");//TODO: show a toast error message to the user here
        }
      }
    }
    fetchUser();

    // fetch job data and store in redux
    async function fetchJob() {
      try {
        const response = await customAxios.get(`${API_ENDPOINT_FOR_JOB}`);
        dispatch(setJobs(response.data));
        // console.log("response = ", response);
      } catch (error: any) {
        console.error("this error = ", error);
      }
    }
    fetchJob();
  }, []);
  return (
    <>
      <WebsiteHeader />
      {children}
    </>
  );
}
