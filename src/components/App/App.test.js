import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.component';
import {AppContextProvider} from "../../utils/contexts/AppContext";
import { AUTH_STORAGE_KEY } from '../../utils/constants';

describe('renders app', () => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));
    it('must display app', async () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );
    const message = screen.getByTitle(/main/i);
    expect(message).toBeInTheDocument();
  });
});
