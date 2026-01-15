import { Route } from 'react-router-dom';
import { lazy } from 'react';

const AuthLayout = lazy(() => import('../layout/AuthLayout'));
const LoginView = lazy(() => import('../views/auth/LoginView'));
const RegisterView = lazy(() => import('../views/auth/RegisterView'));
const ConfirmAccountView = lazy(
  () => import('../views/auth/ConfirmAccountView')
);
const RequestNewCodeView = lazy(
  () => import('../views/auth/RequestNewCodeView')
);
const ForgotPasswordView = lazy(
  () => import('../views/auth/ForgotPasswordView')
);
const ResetPasswordView = lazy(() => import('../views/auth/ResetPasswordView'));

export default function AuthRoutes() {
  return (
    <Route element={<AuthLayout />}>
      <Route path="/auth/login" element={<LoginView />} />
      <Route path="/auth/register" element={<RegisterView />} />
      <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
      <Route path="/auth/request-code" element={<RequestNewCodeView />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
      <Route path="/auth/reset-password" element={<ResetPasswordView />} />
    </Route>
  );
}
