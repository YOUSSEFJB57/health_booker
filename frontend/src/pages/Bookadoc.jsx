import { Helmet } from 'react-helmet-async';
import { useAuth } from 'src/api/Auth/AuthContext';
import { useRouter } from 'src/routes/hooks';
import { useEffect } from 'react';

import BookAdocView from 'src/sections/overview/view/bookadoc-view';


// ----------------------------------------------------------------------

export default function Bookadoc() {

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <BookAdocView />
    </>
  );
}
