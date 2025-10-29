import { Link } from 'react-router-dom';

const DashboardView = () => {
  return (
    <>
      <h1 className="text-5xl font-semibold">My Projects</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Manage and track your projects efficiently.
      </p>

      <Link
        to="/projects/create"
        className="text-white bg-purple-400 hover:bg-purple-500 px-10 py-3 text-xl font-semibold rounded-md my-5 inline-block transition-colors"
      >
        Create New Project
      </Link>
    </>
  );
};

export default DashboardView;
