import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/_common/Button';
import AuthLayout from 'components/_layout/AuthLayout';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';
import Spinner from 'components/_common/Spinner';
import { useApi } from 'context/ApiProvider';

const LogoutPage: NextPage = () => {
  const [networkError, setNetworkError] = useState(null);
  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();
  const { auth } = useApi();

  const logout = useCallback(async () => {
    if (!currentUser) return router.push(ROUTES.AUTH.LOGIN);
    try {
      await auth.logout();
      await router?.push?.(ROUTES.HOME);
    } catch (err) {
      setNetworkError(err);
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (isAuthLoading) return;
    logout();
  }, [isAuthLoading, logout]);

  return (
    <AuthLayout title="Logout">
      {networkError ? <Button onClick={logout}>Try Again</Button> : <Spinner />}
    </AuthLayout>
  );
};

export default LogoutPage;
