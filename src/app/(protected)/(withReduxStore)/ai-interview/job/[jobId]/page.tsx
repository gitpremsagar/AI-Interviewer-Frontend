"use client";
import AsideLeftForChat from "@/components/homepage/asideLeft/AsideLeft";
import MainSection from "@/components/homepage/mainSection/MainSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AiInterviewer({
  params,
}: {
  params: { jobId: string };
}) {
  
  const userDetail = useSelector((state: RootState) => state.user);
  const jobs = useSelector((state: RootState) => state.job);

  const currentJobId = params.jobId;
  const currentJobDetail = jobs.find((job) => job.jobId === currentJobId);

  return (
    <main className="grid grid-cols-10">
      <AsideLeftForChat />
      <MainSection />
    </main>
  );
}
