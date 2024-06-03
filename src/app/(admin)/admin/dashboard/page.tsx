import JobListPage from "@/components/homepage/JobListSection/JobList";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-10  gap-4">
      <aside className="col-span-2">
        <div className="pt-20 bg-gray-800 text-white p-4 h-full">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <ul className="mt-4">
            <Link href={`/admin/dashboard/add-job`}>
              <li className="py-2">Add Job</li>
            </Link>

            <Link href={`/admin/dashboard/add-skill`}>
              <li className="py-2">Add skill</li>
            </Link>
          </ul>
        </div>
      </aside>

      <main className="col-span-8">
        <JobListPage />
      </main>
    </div>
  );
};

export default Dashboard;
