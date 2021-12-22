import { useContext } from "react";

import Spinner from "../components/_common/Spinner";

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

  return (
    <div className="page">
      <div className={"content"}>
        <div className={"no-content"}>Coming Soon</div>
      </div>
    </div>
  );
};

export default Component;
