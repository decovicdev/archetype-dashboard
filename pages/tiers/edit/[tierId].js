import PrivateRoute from '../../../components/_common/PrivateRoute';
import Spinner from '../../../components/_common/Spinner';
import EditTier from '../../../components/Tiers/Edit';

import { useAuth } from '../../../context/AuthProvider';

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
      <EditTier />
    </PrivateRoute>
  );
};

export default Component;
