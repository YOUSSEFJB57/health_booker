import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AdminPage from 'src/pages/Admin';
import DashboardLayout from 'src/layouts/dashboard';
import AppointmentPage from 'src/pages/Appointment';
import PatientApointment from 'src/pages/PatientAppointment';
import Bookadoc from 'src/pages/Bookadoc';
import DocAp from 'src/pages/DocAp';
import RegisterAp from 'src/pages/RegisterAp';
import Home from 'src/pages/Home';
import DocSes from 'src/pages/DocSes';
import ProfileSetting from 'src/pages/ProfileView';

export const IndexPage  = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PatientPage  = lazy(() => import('src/pages/patient'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
      
        { path : 'dashboard' , element: <IndexPage />, },
        { path: 'Medecin', element: <UserPage /> },
        { path: 'Admin', element: <AdminPage /> },
        { path: 'Appointment', element: <AppointmentPage/> },
        { path: 'Patient', element: <PatientPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'PatientAppointment', element: <PatientApointment/> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'BookAdoctor', element: <Bookadoc /> },
        { path: 'MedecinAppointments', element: <DocAp /> },
        { path: 'MedecinSession', element: <DocSes /> },
        { path: 'ProfileView', element: <ProfileSetting /> },


       

      ],
    },
    { path : '/' , element: <Home  />, },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterAp />,
    },
    // { 
    //   path: 'Register', 
      
    //   element: <RegisterAp /> },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}