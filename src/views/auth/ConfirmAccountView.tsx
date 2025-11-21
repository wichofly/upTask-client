import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import type { ConfirmToken } from '../../types';
import { confirmAccount } from '../../api/AuthAPI';

export const ConfirmAccountView = () => {
  const [token, setToken] = useState<ConfirmToken['token']>('');

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken['token']) => mutate({ token });

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Confirm Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Check your <span className="text-fuchsia-500">email</span> to enter the
        code.
      </p>

      <form className="space-y-8 p-10 bg-white mt-10 rounded-md">
        <label className="font-normal text-2xl text-center block">
          Enter confirmation code
        </label>
        <div className="flex justify-center gap-5">
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

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/new-code"
          className="text-center text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Resend Code
        </Link>
      </nav>
    </>
  );
};
