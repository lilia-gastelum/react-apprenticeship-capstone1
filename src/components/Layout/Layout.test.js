import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Layout from './Layout.component';

describe('renders layout', () => {
  it('must display form', async () => {
    await waitFor(() => {
      render(<Layout />);
    });
    const message = screen.getByTitle(/main/i);
    expect(message).toBeInTheDocument();
  });
});
