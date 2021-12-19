import { useContext } from "react";

import Spinner from "../components/_common/Spinner";
import Pricing from "../components/Pricing";

import { AuthContext } from "../context/auth";

const Component = () => {
  const { authPending } = useContext(AuthContext);

  if (authPending) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return <Pricing />;
};

export default Component;
