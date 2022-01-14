import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Layout from './Layout.component';
import AuthProvider from '../../providers/Auth';

describe('renders layout', () => {
  it('must display form', async () => {
    await waitFor(() => {
      render(
        <AuthProvider>
          <Layout />
        </AuthProvider>
      );
    });
    const message = screen.getByTitle(/main/i);
    expect(message).toBeInTheDocument();
  });
});
