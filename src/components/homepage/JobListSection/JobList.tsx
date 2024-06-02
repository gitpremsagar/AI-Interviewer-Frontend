"use client";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setJobs } from "@/redux/jobSlice";
import customAxios from "@/lib/axiosInterceptor";
import { API_ENDPOINT_FOR_JOB } from "@/lib/constants";
import { Job } from "@/types/job.type";

const JobListPage: React.FC = () => {
  // const jobs = [
  //   {
  //     jobTitle: "Psychiatrist",
  //     description: "Diagnoses and treats mental health disorders.",
  //   },
  //   {
  //     jobTitle: "Chief Executive Officer (CEO)",
  //     description:
  //       "Oversees the overall operations and resources of a company.",
  //   },

  //   {
  //     jobTitle: "Pharmacist",
  //     description:
  //       "Dispenses prescription medications to patients and offers expertise in the safe use of prescriptions.",
  //   },
  //   {
  //     jobTitle: "Dentist",
  //     description:
  //       "Diagnoses and treats problems with patients' teeth, gums, and related parts of the mouth.",
  //   },
  //   {
  //     jobTitle: "IT Manager",
  //     description:
  //       "Oversees the information technology needs and systems of an organization.",
  //   },
  //   {
  //     jobTitle: "Marketing Manager",
  //     description:
  //       "Plans and directs marketing strategies and campaigns for organizations.",
  //   },
  //   {
  //     jobTitle: "Financial Manager",
  //     description:
  //       "Oversees the financial health of an organization and manages financial planning.",
  //   },

  //   {
  //     jobTitle: "Software Developer",
  //     description: "Creates and maintains software applications and systems.",
  //   },
  //   {
  //     jobTitle: "Data Scientist",
  //     description:
  //       "Analyzes complex data to help organizations make informed decisions.",
  //   },
  //   {
  //     jobTitle: "Pharmaceutical Sales Representative",
  //     description:
  //       "Promotes and sells pharmaceutical products to healthcare professionals.",
  //   },
  //   {
  //     jobTitle: "Actuary",
  //     description:
  //       "Analyzes financial risks using mathematics, statistics, and financial theory.",
  //   },
  //   {
  //     jobTitle: "Operations Manager",
  //     description:
  //       "Oversees the production of goods and services in an organization.",
  //   },
  //   {
  //     jobTitle: "Physician",
  //     description:
  //       "Diagnoses and treats illnesses and injuries, often specializing in a specific area of medicine.",
  //   },
  //   {
  //     jobTitle: "Physician Assistant",
  //     description:
  //       "Provides healthcare services under the supervision of a physician.",
  //   },
  //   {
  //     jobTitle: "Optometrist",
  //     description:
  //       "Diagnoses and treats visual problems and manages diseases, injuries, and other disorders of the eyes.",
  //   },
  //   {
  //     jobTitle: "Nurse Practitioner",
  //     description:
  //       "Provides advanced nursing services, including diagnosing and treating medical conditions.",
  //   },
  //   {
  //     jobTitle: "Management Consultant",
  //     description:
  //       "Advises organizations on how to improve efficiency, performance, and profitability.",
  //   },
  //   {
  //     jobTitle: "Investment Banker",
  //     description:
  //       "Advises companies on financial matters, including raising capital and mergers and acquisitions.",
  //   },
  //   {
  //     jobTitle: "Statistician",
  //     description:
  //       "Applies statistical methods to collect, analyze, and interpret data to solve real-world problems.",
  //   },
  //   {
  //     jobTitle: "Nurse Anesthetist",
  //     description:
  //       "Administers anesthesia and provides care before, during, and after surgical procedures.",
  //   },
  //   {
  //     jobTitle: "Information Security Analyst",
  //     description:
  //       "Protects an organization's computer systems and networks from cyber attacks.",
  //   },
  //   {
  //     jobTitle: "Economist",
  //     description:
  //       "Studies economic issues and trends, and provides analysis and forecasts.",
  //   },
  //   {
  //     jobTitle: "Sales Manager",
  //     description:
  //       "Directs an organization's sales teams and develops strategies to increase sales.",
  //   },
  //   {
  //     jobTitle: "Product Manager",
  //     description:
  //       "Oversees the development and performance of a specific product or product line.",
  //   },
  //   {
  //     jobTitle: "Civil Engineer",
  //     description:
  //       "Designs and oversees the construction of infrastructure projects such as roads, bridges, and buildings.",
  //   },
  //   {
  //     jobTitle: "Mechanical Engineer",
  //     description:
  //       "Designs, develops, and tests mechanical devices and systems.",
  //   },
  //   {
  //     jobTitle: "Electrical Engineer",
  //     description: "Designs and develops electrical systems and equipment.",
  //   },
  //   {
  //     jobTitle: "Chemical Engineer",
  //     description:
  //       "Applies chemistry, biology, and physics principles to solve problems involving the production of chemicals, fuel, drugs, and food.",
  //   },
  //   {
  //     jobTitle: "Aerospace Engineer",
  //     description:
  //       "Designs and tests aircraft, spacecraft, satellites, and missiles.",
  //   },
  //   {
  //     jobTitle: "Biomedical Engineer",
  //     description:
  //       "Applies engineering principles to the medical field to develop devices and technologies for healthcare.",
  //   },
  //   {
  //     jobTitle: "Environmental Engineer",
  //     description:
  //       "Develops solutions to environmental problems, such as pollution control and waste management.",
  //   },
  //   {
  //     jobTitle: "Industrial Engineer",
  //     description:
  //       "Optimizes complex processes and systems to improve efficiency and productivity.",
  //   },
  //   {
  //     jobTitle: "Materials Engineer",
  //     description:
  //       "Develops and tests materials used to create a wide range of products.",
  //   },
  //   {
  //     jobTitle: "Nuclear Engineer",
  //     description:
  //       "Researches and develops processes, instruments, and systems to harness nuclear energy and radiation.",
  //   },
  //   {
  //     jobTitle: "Robotics Engineer",
  //     description: "Designs, builds, and maintains robots and robotic systems.",
  //   },
  //   {
  //     jobTitle: "Telecommunications Engineer",
  //     description:
  //       "Designs and manages systems that transmit data, such as telephone networks and broadband services.",
  //   },
  //   {
  //     jobTitle: "Logistician",
  //     description:
  //       "Manages the supply chain and logistics of an organization to ensure efficient delivery of goods and services.",
  //   },
  //   {
  //     jobTitle: "Human Resources Manager",
  //     description:
  //       "Oversees an organization's human resources functions, including recruitment, training, and employee relations.",
  //   },
  //   {
  //     jobTitle: "Training and Development Manager",
  //     description:
  //       "Plans and coordinates programs to enhance the knowledge and skills of an organization's employees.",
  //   },
  //   {
  //     jobTitle: "Compensation and Benefits Manager",
  //     description:
  //       "Develops and manages an organization's compensation and benefits programs.",
  //   },
  //   {
  //     jobTitle: "Public Relations Manager",
  //     description:
  //       "Manages an organization's public image and communication with the media and the public.",
  //   },
  //   {
  //     jobTitle: "Advertising Manager",
  //     description:
  //       "Plans and directs advertising campaigns to promote products or services.",
  //   },
  // ];

  const dispatch = useDispatch();

  const jobs = useSelector((state: RootState) => state.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await customAxios.get(API_ENDPOINT_FOR_JOB);
        dispatch(setJobs(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="col-span-8 pt-20 px-10 pb-20">
      <h1 className="text-2xl font-bold mb-10">
        You Can practice for the following job rolls:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => {
          return <JobCard key={job.jobId} job={job} />;
        })}
      </div>
    </div>
  );
};

const JobCard = ({ job }: { job: Job }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="border border-gray-300 p-4 my-2 rounded-lg hover:shadow-lg cursor-default transition duration-300 ease-in-out"
    >
      <JobTitle
        hovering={hovering}
        jobTitle={job.jobTitle}
        jobId={job.jobId}
      ></JobTitle>
      <p>{job.jobDescription}</p>
    </div>
  );
};

const JobTitle = ({
  jobTitle,
  jobId,
  hovering,
}: {
  jobId: string;
  jobTitle: string;
  hovering: boolean;
}) => {
  return (
    <Link href={`/ai-interview/job/${jobId}`}>
      <h2 className={`text-xl font-bold ${hovering ? "text-red-500" : ""}`}>
        {jobTitle}
      </h2>
    </Link>
  );
};

export default JobListPage;
