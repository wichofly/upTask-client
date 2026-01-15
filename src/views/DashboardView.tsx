import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/ProjectAPI';
import { ProjectsCreated } from '../components/projects/ProjectsCreated';
import { useAuth } from '../hooks/useAuth';

const DashboardView = () => {
  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  console.log(data);

  if (isLoading || authLoading)
    return <p className="text-2xl text-center mt-10">Loading...</p>;

  if (data && user)
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
          <ProjectsCreated projects={data} user={user._id} />
        ) : (
          <p className="text-center py-20 font-semibold text-2xl">
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
