import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import AuthProvider from '../../providers/Auth';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppContextProvider } from "../../utils/contexts/AppContext";

describe('renders header', () => {
  it('must display menu', () => {
    render(
      <AppContextProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </AppContextProvider>
    );
    const message = screen.getByText(/Wizeline/i);
    expect(message).toBeInTheDocument();
  });

  test('it goes to home on click', () => {
    const history = createMemoryHistory();
    render(
      <AppContextProvider>
        <Router history={history}>
          <AuthProvider>
            <Header />
          </AuthProvider>
        </Router>
      </AppContextProvider>
    );
    const button = screen.getByText('Wizeline');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/home');
  });

  test('Search input allows writing', () => {
    const { getByRole, getByText } = render(
        <AppContextProvider>
            <AuthProvider>
              <Header />
            </AuthProvider>
        </AppContextProvider>
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Wizeline'}})
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    getByText('Wizeline')
})
});
