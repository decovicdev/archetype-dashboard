import PrivateRoute from '../../components/_common/PrivateRoute';
import Spinner from '../../components/_common/Spinner';
import TierOverview from '../../components/Tiers/Overview';

import { useAuth } from '../../context/AuthProvider';

const Component = () => {
  const { isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return (
    <PrivateRoute>
      <TierOverview />
    </PrivateRoute>
  );
};

export default Component;
