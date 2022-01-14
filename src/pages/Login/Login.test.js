import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import AuthProvider from '../../providers/Auth';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

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

  test('logs in', () => {
    const history = createMemoryHistory();
  
    render(
      <Router history={history}>
        <AuthProvider>
         <LoginPage/>
       </AuthProvider>
      </Router>
    );
  
    const button = screen.getByText('login');
    expect(button).toBeInTheDocument();
  
    fireEvent.click(button);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/home');
  });
});
