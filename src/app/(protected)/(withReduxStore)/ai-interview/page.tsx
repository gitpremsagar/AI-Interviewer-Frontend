"use client";
import AsideLeftForChat from "@/components/homepage/asideLeft/AsideLeft";
import JobListPage from "@/components/homepage/JobListSection/JobList";
export default function AiInterviewer() {
  return (
    <main className="grid grid-cols-10">
      <AsideLeftForChat />
      <JobListPage />
    </main>
  );
}
