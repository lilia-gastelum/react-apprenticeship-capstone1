import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import routeData from 'react-router';
import axiosMock from 'axios';
import RelatedVideos from './RelatedVideos';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppContextProvider } from "../../utils/contexts/AppContext";
import AuthProvider from '../../providers/Auth';
import { AUTH_STORAGE_KEY, FAVORITES_LIST, WATCH_LATER_LIST } from '../../utils/constants';

jest.mock('axios');

export const fetchVideos = async () => {
  try {
    return await axiosMock.get(
      '/search', {
      params: {
        maxResults: 25,
        relatedToVideoId: '',
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

describe('testing video player', () => {

  it('Renders from favorites with no state', () => {
    const history = createMemoryHistory();
    localStorage.setItem(FAVORITES_LIST, JSON.stringify([]));
    localStorage.setItem(WATCH_LATER_LIST, JSON.stringify([]));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));

    const mockLocation = {
      pathname: '/video',
      hash: '',
      search: '',
      state: undefined
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    render(
      <AppContextProvider>
        <Router history={history}>
          <AuthProvider>
            <VideoPlayer history={history} location />
          </AuthProvider>
        </Router>
      </AppContextProvider>
      );

    expect(history.location.pathname).toMatch('/notFound');
  });

  it('Renders from favorites with no list', () => {
    localStorage.setItem(FAVORITES_LIST, JSON.stringify([]));
    localStorage.setItem(WATCH_LATER_LIST, JSON.stringify([]));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));

    const mockLocation = {
      pathname: '/video',
      hash: '',
      search: '',
      state: {
        from: 'favorites',
        video: {
          ...model.items[0]
        }
      }
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    render(
      <AppContextProvider>
        <AuthProvider>
          <VideoPlayer location />
        </AuthProvider>
      </AppContextProvider>);

    const button = screen.getByRole('button', { name: 'favorite' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const newList = JSON.parse(localStorage.getItem(FAVORITES_LIST))
    expect(newList.length).toBe(1);
  });

  it('Renders from favorites with video in list', () => {
    localStorage.setItem(FAVORITES_LIST, JSON.stringify([{ ...model.items[0] }]));
    localStorage.setItem(WATCH_LATER_LIST, JSON.stringify([]));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));

    const mockLocation = {
      pathname: '/video',
      hash: '',
      search: '',
      state: {
        from: 'favorites',
        video: {
          ...model.items[0]
        }
      }
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    render(
      <AppContextProvider>
        <AuthProvider>
          <VideoPlayer location />
        </AuthProvider>
      </AppContextProvider>);

    const button = screen.getByRole('button', { name: 'favorite' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const newList = JSON.parse(localStorage.getItem(FAVORITES_LIST))
    expect(newList.length).toBe(0);
  });


  it('Renders from watch later with no list', () => {
    localStorage.setItem(FAVORITES_LIST, JSON.stringify([]));
    localStorage.setItem(WATCH_LATER_LIST, JSON.stringify([]));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));

    const mockLocation = {
      pathname: '/video',
      hash: '',
      search: '',
      state: {
        from: 'watchLater',
        video: {
          ...model.items[0]
        }
      }
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    render(
      <AppContextProvider>
        <AuthProvider>
          <VideoPlayer location />
        </AuthProvider>
      </AppContextProvider>);

    const button = screen.getByRole('button', { name: 'watchLater' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const newList = JSON.parse(localStorage.getItem(WATCH_LATER_LIST))
    expect(newList.length).toBe(1);
  });

  it('Renders from favorites with video in list', () => {
    localStorage.setItem(WATCH_LATER_LIST, JSON.stringify([{ ...model.items[0] }]));
    localStorage.setItem(FAVORITES_LIST, JSON.stringify([]));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));

    const mockLocation = {
      pathname: '/video',
      hash: '',
      search: '',
      state: {
        from: 'favorites',
        video: {
          ...model.items[0]
        }
      }
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    render(
      <AppContextProvider>
        <AuthProvider>
          <VideoPlayer location />
        </AuthProvider>
      </AppContextProvider>);

    const button = screen.getByRole('button', { name: 'watchLater' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const newList = JSON.parse(localStorage.getItem(WATCH_LATER_LIST))
    expect(newList.length).toBe(0);
  });


  it('Renders from unlogged', async () => {
    localStorage.setItem(FAVORITES_LIST, JSON.stringify([]));
    localStorage.setItem(WATCH_LATER_LIST, JSON.stringify([]));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));

    const mockLocation = {
      pathname: '/video',
      hash: '',
      search: '',
      state: {
        from: 'watchLater',
        video: {
          ...model.items[0]
        }
      }
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    render(
      <AppContextProvider>
        <AuthProvider>
          <VideoPlayer location />
        </AuthProvider>
      </AppContextProvider>);

    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });

  it('Renders from unlogged', () => {
    localStorage.setItem(FAVORITES_LIST, JSON.stringify([]));
    localStorage.setItem(WATCH_LATER_LIST, JSON.stringify([]));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));

    const mockLocation = {
      pathname: '/video',
      hash: '',
      search: '',
      state: {
        from: 'home',
        video: {
          ...model.items[0]
        }
      }
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    render(
      <AppContextProvider>
        <AuthProvider>
          <VideoPlayer location />
        </AuthProvider>
      </AppContextProvider>);

    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });

  it('renders related list', () => {
    render(
      <AppContextProvider>
        <RelatedVideos related={[]} />
      </AppContextProvider>
    );
    expect(screen.getByTitle('relatedList')).toBeInTheDocument();
  });

  it('renders related list', () => {
    const history = createMemoryHistory();
    render(
      <AppContextProvider>
        <Router history={history}>
          <RelatedVideos related={model.items} />
        </Router>
      </AppContextProvider>
    );
    const link = screen.getByTitle('card');
    expect(link).toBeInTheDocument;
    fireEvent.click(link);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/video/');
  });
});

describe("fetchRelatedData", () => {
  describe("if API call is successful", () => {
    it("should return related videos list", async () => {
      axiosMock.get.mockResolvedValueOnce(model);
      const result = await fetchVideos();
      expect(axiosMock.get).toHaveBeenCalledWith(
        '/search', {
        params: {
          maxResults: 25,
          relatedToVideoId: '',
          type: "video"
        }
      }
      );
      expect(result).toEqual(model);
    });
  });
});