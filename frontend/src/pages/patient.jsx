import { Helmet } from 'react-helmet-async';
import { useAuth } from 'src/api/Auth/AuthContext';
import { useRouter } from 'src/routes/hooks';
import { useEffect } from 'react';


import PatientView from 'src/sections/user/view/patient-view';

// ----------------------------------------------------------------------

export default function PatientPage() {

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <PatientView />
    </>
  );
}
