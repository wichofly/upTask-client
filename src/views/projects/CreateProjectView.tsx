import { Link } from 'react-router-dom';

export const CreateProjectView = () => {
  return (
    <>
      <h1 className="text-5xl font-semibold">Create New Project</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Fill in the details below to create a new project.
      </p>

      <Link
        to="/"
        className="text-white bg-purple-400 hover:bg-purple-500 px-10 py-3 text-xl font-semibold rounded-md my-5 inline-block transition-colors"
      >
        Back To Projects
      </Link>
    </>
  );
};
