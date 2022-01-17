import React, { useEffect, useRef, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import './Home.styles.css';
import gapi from './api';
import VideoItem from './VideoItem';
import styled from 'styled-components';
import { useAppContext } from "../../utils/contexts/AppContext";

const Scroll = styled.div`
  height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Home = styled.section`
  text-align: center;
  padding-top: 4.3%;
  padding-bottom: 4%;
`;

const Heading = styled.h1`
  font-size: 3rem;
  letter-spacing: -2px;
`;

function HomePage() {
  const sectionRef = useRef(null);
  const [listVideos, setListVideos] = useState([]);
  const { appContext } = useAppContext();

  // useEffect(() => {
  //   gapi.get('/search', {
  //     params: {
  //       maxResults: 25,
  //       q: appContext.term,
  //     type: "video" 
  //     }
  //   }).then((response) =>{
  //     setListVideos([
  //       ...response.data.items
  //     ]);
  //   }).catch((error) => {
  //             console.error('error', error);
  //           });
  // }, [appContext.term]);

  useEffect(() => {
    const fetchData = () =>
      fetch(
        'https://raw.githubusercontent.com/wizelineacademy/react-gist/main/capstone-project-1/mocks/youtube-videos-mock.json'
      )
        .then((response) => response.json())
        .then((resJson) => {
          setListVideos([
            ...resJson.items.filter((f) => f.id.kind === 'youtube#video' && f.snippet && f.snippet.title.toUpperCase().includes(appContext.term.toUpperCase())),
          ]);
        })
        .catch((error) => {
          console.error('error', error);
        });

    fetchData();
  }, [appContext.term]);

  return (
    <Home className="homepage" ref={sectionRef}>
      <Grid>
        <Grid.Column width={16}>
          <Heading>Hi, there!</Heading>
          <Scroll>
            <Grid container doubling columns="4">
              {listVideos.map((video) => {
                return <VideoItem key={video.etag} video={video} from={'home'} />;
              })}
            </Grid>
          </Scroll>
        </Grid.Column>
      </Grid>
    </Home>
  );
}

export default HomePage;
