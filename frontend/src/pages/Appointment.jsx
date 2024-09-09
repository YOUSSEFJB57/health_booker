import { Helmet } from 'react-helmet-async';
import { useAuth } from 'src/api/Auth/AuthContext';
import { useRouter } from 'src/routes/hooks';
import { useEffect } from 'react';


import AppointementView from 'src/sections/user/view/Appointmenrt-view';


// ----------------------------------------------------------------------

export default function AppointmentPage() {

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <AppointementView />
    </>
  );
}
