import React, { createContext, useState, useEffect } from 'react';

type AccountContextType = {
  showAlertBar: boolean;
  setShowAlertBar: (val: boolean) => void;
  isHydrated: boolean;
  shouldShowAlertBar: boolean;
  delayedShowAlertBar: boolean;
};

const AccountContext = createContext<AccountContextType>({
  showAlertBar: true,
  setShowAlertBar: () => {},
  isHydrated: false,
  shouldShowAlertBar: false,
  delayedShowAlertBar: false,
});

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showAlertBar, setShowAlertBarState] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [shouldShowAlertBar, setShouldShowAlertBar] = useState<boolean>(false);
  const [delayedShowAlertBar, setDelayedShowAlertBar] =
    useState<boolean>(false);
  const [wasEverVisible, setWasEverVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('showAlertBar');
      // Show alert bar if localStorage is not explicitly set to 'false'
      const shouldShow = stored !== 'false';
      setShouldShowAlertBar(shouldShow);
      setShowAlertBarState(shouldShow);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (shouldShowAlertBar) {
      setDelayedShowAlertBar(true);
      setWasEverVisible(true);
    } else if (wasEverVisible) {
      const timer = setTimeout(() => {
        setDelayedShowAlertBar(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [shouldShowAlertBar, wasEverVisible]);

  const setShowAlertBar = (val: boolean) => {
    setShowAlertBarState(val);
    setShouldShowAlertBar(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('showAlertBar', val.toString());
    }
  };

  return (
    <AccountContext.Provider
      value={{
        showAlertBar,
        setShowAlertBar,
        isHydrated,
        shouldShowAlertBar,
        delayedShowAlertBar,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
