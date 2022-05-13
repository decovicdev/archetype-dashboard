import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Spinner from './Spinner';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';
import { useApi } from 'context/ApiProvider';

const PrivateRoute = ({
  children
}: {
  children?: ReactElement;
}): ReactElement => {
  const router = useRouter();
  const { currentUser, isAuthLoading, isGithubAuth } = useAuth();
  const { auth } = useApi();

  const {
    data: api,
    isLoading,
    error
  } = useQuery('api', () => auth.getDetails());

  useEffect(() => {
    if (isAuthLoading) return;
    if (!currentUser) {
      void router.push(ROUTES.AUTH.LOGIN);
    } else if (!currentUser.emailVerified && !isGithubAuth) {
      void router.push(ROUTES.AUTH.VERIFY);
    } else if (!api && !isLoading) {
      void router.push(ROUTES.AUTH.ONBOARD);
    }
  }, [api, currentUser, isAuthLoading, isGithubAuth, isLoading, router]);

  if (isAuthLoading || isLoading) return <Spinner fullPage />;

  if (!api) return <Spinner fullPage />;

  if (currentUser?.emailVerified || isGithubAuth) {
    return children;
  }

  return null;
};

export default PrivateRoute;
