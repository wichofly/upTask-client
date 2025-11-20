import { Link } from 'react-router-dom';

export const ConfirmAccountView = () => {
  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Confirm Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Check your <span className="text-fuchsia-500">email</span> to enter the
        code.
      </p>

      <form className="space-y-8 p-10 bg-white mt-10 rounded-md">
        <label className="font-normal text-2xl text-center block">
          Enter your confirmation code
        </label>
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
