import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import VideoItem from './VideoItem';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppContextProvider } from "../../utils/contexts/AppContext";

jest.mock('axios');

const fetchVideos = async () => {
  try {
    return await axios.get(
      '/search', {
      params: {
        maxResults: 25,
        q: 'wizeline',
        type: "video"
      }
    }
    );
  } catch (e) {
    return [];
  }
};

const model = {
  etag: '',
  kind: '',
  nextPageToken: '',
  regionCode: '',
  pageInfo: {
    totalResults: 2323,
    resultsPerPage: 25,
  },
  items: [
    {
      kind: '',
      etag: '',
      id: {
        kind: '',
        videoId: '',
        snippet: {
          channelId: 'UCPGzT4wecuWM0BH9mPiulXg',
          channelTitle: 'Wizeline',
          description:
            'Follow Hector Padilla, Wizeline Director of Engineering, for a lively tour of our office. In 2018, Wizeline opened its stunning new office in Guadalajara, Jalisco, ...',
          liveBroadcastContent: 'none',
          publishTime: '2019-09-30T23:54:32Z',
          publishedAt: '2019-09-30T23:54:32Z',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/nmXMgqjQzls/default.jpg',
              width: 120,
              height: 90,
            },
            high: {
              url: 'https://i.ytimg.com/vi/nmXMgqjQzls/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/nmXMgqjQzls/mqdefault.jpg',
              width: 320,
              height: 180,
            },
          },
          title: 'Video Tour | Welcome to Wizeline Guadalajara',
        },
      },
    },
  ],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(model),
  })
);

describe('renders total items message', () => {
  it('must display message', async () => {

//     axios.get.mockResolvedValueOnce(model);
//       const result = await fetchVideos();
//       expect(axios.get).toHaveBeenCalledWith(
//         '/search', {
//         params: {
//           maxResults: 25,
//           q: 'wizeline',
//           type: "video"
//         }
//       }
//       );

    await waitFor(() => {
      render(
      <AppContextProvider>
      <HomePage />
      </AppContextProvider>
      );
    });

    const message = screen.getByText(/Hi, there!/i);
    expect(message).toBeInTheDocument();
  });

  // it('fetch catches error', async () => {
  //   global.fetch.mockReturnValueOnce(Promise.reject());
  //   await waitFor(() => {
  //     render(
  //     <AppContextProvider>
  //     <HomePage />
  //     </AppContextProvider>
  //     );
  //   });

  //   const message = screen.getByText(/Hi, there!/i);
  //   expect(message).toBeInTheDocument();
  // });

  // it('log out button', async () => {

  //   await waitFor(() => {
  //     render(
  //     <AppContextProvider>
  //     <HomePage />
  //     </AppContextProvider>
  //     );
  //   });

  //   const message = screen.getByText(/Hi, there!/i);
  //   expect(message).toBeInTheDocument();
  // });
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


describe("fetchData", () => {
  describe("when API call is successful", () => {
    it("should return video list", async () => {
      axios.get.mockResolvedValueOnce(model);
      const result = await fetchVideos();
      expect(axios.get).toHaveBeenCalledWith(
        '/search', {
        params: {
          maxResults: 25,
          q: 'wizeline',
          type: "video"
        }
      }
      );
      expect(result).toEqual(model);
    });
  });
});
