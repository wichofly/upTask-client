import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const AppLayout = lazy(() => import('./layout/AppLayout'));
const AuthLayout = lazy(() => import('./layout/AuthLayout'));
const ProfileLayout = lazy(() => import('./layout/ProfileLayout'));

const DashboardView = lazy(() => import('./views/DashboardView'));
const CreateProjectView = lazy(
  () => import('./views/projects/CreateProjectView')
);
const ProjectDetailsView = lazy(
  () => import('./views/projects/ProjectDetailsView')
);
const EditProjectView = lazy(() => import('./views/projects/EditProjectView'));
const ProjectTeamView = lazy(() => import('./views/projects/ProjectTeamView'));

const LoginView = lazy(() => import('./views/auth/LoginView'));
const RegisterView = lazy(() => import('./views/auth/RegisterView'));
const ConfirmAccountView = lazy(
  () => import('./views/auth/ConfirmAccountView')
);
const RequestNewCodeView = lazy(
  () => import('./views/auth/RequestNewCodeView')
);
const ForgotPasswordView = lazy(
  () => import('./views/auth/ForgotPasswordView')
);
const ResetPasswordView = lazy(() => import('./views/auth/ResetPasswordView'));

const ProfileView = lazy(() => import('./views/profile/ProfileView'));
const ChangePasswordView = lazy(
  () => import('./views/profile/ChangePasswordView')
);
const NotFound = lazy(() => import('./views/404/NotFound'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<p className="text-2xl text-center mt-10">Loading...</p>}
      >
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView />} index />
            <Route path="/projects/create" element={<CreateProjectView />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailsView />}
            />
            <Route
              path="/projects/:projectId/edit"
              element={<EditProjectView />}
            />
            <Route
              path="/projects/:projectId/team"
              element={<ProjectTeamView />}
            />

            <Route element={<ProfileLayout />}>
              <Route path="/profile" element={<ProfileView />} />
              <Route
                path="/profile/password"
                element={<ChangePasswordView />}
              />
            </Route>
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/auth/register" element={<RegisterView />} />
            <Route
              path="/auth/confirm-account"
              element={<ConfirmAccountView />}
            />
            <Route path="/auth/request-code" element={<RequestNewCodeView />} />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordView />}
            />
            <Route
              path="/auth/reset-password"
              element={<ResetPasswordView />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
