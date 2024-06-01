"use client";
import AsideLeft from "@/components/homepage/asideLeft/AsideLeft";
import MainSection from "@/components/homepage/mainSection/MainSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
export default function AiInterviewer() {
  const userDetail = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("userDetail = ", userDetail);
  }, [userDetail]);

  return (
    <main className="grid grid-cols-10">
      <AsideLeft />
      <MainSection />
    </main>
  );
}
