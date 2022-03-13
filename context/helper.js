import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

import Alert from "../components/_common/Alert";

export const HelperContext = React.createContext();

export const HelperProvider = (props) => {
  const [isMobileView, setMobileView] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});

  // shared email and password fields between Login and SignUp components
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  useEffect(() => {
    setMobileView(isMobile);
  }, []);

  return (
    <HelperContext.Provider
      value={{
        isMobile: isMobileView,
        authEmail,
        setAuthEmail,
        authPassword,
        setAuthPassword,
        showAlert: (message, isSuccess = false) => {
          setAlertMsg({ message, isSuccess });
        },
      }}
    >
      {props.children}
      <Alert data={alertMsg} />
    </HelperContext.Provider>
  );
};
