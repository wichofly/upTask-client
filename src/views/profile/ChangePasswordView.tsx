import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../components/ErrorMessage';
import type { UpdatePasswordForm } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../api/ProfileAPI';
import { toast } from 'react-toastify';

const ChangePasswordView = () => {
  const initialValues: UpdatePasswordForm = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => toast.success(data),
    onError: (error) => toast.error(error.message),
  });

  const password = watch('password');

  const handleChangePassword = (formData: UpdatePasswordForm) =>
    mutate(formData);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black ">Change Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Change your account password here
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-md"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Current Password"
              className="w-full p-3  border border-gray-200 rounded-md"
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            {errors.currentPassword && (
              <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              className="w-full p-3  border border-gray-200 rounded-md"
              {...register('password', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="confirmPassword"
              className="text-sm uppercase font-bold"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-3  border border-gray-200 rounded-md"
              {...register('confirmPassword', {
                required: 'This field is required',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Change Password"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors rounded-md"
          />
        </form>
      </div>
    </>
  );
};

export default ChangePasswordView;
