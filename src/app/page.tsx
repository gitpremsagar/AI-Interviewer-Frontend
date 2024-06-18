import LandingPageFooter from "@/components/landingPage/footer/LandingPageFooter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen">
        <main className="h-full box-border">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-6xl font-bold">AI Interviewer</h1>
            <p className="text-2xl text-center mt-5">
              Prepare for your next interview with AI Interviewer. <br />
              AI Interviewer will take your mock interview and give you
              feedback.
            </p>
            <div className="mt-10 space-x-5">
              <Link href="/login">
                <button className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ease-in-out duration-300">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ease-in-out duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </main>
        <LandingPageFooter />
      </div>
    </>
  );
}

const LandingPageSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <section className="p-20">{children}</section>;
};
