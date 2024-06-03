"use client";
import AsideLeft from "@/components/homepage/asideLeft/AsideLeft";
import MainSection from "@/components/homepage/mainSection/MainSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

export default function AiInterviewer({
  params,
}: {
  params: { jobId: string };
}) {
  const currentJobId = params.jobId;
  const userDetail = useSelector((state: RootState) => state.user);
  const jobs = useSelector((state: RootState) => state.job);
  console.log("jobs = ", jobs);

  const currentJob = jobs.find((job) => job.jobId === currentJobId);
  console.log("currentJob = ", currentJob);

  // useEffect(() => {
  //   console.log("userDetail = ", userDetail);
  // }, [userDetail]);

  return (
    <main className="grid grid-cols-10">
      <AsideLeft />
      <MainSection />
    </main>
  );
}
