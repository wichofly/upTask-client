import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { getProjectById } from '../../api/ProjectAPI';
import { EditProjectForm } from '../../components/projects/EditProjectForm';

export const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!; // ! = to assert that projectId is defined

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <p className="text-2xl text-center">Loading...</p>;
  if (isError) return <Navigate to="/404" />;

  if (data) return <EditProjectForm />;
};
