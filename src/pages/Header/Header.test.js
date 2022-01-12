import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Header from './Header';
import AuthProvider from '../../providers/Auth';

describe('renders header', () => {
    it('must display menu', async () => {
        await waitFor(() => {
            render(
                <AuthProvider>
                    <Header />
                </AuthProvider>
            );
        });
        const message = screen.getByText(/Wizeline/i);
        expect(message).toBeInTheDocument();
    })
});