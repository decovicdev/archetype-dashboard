import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push(ROUTES.AUTH.LOGIN);
    } else if (!currentUser.emailVerified) {
      router.push(ROUTES.AUTH.VERIFY);
    }
  }, [currentUser, router]);

  if (currentUser?.emailVerified) {
    return children;
  }
  return null;
};

export default PrivateRoute;
