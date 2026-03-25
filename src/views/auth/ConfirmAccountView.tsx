import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import type { ConfirmToken } from '../../types';
import { confirmAccount } from '../../api/AuthAPI';

const ConfirmAccountView = () => {
  const [token, setToken] = useState<ConfirmToken['token']>('');

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data);
      navigate('/auth/login');
    },
    onError: (error) => {
      toast.error(error.message);
      setToken(''); // clear the input when token is invalid
    },
  });

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken['token']) => mutate({ token });

  return (
    <>
      <h1 className="text-4xl sm:text-5xl font-semibold text-white">
        Confirm Account
      </h1>
      <p className="text-lg sm:text-2xl font-light text-white mt-4 sm:mt-5">
        Check your <span className="text-fuchsia-500">email</span> to enter the
        code.
      </p>

      <form className="space-y-6 sm:space-y-8 p-5 sm:p-8 bg-white mt-8 sm:mt-10 rounded-md">
        <label className="font-normal text-lg sm:text-2xl text-center block">
          Enter confirmation code
        </label>
        <div className="flex justify-center gap-2 sm:gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-8 sm:mt-10 flex flex-col space-y-3 sm:space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-base sm:text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Resend Code
        </Link>
      </nav>
    </>
  );
};

export default ConfirmAccountView;
