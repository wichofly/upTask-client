import { useForm } from 'react-hook-form';
import type { UserRegistrationForm } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Link } from 'react-router-dom';

export const RegisterView = () => {
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({
    defaultValues: initialValues,
  });

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {};

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Register</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill in the form to create{' '}
        <span className="text-fuchsia-500 font-semibold">your account</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-white mt-10 rounded-md"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-normal text-2xl">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className=" w-full p-3 border border-gray-300 rounded-md"
            {...register('name', {
              required: 'Name is required',
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-normal text-2xl">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
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
          <label htmlFor="password_confirm" className="font-normal text-2xl">
            Confirm Password
          </label>
          <input
            id="password_confirm"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register('password_confirm', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.password_confirm && (
            <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Register"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-semibold text-xl cursor-pointer rounded-md"
        />

        <nav>
          Already have an account?{' '}
          <Link to="/auth/login" className="text-fuchsia-600 hover:underline">
            Login
          </Link>
        </nav>
      </form>
    </>
  );
};
