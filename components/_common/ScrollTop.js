import { useEffect } from "react";
import { useRouter } from "next/router";

const Component = () => {
  const router = useRouter();

  useEffect(() => {
    if (!window) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [router.pathname]);

  return null;
};

export default Component;
