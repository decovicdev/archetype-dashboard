import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import AuthService from 'services/auth.service';
import { auth } from 'services/firebaseAuth.service';

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

  const init = useCallback(() => {
    try {
      onAuthStateChanged(auth, async (user) => {
        try {
          setCurrentUser(user);
          if (!user) {
            sessionStorage.clear();
            return setIsAuthLoading(false);
          }
          const token = await user?.getIdToken();
          sessionStorage.setItem('token', token);
          const response = await AuthService.getDetails();
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
      {children}
    </AuthContext.Provider>
  );
};
