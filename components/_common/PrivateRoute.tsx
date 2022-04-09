import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';
import { useApi } from 'hooks/useApi';

const PrivateRoute = ({
  children
}: {
  children?: ReactElement;
}): ReactElement => {
  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();
  const { data: api, isLoading } = useApi();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!currentUser) {
      void router.push(ROUTES.AUTH.LOGIN);
    } else if (!currentUser.emailVerified) {
      void router.push(ROUTES.AUTH.VERIFY);
    }
    if (!isLoading && !api && !sessionStorage.getItem('appId')) {
      void router.push(ROUTES.AUTH.ONBOARD);
    }
  }, [api, currentUser, isAuthLoading, isLoading, router]);

  if (isAuthLoading || isLoading) return <Spinner />;

  if (currentUser?.emailVerified) {
    return children;
  }

  return null;
};

export default PrivateRoute;
