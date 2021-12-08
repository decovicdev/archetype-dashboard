import { useContext } from "react";

import PrivateRoute from "../components/_common/PrivateRoute";
import Spinner from "../components/_common/Spinner";
import Settings from "../components/Settings";

import { AuthContext } from "../context/auth";

const Component = () => {
  const { authPending } = useContext(AuthContext);

  if (authPending) {
    return <Spinner />;
  }

  return (
    <PrivateRoute>
      <Settings />
    </PrivateRoute>
  );
};

export default Component;
