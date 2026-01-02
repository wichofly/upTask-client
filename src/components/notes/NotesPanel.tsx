import type { Task } from '../../types';
import { AddNotesForm } from './AddNotesForm';
import { NoteDetail } from './NoteDetail';

type NotesPanelProps = {
  notes: Task['notes'];
};

export const NotesPanel = ({ notes }: NotesPanelProps) => {
  return (
    <>
      <AddNotesForm />

      <div className="divide-y divide-gray-100 mt-10">
        {notes.length ? (
          <>
            <p className="text-xl text-slate-500 mb-2 underline underline-offset-2">
              Notes:
            </p>
            {notes.map((note) => (
              <NoteDetail key={note._id} />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center pt-3">No notes available</p>
        )}
      </div>
    </>
  );
};
