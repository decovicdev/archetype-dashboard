import { useContext } from "react";

import PrivateRoute from "../../components/_common/PrivateRoute";
import Spinner from "../../components/_common/Spinner";
import TierDetails from "../../components/Tiers/Details";

import { AuthContext } from "../../context/auth";

const Component = () => {
  const { authPending } = useContext(AuthContext);

  if (authPending) {
    return <Spinner />;
  }

  return (
    <PrivateRoute>
      <TierDetails />
    </PrivateRoute>
  );
};

export default Component;
