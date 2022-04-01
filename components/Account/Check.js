import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Spinner from '../_common/Spinner';

const Component = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.query.mode === 'resetPassword') {
      router.push({
        pathname: '/auth/change-password',
        query: router.query
      });
    }

    if (router.query.mode === 'verifyEmail') {
      router.push({ pathname: '/auth/verify-email', query: router.query });
    }
  }, [router]);

  return (
    <div className="page">
      <Spinner />
    </div>
  );
};

export default Component;
