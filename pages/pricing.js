import Spinner from '../components/_common/Spinner';
import Pricing from '../components/Pricing';

import { useAuth } from '../context/AuthProvider';

const Component = () => {
  const { isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return <Pricing />;
};

export default Component;
