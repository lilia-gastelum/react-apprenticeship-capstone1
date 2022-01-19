import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Favorites from './Favorites';
import VideoItem from '../Home/VideoItem';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppContextProvider } from "../../utils/contexts/AppContext";
import { FAVORITES_LIST } from '../../utils/constants';

describe('renders total items ', () => {
  it('must display list', () => {
      render(
        <Favorites />
      );

    const message = screen.getByText(/Your favorites/i);
    expect(message).toBeInTheDocument();
  });
});

describe('renders video item', () => {
  it('must display thumbnail', () => {
    render(
      <AppContextProvider>
        <VideoItem />
      </AppContextProvider>
    );

    const message = screen.getByAltText(/thumbnail/i);
    expect(message).toBeInTheDocument();
  });

  test('redirects to video player', () => {
    const history = createMemoryHistory();

    render(
      <AppContextProvider>
        <Router history={history}>
          <VideoItem />
        </Router>
      </AppContextProvider>
    );

    const button = screen.getByAltText(/thumbnail/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toMatch('/video/');
  });
});



