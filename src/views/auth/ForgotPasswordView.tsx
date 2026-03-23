import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { ForgotPasswordForm } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage';
import { forgotPassword } from '../../api/AuthAPI';

const ForgotPasswordView = () => {
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
      <h1 className="text-4xl sm:text-5xl font-semibold text-white">Reset Password</h1>
      <p className="text-lg sm:text-2xl font-light text-white mt-4 sm:mt-5">
        Enter your <span className="text-fuchsia-500">email</span> to receive
        instructions to reset your password.
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-6 sm:space-y-8 p-5 sm:p-8 bg-white mt-8 sm:mt-10 rounded-md"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-normal text-lg sm:text-2xl">
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
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold text-lg sm:text-xl cursor-pointer rounded-md"
        />
      </form>

      <nav className="mt-8 sm:mt-10 flex flex-col space-y-3 sm:space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-base sm:text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Do you have an account? Login
        </Link>
        <Link
          to="/auth/register"
          className="text-center text-base sm:text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Don't have an account? Register
        </Link>
      </nav>
    </>
  );
};

export default ForgotPasswordView;
