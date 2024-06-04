"use client";
import AsideLeftForChat from "@/components/homepage/asideLeft/AsideLeft";
import ChatSection from "@/components/homepage/mainSection/ChatSection";

export default function AiInterviewer({
  params,
}: {
  params: { jobId: string };
}) {
  const jobId = params.jobId;
  return (
    <main className="grid grid-cols-10">
      <AsideLeftForChat />
      <ChatSection jobId={jobId} />
    </main>
  );
}
