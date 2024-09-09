import { Helmet } from 'react-helmet-async';
import { useAuth } from 'src/api/Auth/AuthContext';
import { useRouter } from 'src/routes/hooks';
import { useEffect } from 'react';


import PatientAppointmentView from 'src/sections/user/view/PatientAppointmentView';

// ----------------------------------------------------------------------

export default function PatientApointment() {

  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <PatientAppointmentView />
    </>
  );
}
