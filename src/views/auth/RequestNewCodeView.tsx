import { useForm } from 'react-hook-form';
import type { RequestNewCodeForm } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { requestConfirmationCode } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

const RequestNewCodeView = () => {
  const initialValues: RequestNewCodeForm = {
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
    mutationFn: requestConfirmationCode,
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRequestCode = (formData: RequestNewCodeForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Request New Code</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter your <span className="text-fuchsia-500">email</span> to receive a
        <span className="text-fuchsia-500"> new confirmation code.</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 bg-white mt-10 rounded-md"
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

        <input
          type="submit"
          value="Send New Code"
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
          to="/auth/forgot-password"
          className="text-center text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Forgot your password? Reset it
        </Link>
      </nav>
    </>
  );
};

export default RequestNewCodeView;
