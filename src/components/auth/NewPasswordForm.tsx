import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { ConfirmToken, ResetPasswordForm } from '../../types';
import { ErrorMessage } from '../ErrorMessage';
import { updatePasswordWithToken } from '../../api/AuthAPI';

type NewPasswordFormProps = {
  token: ConfirmToken['token'];
};

export const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const navigate = useNavigate();

  const initialValues: ResetPasswordForm = {
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate('/auth/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleNewPassword = (formData: ResetPasswordForm) =>
    mutate({ formData, token });

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10 mt-10 bg-white rounded-md"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-normal text-2xl">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register('password', {
              required: 'Password is required',
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

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="font-normal text-2xl">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
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
          value="Establish Password"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold text-xl cursor-pointer rounded-md"
        />
      </form>
    </>
  );
};
