import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { ForgotPasswordForm } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage';
import { forgotPassword } from '../../api/AuthAPI';

export const ForgotPasswordView = () => {
  const initialValues: ForgotPasswordForm = {
    email: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) =>
    mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter your <span className="text-fuchsia-500">email</span> to receive
        instructions to reset your password.
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 bg-white mt-10 rounded-md"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-normal text-2xl">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your-email@domain.com"
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
          value="Send Instructions"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold text-xl cursor-pointer rounded-md"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Do you have an account? Login
        </Link>
        <Link
          to="/auth/register"
          className="text-center text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Don't have an account? Register
        </Link>
      </nav>
    </>
  );
};
