import React from 'react';
import { fireEvent, render, screen} from '@testing-library/react';
import SideBar from './SideBar';

describe('renders side bar', () => {
    it('must display message', () => {
        render(<SideBar />);

        const message = screen.getByText(/Home/i);
        expect(message).toBeInTheDocument();
    })

    test('change option home', () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        const {getByText} = render(<SideBar/>);
        const homeButton = getByText('Home');
        fireEvent.click(homeButton);

        expect(setStateMock).toHaveBeenCalledWith('home');
    });

    test('change option favorite', () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        const {getByText} = render(<SideBar/>);
        const favoriteButton = getByText('Favorites');
        fireEvent.click(favoriteButton);

        expect(setStateMock).toHaveBeenCalledWith('favorites');
    });

    test('change option watchLater', () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        const {getByText} = render(<SideBar/>);
        const watchLaterButton = getByText('Watch Later');
        fireEvent.click(watchLaterButton);

        expect(setStateMock).toHaveBeenCalledWith('watchLater');
    });
});

