import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const AppLayout = () => {
  const { data, isError, isLoading } = useAuth();

  if (isLoading)
    return <p className="text-2xl text-center mt-10">Loading...</p>;

  if (isError) return <Navigate to="/auth/login" />;

  if (data)
    return (
      <>
        <Header name={data.name} />

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </section>

        <Footer />

        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
};

export default AppLayout;
