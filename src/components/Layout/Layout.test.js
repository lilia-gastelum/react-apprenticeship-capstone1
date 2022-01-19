import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Layout from './Layout.component';
import AuthProvider from '../../providers/Auth';
import { AppContextProvider } from "../../utils/contexts/AppContext";
import { AUTH_STORAGE_KEY } from '../../utils/constants';

describe('renders layout', () => {
  it('must display form logged', () => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));
    render(
      <AppContextProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </AppContextProvider>

    );
    const message = screen.getByTitle(/main/i);
    expect(message).toBeInTheDocument();
  });

  it('must display form logged out', () => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));
    render(
      <AppContextProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </AppContextProvider>

    );
    const message = screen.getByTitle(/main/i);
    expect(message).toBeInTheDocument();
  });
});
