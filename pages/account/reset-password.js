import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import ResetPassword from "../../components/Account/ResetPassword";

import { AuthContext } from "../../context/auth";

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return <ResetPassword />;
};

export default Component;
