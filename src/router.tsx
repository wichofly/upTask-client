import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardView from './views/DashboardView';
import { CreateProjectView } from './views/projects/CreateProjectView';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path='/projects/create' element={<CreateProjectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
