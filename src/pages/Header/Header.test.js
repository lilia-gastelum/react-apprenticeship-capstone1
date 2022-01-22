import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Header from './Header';
import AuthProvider from '../../providers/Auth';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('renders header', () => {
  it('must display menu', async () => {
    await waitFor(() => {
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
    });
    const message = screen.getByText(/Wizeline/i);
    expect(message).toBeInTheDocument();
  });

  test('it goes to home on click', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <AuthProvider>
          <Header />
        </AuthProvider>
        </Router>
    );
    const button = screen.getByText('Wizeline');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/home');
});
});
