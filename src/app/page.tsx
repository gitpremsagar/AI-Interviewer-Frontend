"use client";
import AsideLeft from "@/components/homepage/asideLeft/AsideLeft";
import MainSection from "@/components/homepage/mainSection/MainSection";
// import useRefreshAccessToken from "@/hooks/useRefreshAccessToken";
import { useEffect } from "react";
import useFetchUserDetail from "@/hooks/useFetchUserDeatail";

export default function Home() {
  // const { status, refreshAccessToken } = useRefreshAccessToken();
  const { user, status, fetchUserDetail } = useFetchUserDetail();
  useEffect(() => {
    //   // refreshAccessToken();
    fetchUserDetail();
  }, []);
  console.log("user status = ", status);
  console.log("user = ", user);
  return (
    <main className="grid grid-cols-10">
      <AsideLeft />
      <MainSection />
    </main>
  );
}
