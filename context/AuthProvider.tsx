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
      onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        if (!user) {
          sessionStorage.clear();
          return setIsAuthLoading(false);
        }
        const token = await user?.getIdToken();
        sessionStorage.setItem('token', token);
        if (!sessionStorage.getItem('appId')) {
          const response = await AuthService.getDetails();
          if (response?.app_id) {
            sessionStorage.setItem('appId', response.app_id);
          }
        }
        setIsAuthLoading(false);
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
