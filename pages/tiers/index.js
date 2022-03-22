import PrivateRoute from '../../components/_common/PrivateRoute';
import Spinner from '../../components/_common/Spinner';
import Tiers from '../../components/Tiers';

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
      <Tiers />
    </PrivateRoute>
  );
};

export default Component;
