import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { TeamMember } from '../../types';
import { addUserToProject } from '../../api/TeamAPI';
import { useParams } from 'react-router-dom';

type SearchResultProps = {
  user: TeamMember;
};

export const SearchResult = ({ user }: SearchResultProps) => {
  const params = useParams();
  const projectId = params.projectId!;

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddUserToProject = () => mutate({ projectId, id: user._id });

  return (
    <>
      <p className="mt-10 text-center font-semibold">Result:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-normal cursor-pointer rounded-md transition-colors duration-300"
          onClick={handleAddUserToProject}
        >
          Add to project
        </button>
      </div>
    </>
  );
};
