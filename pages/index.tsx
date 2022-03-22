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
      router.push(ROUTES.AUTH.SIGNUP);
    } else if (currentUser && !currentUser.emailVerified) {
      router.push(ROUTES.AUTH.VERIFY);
    } else {
      router.push(ROUTES.DASHBOARD.DASHBOARD);
    }
  }, [currentUser, isAuthLoading, router]);

  return (
    <OnboardingLayout>
      <Spinner />
    </OnboardingLayout>
  );
};

export default HomePage;
