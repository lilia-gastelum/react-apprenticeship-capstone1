import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import AuthProvider from '../../providers/Auth';

describe('renders login', () => {
  it('must display form', async () => {
    await waitFor(() => {
      render(
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      );
    });
    const message = screen.getByText(/username/i);
    expect(message).toBeInTheDocument();
  });
});
