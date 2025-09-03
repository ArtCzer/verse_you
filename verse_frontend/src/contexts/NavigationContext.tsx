import React, { createContext, useContext, useState, ReactNode } from 'react';

type Page = 'signup' | 'signin';

interface NavigationContextType {
  currentPage: Page;
  navigateToSignUp: () => void;
  navigateToSignIn: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('signup');

  const navigateToSignUp = () => setCurrentPage('signup');
  const navigateToSignIn = () => setCurrentPage('signin');

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        navigateToSignUp,
        navigateToSignIn,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};