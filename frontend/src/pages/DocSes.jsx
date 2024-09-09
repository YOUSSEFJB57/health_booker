import { Helmet } from 'react-helmet-async';
import { useAuth } from 'src/api/Auth/AuthContext';
import { useRouter } from 'src/routes/hooks';
import { useEffect } from 'react';

import DocApView from 'src/sections/overview/view/DocAp-view';
import DocSesView from 'src/sections/overview/view/DocSes-view';

// ----------------------------------------------------------------------

export default function DocSes() {
  
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <DocSesView />
    </>
  );
}
