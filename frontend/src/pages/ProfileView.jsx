import { Helmet } from 'react-helmet-async';
import { useAuth } from 'src/api/Auth/AuthContext';
import { useRouter } from 'src/routes/hooks';
import { useEffect } from 'react';


import PatientView from 'src/sections/user/view/patient-view';
import ProfileView from 'src/sections/overview/view/ProfileView';

// ----------------------------------------------------------------------

export default function ProfileSetting() {

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
