import LandingPageFooter from "@/components/landingPage/footer/LandingPageFooter";

export default function Home() {
  return (
    <>
      <main className="pt-20">
        <LandingPageSection>
          <h1 className="text-2xl font-bold">AI Interviewer</h1>
          <p>
            Prepare for your next interview with AI Interviewer. AI Interviewer
            will take your mock interview and give you feedback.
          </p>
        </LandingPageSection>
        <LandingPageSection>
          <h2 className="text-xl font-bold">How does it work!</h2>
          <p>{/* here will be the demo video */}</p>
          <p>
            After login just select the job title you want to practice interview
            for. AI will take your mock interview.
          </p>
        </LandingPageSection>
        <LandingPageSection>Features Section</LandingPageSection>
        <LandingPageSection>Testimonials Section</LandingPageSection>
        <LandingPageSection>Pricing Section</LandingPageSection>
        <LandingPageSection>FAQ Section</LandingPageSection>
      </main>
      <LandingPageFooter />
    </>
  );
}

const LandingPageSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <section className="p-20">{children}</section>;
};
