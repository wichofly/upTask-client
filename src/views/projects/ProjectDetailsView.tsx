import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getProjectById } from '../../api/ProjectAPI';
import AddTaskModal from '../../components/tasks/AddTaskModal';
import { TaskList } from '../../components/tasks/TaskList';
import { EditTaskData } from '../../components/tasks/EditTaskData';
import TaskModalDetails from '../../components/tasks/TaskModalDetails';
import { useAuth } from '../../hooks/useAuth';
import { isManager } from '../../utils/policies';

export const ProjectDetailsView = () => {
  const { data: user, isLoading: authLoading } = useAuth();

  const params = useParams();
  const projectId = params.projectId!; // ! = to assert that projectId is defined just as a string.
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading && authLoading)
    return <p className="text-2xl text-center">Loading...</p>;  
  if (isError) return <Navigate to="/404" />;

  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-semibold">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md"
              onClick={() => navigate(location.pathname + '?newTask=true')}
            >
              Add Task
            </button>

            <Link
              to={'team'}
              className="bg-fuchsia-500 hover:bg-fuchsia-600 px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md"
            >
              Collaborators
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
};
