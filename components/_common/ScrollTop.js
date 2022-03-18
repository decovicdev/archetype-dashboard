import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScrollTop = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [router.pathname]);

  return null;
};

export default ScrollTop;
