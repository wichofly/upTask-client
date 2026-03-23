import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Logo } from '../components/Logo';

const AuthLayout = () => {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="mx-auto w-full max-w-md px-4 py-8 sm:px-6 lg:py-16">
          <Logo />
          <div className="mt-8 sm:mt-10">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default AuthLayout;
