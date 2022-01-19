import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import AuthProvider from '../../providers/Auth';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppContextProvider } from "../../utils/contexts/AppContext";
import { AUTH_STORAGE_KEY } from '../../utils/constants';

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
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <AppContextProvider>
        <Router history={history}>
        <AuthProvider>
          <Header />
        </AuthProvider>
        </Router>
      </AppContextProvider>
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Wizeline' } })
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    getByText('Wizeline')
  })

  test('change options', async () => {
    const history = createMemoryHistory();
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));
    render(
      <AppContextProvider>
        <Router history={history}>
          <AuthProvider >
            <Header />
          </AuthProvider>
        </Router>
      </AppContextProvider>
    );
    const wlButton = screen.getByRole('option', {name: 'Watch later'});
    expect(wlButton).toBeInTheDocument();
    fireEvent.click(wlButton);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/watchLater');

    const fButton = screen.getByRole('option', {name: 'Favorites'});
    expect(fButton).toBeInTheDocument();
    fireEvent.click(fButton);
    expect(history.length).toBe(3);
    expect(history.location.pathname).toBe('/favorites');

    const hButton = screen.getByRole('option', {name: 'Home'});
    expect(hButton).toBeInTheDocument();
    fireEvent.click(hButton);
    expect(history.length).toBe(4);
    expect(history.location.pathname).toBe('/home');
  });
});
