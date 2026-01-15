import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1 className="font-semibold text-center text-4xl text-white">
        404 - Page Not Found
      </h1>
      <p className="mt-10 text-center text-white text-xl">
        Go back to {''}
        <Link className="text-fuchsia-500 " to="/">
          Home Page
        </Link>
      </p>
    </>
  );
};

export default NotFound;
