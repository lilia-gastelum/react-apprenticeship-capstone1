import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AuthProvider from '../../providers/Auth';
import HomePage from './HomePage';
import VideoItem from './VideoItem';

const model = {
    etag: '',
    kind: '',
    nextPageToken: '',
    regionCode: '',
    pageInfo: {
        totalResults: 2323,
        resultsPerPage: 25
    },
    items: [
        {
            kind: '',
            etag: '',
            id: {
                kind: '',
                videoId: '',
                snippet: {
                    channelId: "UCPGzT4wecuWM0BH9mPiulXg",
                    channelTitle: "Wizeline",
                    description: "Follow Hector Padilla, Wizeline Director of Engineering, for a lively tour of our office. In 2018, Wizeline opened its stunning new office in Guadalajara, Jalisco, ...",
                    liveBroadcastContent: "none",
                    publishTime: "2019-09-30T23:54:32Z",
                    publishedAt: "2019-09-30T23:54:32Z",
                    thumbnails: {
                        default: { url: "https://i.ytimg.com/vi/nmXMgqjQzls/default.jpg", width: 120, height: 90 },
                        high: { url: "https://i.ytimg.com/vi/nmXMgqjQzls/hqdefault.jpg", width: 480, height: 360 },
                        medium: { url: "https://i.ytimg.com/vi/nmXMgqjQzls/mqdefault.jpg", width: 320, height: 180 },
                    },
                    title: "Video Tour | Welcome to Wizeline Guadalajara"
                }
            }
        }
    ]
};
// const mockLogOut = jest.fn();

// jest.mock('../../providers/Auth', () => ({
//     __esModule: true,
//     useAuth: () => {
//       return {
//           authenticated: true,
//           logout: mockLogOut
//       };
//     },
//   }));

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(model),
    })
);

describe('renders total items message', () => {
    it('must display message', async () => {
        await waitFor(() => {
            render(
                <AuthProvider>
                    <HomePage />
                </AuthProvider>
            );
        });

        const message = screen.getByText(/showing/i);
        expect(message).toBeInTheDocument();
    })

    it('fetch catches error', async () => {
        global.fetch.mockReturnValueOnce(Promise.reject());
        await waitFor(() => {
            render(
                <AuthProvider>
                    <HomePage />
                </AuthProvider>
            );
        });

        const message = screen.getByText(/showing/i);
        expect(message).toBeInTheDocument();
    })

    it('log out button', async () => {

        // console.log('antes del render');

        await waitFor(() => {
            render(
                <AuthProvider>
                    <HomePage />
                </AuthProvider>
            );
        });

        // console.log('después del render');
        const message = screen.getByText(/showing/i);
        // const logOutButton = screen.getByTitle('Log Out');
        // await waitFor(() => {
        //     fireEvent.click(logOutButton);
        // });
        // expect(mockLogOut).toHaveBeenCalled();
        expect(message).toBeInTheDocument();
    })
});

describe('renders video item', () => {
    it('must display message', async () => {
        render(<VideoItem />);

        const message = screen.getByAltText(/thumbnail/i);
        expect(message).toBeInTheDocument();
    })

});

