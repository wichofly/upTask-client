import { type Dispatch, type SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { toast } from 'react-toastify';
import type { ConfirmToken } from '../../types';
import { validateToken } from '../../api/AuthAPI';
import { Link } from 'react-router-dom';

type NewPasswordTokenProps = {
  token: ConfirmToken['token'];
  setToken: Dispatch<SetStateAction<string>>;
  setIsValidCode: Dispatch<SetStateAction<boolean>>;
};

export const NewPasswordToken = ({
  token,
  setToken,
  setIsValidCode,
}: NewPasswordTokenProps) => {
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onSuccess: (data) => {
      toast.success(data);
      setIsValidCode(true); // render the NewPasswordForm component
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
          to="/auth/forgot-password"
          className="text-center text-xl text-gray-300 font-normal hover:text-fuchsia-500 transition-colors duration-300"
        >
          Request new code
        </Link>
      </nav>
    </>
  );
};
