import React, { useEffect, useState, useCallback } from "react";

import Firebase from "../firebase.js";
import Analytics from "../helpers/analytics";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authPending, setAuthPending] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const init = useCallback(() => {
    try {
      Firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);

        if (!user) {
          sessionStorage.removeItem("token");

          return setAuthPending(false);
        }

        Analytics.identify(user.uid, {
          email: user.email,
          displayName: user.displayName || "",
        });

        user.getIdToken().then((token) => {
          sessionStorage.setItem("token", token);

          setAuthPending(false);
        });
      });
    } catch (e) {
      console.warn(e);

      setAuthPending(false);
    }
  }, []);

  useEffect(() => {
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authPending,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
