import { useForm } from 'react-hook-form';
import type { NoteFormData } from '../../types';
import { ErrorMessage } from '../ErrorMessage';

export const AddNotesForm = () => {
  const initialValues: NoteFormData = {
    content: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleAddNote = (formData: NoteFormData) => {
    console.log(formData);
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
        {/* <textarea
          id="content"
          placeholder="Write your note here..."
          className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none"
        /> */}
      </div>
      <input
        type="submit"
        value="Add Note"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold cursor-pointer rounded-md"
      />
    </form>
  );
};
