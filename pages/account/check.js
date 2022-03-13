import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Spinner from '../../components/_common/Spinner';

import Check from '../../components/Account/Check';

const Component = () => {
  const router = useRouter();

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  if (!isReady) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return <Check />;
};

export default Component;
