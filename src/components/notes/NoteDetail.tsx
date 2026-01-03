import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import type { Note } from '../../types';
import { formatData } from '../../utils/utils';
import { deleteNote } from '../../api/NoteAPI';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';

type NoteDetailProps = {
  note: Note;
};

export const NoteDetail = ({ note }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();

  const canDelete = data?._id === note.createdBy._id; // Only the creator can delete the note

  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleDeleteNote = () => {
    mutate({ projectId, taskId, noteId: note._id });
  };

  if (isLoading)
    return <p className="text-2xl text-center mt-10">Loading...</p>;

  return (
    <div className="p-3 flex justify-between items-center bg-gray-50 rounded-md mb-3">
      <div>
        <p className="text-gray-600">
          <span className="font-semibold">By {note.createdBy.name}:</span>{' '}
          {note.content}
        </p>
        <p className="text-sm text-slate-500">{formatData(note.createdAt)}</p>
      </div>

      {canDelete && (
        <button
          type="button"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md p-2 text-sm font-semibold cursor-pointer transition-colors"
          onClick={handleDeleteNote}
        >
          Delete
        </button>
      )}
    </div>
  );
};
