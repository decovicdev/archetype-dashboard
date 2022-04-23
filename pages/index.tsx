import { useEffect } from 'react';
import { useRouter } from 'next/router';
import OnboardingLayout from 'components/_layout/OnboardingLayout';
import { useAuth } from 'context/AuthProvider';
import { ROUTES } from 'constant/routes';
import Spinner from 'components/_common/Spinner';

const HomePage = () => {
  const router = useRouter();
  const { isAuthLoading, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!currentUser) {
      void router.push(ROUTES.AUTH.SIGNUP);
    } else if (
      currentUser &&
      !currentUser.emailVerified &&
      !currentUser?.providerId?.includes('github')
    ) {
      void router.push(ROUTES.AUTH.VERIFY);
    } else {
      void router.push(ROUTES.DASHBOARD.DASHBOARD);
    }
  }, [currentUser, isAuthLoading, router]);

  return (
    <OnboardingLayout>
      <Spinner />
    </OnboardingLayout>
  );
};

export default HomePage;
