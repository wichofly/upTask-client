import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/ProjectAPI';

const DashboardView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isLoading) return <p className="text-2xl text-center">Loading...</p>;

  if (data)
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

        {data.length ? (
          <p>There are projects</p>
        ) : (
          <p className="text-center py-20 font-semibold">
            There are not projects.{' '}
            <Link
              to="/projects/create"
              className="text-fuchsia-500 font-semibold hover:underline"
            >
              Create Projects
            </Link>
          </p>
        )}
      </>
    );
};

export default DashboardView;

/**
Code to fix undefined data issue
------------------------------------

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/ProjectAPI';

const DashboardView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  console.log(data);
  if (isLoading) return <p className="text-2xl text-center">Loading...</p>;

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

      {data?.map((project) => (
        <p key={project._id}>{project.clientName}</p>
      ))}
    </>
  );
};

export default DashboardView;

 */

/**
 Recommended code by Query to fix data undefined issue
 --------------------------------------------------------

 import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/ProjectAPI';

const DashboardView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isLoading) return <p className="text-2xl text-center">Loading...</p>;

  if (data)
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

        {data.map((project) => (
          <p key={project._id}>{project.clientName}</p>
        ))}
      </>
    );
};

export default DashboardView;
 */
