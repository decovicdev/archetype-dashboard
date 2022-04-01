import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';

const PrivateRoute = ({
  children
}: {
  children?: ReactElement;
}): ReactElement => {
  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!currentUser) {
      void router.push(ROUTES.AUTH.LOGIN);
    } else if (!currentUser.emailVerified) {
      void router.push(ROUTES.AUTH.VERIFY);
    }
  }, [currentUser, isAuthLoading, router]);

  if (isAuthLoading) return <Spinner />;

  if (currentUser?.emailVerified) {
    return children;
  }

  return null;
};

export default PrivateRoute;
