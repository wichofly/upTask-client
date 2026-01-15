import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import AuthRoutes from './routes/AuthRoutes';

const AuthLayout = lazy(() => import('./layout/AuthLayout'));

const NotFound = lazy(() => import('./views/404/NotFound'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<p className="text-2xl text-center mt-10">Loading...</p>}
      >
        <Routes>
          {AppRoutes()}

          {AuthRoutes()}

          <Route element={<AuthLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
