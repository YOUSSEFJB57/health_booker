import { Helmet } from 'react-helmet-async';
import { useAuth } from 'src/api/Auth/AuthContext';
import { useRouter } from 'src/routes/hooks';
import { useEffect } from 'react';


import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {

  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <BlogView />
    </>
  );
}
