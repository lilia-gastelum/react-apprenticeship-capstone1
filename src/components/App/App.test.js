import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.component';
import {AppContextProvider} from "../../utils/contexts/AppContext";

describe('renders app', () => {
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
