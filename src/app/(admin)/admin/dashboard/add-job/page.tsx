import AddJobForm from "@/components/admin/addJob/AddJobForm";

const AddJob: React.FC = () => {
  return (
    <main className="pt-20">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold mb-4">Add Job</h3>
        <AddJobForm />
      </div>
    </main>
  );
};
export default AddJob;
