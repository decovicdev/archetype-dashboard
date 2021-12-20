import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Spinner from "../../components/_common/Spinner";

import Check from "../../components/Account/Check";

const Component = () => {
  const router = useRouter();

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  if (!isReady) {
    return <Spinner />;
  }

  return <Check />;
};

export default Component;
