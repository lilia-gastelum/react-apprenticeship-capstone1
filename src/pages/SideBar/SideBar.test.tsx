import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import SideBar from './SideBar';
import { Router } from 'react-router-dom';

describe('renders side bar', () => {
    it('must display message', () => {
        render(<SideBar />);

        const message = screen.getByText(/Home/i);
        expect(message).toBeInTheDocument();
    })


    test('change option home', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <SideBar />
            </Router>
        );
        const button = screen.getByText('Home');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe('/home');
    });

    test('change option favorites', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <SideBar />
            </Router>
        );
        const button = screen.getByText('Favorites');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe('/favorites');
    });

    test('change option watch later', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <SideBar />
            </Router>
        );
        const button = screen.getByText('Watch Later');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe('/watchLater');
    });
});

