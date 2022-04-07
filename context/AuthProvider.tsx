import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import AuthService, { auth } from 'services/auth.service';

type AuthContextValue = {
  isAuthLoading: boolean;
  currentUser?: User | null;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthLoading: false,
  currentUser: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(null);

  const init = useCallback(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        if (!user) {
          sessionStorage.clear();
          return setIsAuthLoading(false);
        }
        user
          .getIdToken()
          .then((token) => {
            sessionStorage.setItem('token', token);
            if (!sessionStorage.getItem('appId')) {
              return AuthService.getDetails();
            }
          })
          .then((response) => {
            if (response?.app_id) {
              sessionStorage.setItem('appId', response.app_id);
            }
            setIsAuthLoading(false);
          })
          .catch(() => {
            setIsAuthLoading(false);
          });
      });
    } catch {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <AuthContext.Provider value={{ isAuthLoading, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
