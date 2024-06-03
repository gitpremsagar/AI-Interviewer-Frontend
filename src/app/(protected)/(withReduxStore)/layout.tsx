"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import WebsiteHeader from "@/components/common/WebsiteHeader";
import { useEffect } from "react";
import customAxios from "@/lib/axiosInterceptor";
import { API_ENDPOINT_FOR_USER } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

export default function ProtectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await customAxios.get(
          `${API_ENDPOINT_FOR_USER}/decode-access-token`
        ); //no need to pass token since automatically added by browser

        dispatch(setUser(response.data));
        console.log("response = ", response);
      } catch (error: any) {
        if (error.response?.data?.message === "Refresh Token expired") {
          router.push("/login");
          // console.log("Access Token Expired");
        } else {
          console.error("this error = ", error);
          // alert("something went wrong here");//TODO: show a toast error message to the user here
        }
      }
    }
    fetchUser();
  }, []);
  return (
    <>
      <WebsiteHeader />
      {children}
    </>
  );
}
