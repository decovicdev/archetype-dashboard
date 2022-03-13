import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "../../context/auth";

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/login");
    }
  }, [currentUser, router]);

  if (currentUser) {
    return children;
  }
  return null;
};

export default PrivateRoute;
