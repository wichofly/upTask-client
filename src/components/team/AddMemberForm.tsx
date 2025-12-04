import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage';
import type { TeamMemberForm } from '../../types';
import { toast } from 'react-toastify';
import { findUserByEmail } from '../../api/TeamAPI';
import { SearchResult } from './SearchResult';

export const AddMemberForm = () => {
  const initialValues: TeamMemberForm = {
    email: '',
  };

  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  const handleSearchUser = (formData: TeamMemberForm) =>
    mutation.mutate({ formData, projectId });

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="font-normal text-2xl">
            User Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="User email to Add"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Search User"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold text-xl cursor-pointer rounded-md"
        />
      </form>

      <div className="mt-5">
        {mutation.isPending && <p className="text-center">Searching user...</p>}
        {mutation.isError && (
          <p className="text-center">{mutation.error.message}</p>
        )}
        {mutation.data && <SearchResult user={mutation.data} />}
      </div>
    </>
  );
};
