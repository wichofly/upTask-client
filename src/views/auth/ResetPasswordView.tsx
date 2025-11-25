import { useState } from 'react';
import { NewPasswordToken } from '../../components/auth/NewPasswordToken';
import { NewPasswordForm } from '../../components/auth/NewPasswordForm';
import type { ConfirmToken } from '../../types';

export const ResetPasswordView = () => {
  const [token, setToken] = useState<ConfirmToken['token']>('');
  const [isValidCode, setIsValidCode] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Please enter the code received in your{' '}
        <span className="text-fuchsia-500 font-semibold">email</span>
      </p>

      {!isValidCode ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidCode={setIsValidCode}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
};
