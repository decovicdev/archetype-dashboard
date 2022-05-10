import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from 'services/firebaseAuth.service';
import Spinner from 'components/_common/Spinner';
import { useApi } from './ApiProvider';

type AuthContextValue = {
  isAuthLoading: boolean;
  currentUser?: User | null;
  isGithubAuth?: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthLoading: false,
  currentUser: null,
  isGithubAuth: undefined
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const api = useApi();

  const init = useCallback(() => {
    try {
      onAuthStateChanged(auth, async (user) => {
        try {
          setCurrentUser(user);
          if (!user) {
            sessionStorage.clear();
            return setIsAuthLoading(false);
          }

          const response = await api.auth.getDetails();
          if (response?.app_id) {
            sessionStorage.setItem('appId', response.app_id);
          }
          return setIsAuthLoading(false);
        } catch {
          return setIsAuthLoading(false);
        }
      });
    } catch {
      return setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const isGithubAuth = useMemo(
    () =>
      currentUser?.providerData?.some((provider) =>
        provider?.providerId?.includes('github')
      ),
    [currentUser?.providerData]
  );

  return (
    <AuthContext.Provider value={{ isAuthLoading, currentUser, isGithubAuth }}>
      {isAuthLoading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
