import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Layout from './Layout.component';
import AuthProvider from '../../providers/Auth';
import { AppContextProvider } from "../../utils/contexts/AppContext";

describe('renders layout', () => {
  it('must display form', () => {
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
