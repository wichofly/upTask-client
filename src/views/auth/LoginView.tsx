import { useForm } from 'react-hook-form';
import type { UserLoginForm } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

export const LoginView = () => {
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Login</h1>
      <p className="text-2xl font-light text-white mt-5">
        Welcome back! Please enter your details to login to your account.
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white rounded-md"
        noValidate
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

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-normal text-2xl">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Your password"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register('password', {
              required: 'Password is required',
            })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold text-xl cursor-pointer rounded-md"
        />

        <nav>
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="font-medium text-fuchsia-600 hover:underline"
          >
            Register here
          </Link>
        </nav>
      </form>

      <nav className="mt-10 text-center text-xl text-gray-300 font-normal">
        Forgot your password?{' '}
        <Link
          to="/auth/forgot-password"
          className="text-fuchsia-600 hover:underline"
        >
          Reset it here
        </Link>
      </nav>
    </>
  );
};
