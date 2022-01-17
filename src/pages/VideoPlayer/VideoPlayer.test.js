import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import routeData from 'react-router';
import axios from 'axios';
import RelatedVideos from './RelatedVideos';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppContextProvider } from "../../utils/contexts/AppContext";
jest.mock('axios');

const mockLocation = {
  pathname: '/video',
  hash: '',
  search: '',
  state: {
    video: {
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
    }
  }
}
beforeEach(() => {
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)
});

export const fetchVideos = async () => {
  try {
    return await axios.get(
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
  // it('renders embed', () => {
  //   render(
  //     <AppContextProvider>
  //       <VideoPlayer />
  //     </AppContextProvider>);
  //   expect(screen.getByTitle('Embedded content from youtube.')).toBeInTheDocument();
  // });

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
    expect(history.location.pathname).toBe('/video');
  });
});

describe("fetchRelatedData", () => {
  describe("if API call is successful", () => {
    it("should return related videos list", async () => {
      axios.get.mockResolvedValueOnce(model);
      const result = await fetchVideos();
      expect(axios.get).toHaveBeenCalledWith(
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