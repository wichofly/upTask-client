import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { NoteFormData } from '../../types';
import { ErrorMessage } from '../ErrorMessage';
import { createNote } from '../../api/NoteAPI';

export const AddNotesForm = () => {
  const params = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get('viewTask')!;

  const initialValues: NoteFormData = {
    content: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({ formData, projectId, taskId });
    reset();
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(handleAddNote)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-semibold">
          Add Note
        </label>
        <input
          id="content"
          type="text"
          placeholder="Note content"
          className="w-full p-3 border border-gray-300 rounded-md"
          {...register('content', { required: 'Note content is required' })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Add Note"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold cursor-pointer rounded-md"
      />
    </form>
  );
};
