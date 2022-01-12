import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App.component';

describe('renders app', () => {
    it('must display app', async () => {
            render(<App/>);
        const message = screen.getByTitle(/main/i);
        expect(message).toBeInTheDocument();
    })
});