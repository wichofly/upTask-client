import { Route } from 'react-router-dom';
import { lazy } from 'react';

const AppLayout = lazy(() => import('../layout/AppLayout'));
const ProfileLayout = lazy(() => import('../layout/ProfileLayout'));

const DashboardView = lazy(() => import('../views/DashboardView'));
const CreateProjectView = lazy(
  () => import('../views/projects/CreateProjectView')
);
const ProjectDetailsView = lazy(
  () => import('../views/projects/ProjectDetailsView')
);
const EditProjectView = lazy(() => import('../views/projects/EditProjectView'));
const ProjectTeamView = lazy(() => import('../views/projects/ProjectTeamView'));

const ProfileView = lazy(() => import('../views/profile/ProfileView'));
const ChangePasswordView = lazy(
  () => import('../views/profile/ChangePasswordView')
);

export default function AppRoutes() {
  return (
    <Route element={<AppLayout />}>
      <Route index path="/" element={<DashboardView />} />
      <Route path="/projects/create" element={<CreateProjectView />} />
      <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
      <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
      <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />

      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/profile/password" element={<ChangePasswordView />} />
      </Route>
    </Route>
  );
}
