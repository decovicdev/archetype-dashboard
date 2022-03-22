import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ResetPassword from '../../components/Account/ResetPassword';

import { useAuth } from '../../context/AuthProvider';

const Component = () => {
  const router = useRouter();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  return <ResetPassword />;
};

export default Component;
