import type { Note } from '../../types';
import { formatData } from '../../utils/utils';

type NoteDetailProps = {
  note: Note;
};

export const NoteDetail = ({ note }: NoteDetailProps) => {
  return (
    <div className="p-3 bg-gray-50 rounded-md mb-3">
      <div>
        <p className="text-gray-600">
          <span className="font-semibold">By {note.createdBy.name}:</span>{' '}
          {note.content}
        </p>
        <p className="text-sm text-slate-500">{formatData(note.createdAt)}</p>
      </div>
    </div>
  );
};
