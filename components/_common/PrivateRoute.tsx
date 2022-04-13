import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Spinner from './Spinner';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';
import AuthService from 'services/auth.service';

const PrivateRoute = ({
  children
}: {
  children?: ReactElement;
}): ReactElement => {
  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();
  const { data: api, isLoading } = useQuery('lostApi', AuthService.getDetails);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!currentUser) {
      void router.push(ROUTES.AUTH.LOGIN);
    } else if (
      !currentUser.emailVerified &&
      !currentUser?.providerId?.includes('github')
    ) {
      void router.push(ROUTES.AUTH.VERIFY);
    } else if (!api && !isLoading) {
      void router.push(ROUTES.AUTH.ONBOARD);
    }
  }, [api, currentUser, isAuthLoading, isLoading, router]);

  if (isAuthLoading || isLoading) return <Spinner fullPage />;

  if (!api) return <Spinner fullPage />;

  if (
    currentUser?.emailVerified ||
    currentUser?.providerId?.includes('github')
  ) {
    return children;
  }

  return null;
};

export default PrivateRoute;
