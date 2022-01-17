import React, { useState, useEffect, useContext, useCallback } from 'react';

import { AUTH_STORAGE_KEY, FAVORITES_LIST, WATCH_LATER_LIST } from '../../utils/constants';
import { storage } from '../../utils/storage';

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const mockedUser = {
    id: '123',
    name: 'Wizeline',
    avatarUrl: 'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
  };

  useEffect(() => {
    const lastAuthState = storage.get(AUTH_STORAGE_KEY);
    const isAuthenticated = Boolean(lastAuthState);

    setAuthenticated(isAuthenticated);
  }, []);

  async function login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'wizeline' && password === 'Rocks!') {
          setAuthenticated(true);
          setUser(mockedUser);
          storage.set(AUTH_STORAGE_KEY, true);
          storage.set(FAVORITES_LIST, []);
          storage.set(WATCH_LATER_LIST, []);
          return resolve(mockedUser);
        }
        return reject(new Error('Username or password invalid'));
      }, 500);
    });
  }

  // const login = useCallback(() => {
  //   loginApi()
  //   setAuthenticated(true);
  //   setUser(mockedUser);
  //   storage.set(AUTH_STORAGE_KEY, true);
  // }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
    setUser(null);
    storage.set(AUTH_STORAGE_KEY, false);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
export default AuthProvider;
