import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AddMemberModal } from '../../components/team/AddMemberModal';
import { useQuery } from '@tanstack/react-query';
import { getProjectTeam } from '../../api/TeamAPI';
import { ProjectTeamMembers } from '../../components/team/ProjectTeamMembers';

export const ProjectTeamView = () => {
  const navigate = useNavigate();

  // Get projectId from URL params
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam({ projectId }),
    retry: false,
  });

  if (isLoading)
    return <p className="text-2xl text-center mt-10">Loading...</p>;

  if (isError) return <Navigate to={'/404'} />;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-semibold">Manage Team </h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Manage the working team for this project.
        </p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md"
            onClick={() => navigate(location.pathname + '?addMember=true')}
          >
            Add Collaborator
          </button>

          <Link
            to={`/projects/${projectId}`}
            className="bg-fuchsia-500 hover:bg-fuchsia-600 px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md"
          >
            Back to Project
          </Link>
        </nav>

        <ProjectTeamMembers team={data} projectId={projectId} />

        <AddMemberModal />
      </>
    );
};
