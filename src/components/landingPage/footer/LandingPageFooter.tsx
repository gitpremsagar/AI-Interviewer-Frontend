import React from "react";

const LandingPageFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto text-center">
        <p className="text-white">
          &copy; {currentYear} AI Interviewer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
