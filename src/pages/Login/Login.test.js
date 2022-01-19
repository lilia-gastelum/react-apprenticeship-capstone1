import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import AuthProvider from '../../providers/Auth';

describe('renders login', () => {
  it('must display form', async () => {
    await waitFor(() => {
      render(
        <AuthProvider>
          <LoginPage open={true} />
        </AuthProvider>
      );
    });
    const input = screen.getByText(/Username/i);
    expect(input).toBeInTheDocument();
  });

  test('logs in', () => {
  
    render(
        <AuthProvider>
         <LoginPage open={true} />
       </AuthProvider>
    );
  
    const username = screen.getByRole('textbox', {name: 'username'});
    fireEvent.change(username, {target: {value: 'wizeline'}})
    const password = screen.getByTitle('password')
    fireEvent.change(password, {target: {value: 'Rocks!'}})
    const button = screen.getByRole('button', {name: 'Log In'});
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // const option = screen.getByText('Favorites');
    // expect(option).toBeInTheDocument();
  });
});
