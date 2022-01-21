import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [appContext, setAppContext] = useState({
      favorites: [],
      watchLater: [],
      term: '',
      themeIsDark: false
  });
  const value = { appContext, setAppContext };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useAppContext must be used within a AppContextProvider"
    );
  }
  return context;
};

export { AppContextProvider, useAppContext };
