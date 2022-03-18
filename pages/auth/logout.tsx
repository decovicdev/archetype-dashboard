import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/_common/Button';
import AuthService from 'services/auth.service';
import AuthLayout from 'components/auth/AuthLayout';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';
import Spinner from 'components/_common/Spinner';

const LogoutPage: NextPage = () => {
  const [networkError, setNetworkError] = useState(null);
  const router = useRouter();
  const { currentUser } = useAuth();

  const logout = useCallback(async () => {
    if (!currentUser) return router.push(ROUTES.AUTH.LOGIN);
    try {
      await AuthService.logout();
      router.push(ROUTES.HOME);
    } catch (err) {
      setNetworkError(err);
    }
  }, [currentUser, router]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <AuthLayout>
      {networkError ? <Button onClick={logout}>Try Again</Button> : <Spinner />}
    </AuthLayout>
  );
};

export default LogoutPage;
