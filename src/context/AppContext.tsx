import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AppNotification, UserRole } from '../types';
import { mockNotifications } from '../data/mockData';

interface AppContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isTwoFactorComplete: boolean;
  setTwoFactorComplete: (value: boolean) => void;
  notifications: AppNotification[];
  addNotification: (notification: AppNotification) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('admin');
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const [isTwoFactorComplete, setTwoFactorCompleteState] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
    if (!value) {
      setTwoFactorCompleteState(false);
    }
  };

  const setTwoFactorComplete = (value: boolean) => {
    setTwoFactorCompleteState(value);
  };

  const addNotification = (notification: AppNotification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const clearNotifications = () => setNotifications([]);

  const value = useMemo<AppContextValue>(
    () => ({
      role,
      setRole,
      isAuthenticated,
      setIsAuthenticated,
      isTwoFactorComplete,
      setTwoFactorComplete,
      notifications,
      addNotification,
      clearNotifications,
    }),
    [role, isAuthenticated, isTwoFactorComplete, notifications],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppContextProvider');
  }
  return context;
};
