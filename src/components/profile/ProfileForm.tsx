import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import type { User, UserProfileForm } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../../api/ProfileAPI';
import { toast } from 'react-toastify';

type ProfileFormData = {
  data: User;
};

export const ProfileForm = ({ data }: ProfileFormData) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileForm>({ defaultValues: data });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-semibold">My Profile</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Manage your profile information
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="mt-14 space-y-5 bg-white shadow-lg p-10 rounded-md"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label htmlFor="name" className="text-sm uppercase font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full p-3 border border-gray-200 rounded-md"
              {...register('name', {
                required: 'Name is required',
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full p-3  border border-gray-200 rounded-md"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Save Changes"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};
