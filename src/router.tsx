import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardView from './views/DashboardView';
import { CreateProjectView } from './views/projects/CreateProjectView';
import { ProjectDetailsView } from './views/projects/ProjectDetailsView';
import { EditProjectView } from './views/projects/EditProjectView';
import { AuthLayout } from './layout/AuthLayout';
import { LoginView } from './views/auth/LoginView';
import { RegisterView } from './views/auth/RegisterView';
import { ConfirmAccountView } from './views/auth/ConfirmAccountView';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
