import PrivateRoute from '../../components/_common/PrivateRoute';
import Spinner from '../../components/_common/Spinner';
import AddTier from '../../components/Tiers/Add';

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
      <AddTier />
    </PrivateRoute>
  );
};

export default Component;
