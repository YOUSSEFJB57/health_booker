import { Helmet } from 'react-helmet-async';
import RegisterView from 'src/sections/login/register-view';


// ----------------------------------------------------------------------

export default function RegisterAp() {
  return (
    <>
      <Helmet>
        <title> Register | Minimal UI </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
