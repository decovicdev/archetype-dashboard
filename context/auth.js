import React, { useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/router';

// import Firebase from '../firebase.js';
// import Analytics from '../helpers/analytics';
// import AccountService from '../services/account.service';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // const router = useRouter();

  const [authPending, setAuthPending] = useState(true);
  const [currentUser] = useState(null);

  const init = useCallback(() => {
    try {
      // Firebase.auth().onAuthStateChanged((user) => {
      //   setCurrentUser(user);
      //   if (!user) {
      //     sessionStorage.clear();
      //     return setAuthPending(false);
      //   }
      //   Analytics.identify(user.uid, {
      //     email: user.email,
      //     displayName: user.displayName || ''
      //   });
      //   user
      //     .getIdToken()
      //     .then((token) => {
      //       sessionStorage.setItem('token', token);
      //       if (
      //         !sessionStorage.getItem('appId') &&
      //         !['/account/signup', '/account/signup/next'].includes(
      //           router.pathname
      //         )
      //       ) {
      //         return AccountService.getDetails();
      //       }
      //     })
      //     .then((response) => {
      //       if (response?.app_id) {
      //         sessionStorage.setItem('appId', response.app_id);
      //       }
      //       setAuthPending(false);
      //     })
      //     .catch(() => {
      //       setAuthPending(false);
      //     });
      // });
    } catch (e) {
      setAuthPending(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <AuthContext.Provider
      value={{
        authPending,
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
