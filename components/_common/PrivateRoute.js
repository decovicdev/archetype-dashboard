import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "../../context/auth";

const PrivateRoute = ({ children, ...rest }) => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/login");
    }
  }, [currentUser]);

  if (currentUser) {
    return children;
  }
  return null;
};

export default PrivateRoute;
