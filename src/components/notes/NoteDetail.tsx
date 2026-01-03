import { useAuth } from '../../hooks/useAuth';
import type { Note } from '../../types';
import { formatData } from '../../utils/utils';

type NoteDetailProps = {
  note: Note;
};

export const NoteDetail = ({ note }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();

  const canDelete = data?._id === note.createdBy._id;

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
        >
          Delete
        </button>
      )}
    </div>
  );
};
