import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LandingPageHeader from "@/components/landingPage/Header/LandingPageHeader";
import LandingPageFooter from "@/components/landingPage/footer/LandingPageFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Interviewer",
  description: "Prepare for your next interview with AI Interviewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <LandingPageHeader />
        {children}
        <LandingPageFooter />
      </body>
    </html>
  );
}
