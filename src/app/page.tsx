import AsideLeft from "@/components/homepage/asideLeft/AsideLeft";
import MainSection from "@/components/homepage/mainSection/MainSection";

export default function Home() {
  return (
    <main className="grid grid-cols-10">
      <AsideLeft />
      <MainSection />
    </main>
  );
}
