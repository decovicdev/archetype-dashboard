import { useContext } from 'react';

import PrivateRoute from '../../../components/_common/PrivateRoute';
import Spinner from '../../../components/_common/Spinner';
import EditTier from '../../../components/Tiers/Edit';

import { AuthContext } from '../../../context/auth';

const Component = () => {
  const { authPending } = useContext(AuthContext);

  if (authPending) {
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
