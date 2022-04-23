import React, { useState, useEffect, createContext, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import Alert from 'components/_common/Alert';

type HelperContextValue = {
  isMobile: boolean;
  showAlert: (message: string, isSuccess?: boolean) => void;
};

const HelperContext = createContext<HelperContextValue>({
  isMobile: false,
  showAlert: null
});

export const useHelpers = () => useContext(HelperContext);

export const HelperProvider = ({ children }) => {
  const [isMobileView, setMobileView] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{
    message?: string;
    isSuccess?: boolean;
  }>({});

  useEffect(() => {
    setMobileView(isMobile);
  }, []);

  return (
    <HelperContext.Provider
      value={{
        isMobile: isMobileView,
        showAlert: (message: string, isSuccess = false) => {
          setAlertMsg({ message, isSuccess });
        }
      }}
    >
      {children}
      <Alert data={alertMsg} />
    </HelperContext.Provider>
  );
};
