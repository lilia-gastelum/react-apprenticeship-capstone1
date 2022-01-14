import React, { useEffect, useRef, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import './Home.styles.css';
import gapi from './api';
import VideoItem from './VideoItem';
import styled from 'styled-components';

const Scroll = styled.div`
  height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 5px;
`;

const Home = styled.section`
  text-align: center;
  padding-top: 4.3%;
  background-color: #fdfdfd;
`;

const Heading = styled.h1`
  font-size: 3rem;
  letter-spacing: -2px;
  text-align: left !important;
`;

// const SmallMessage = styled.h5`
//   text-align: left !important;
// `;

function HomePage({term}) {
  const sectionRef = useRef(null);
  const [listVideos, setListVideos] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // useEffect(() => {
  //   gapi.get('/search', {
  //     params: {
  //       maxResults: 25,
  //       q: term === '' ? 'wizeline' : term,
  //     type: "video" 
  //     }
  //   }).then((response) =>{
  //     setListVideos([
  //       ...response.data.items
  //     ]);
  //     setTotalItems(response.data.pageInfo.totalResults);
  //   })
  // }, [term]);

  useEffect(() => {
    const fetchData = () =>
      fetch(
        'https://raw.githubusercontent.com/wizelineacademy/react-gist/main/capstone-project-1/mocks/youtube-videos-mock.json'
      )
        .then((response) => response.json())
        .then((resJson) => {
          setListVideos([
            ...resJson.items.filter((f) => f.id.kind === 'youtube#video'),
          ]);
          setTotalItems(resJson.pageInfo.totalResults);
        })
        .catch((error) => {
          console.error('error', error);
        });

    fetchData();
  }, []);

  

  return (
    <Home className="homepage" ref={sectionRef}>
      <Grid>
        <Grid.Column width={16}>
          <Heading>Hi, there!</Heading>
          {/* <SmallMessage>Showing you {totalItems} results...</SmallMessage> */}
          <Scroll>
            <Grid container doubling columns="4">
              {listVideos.map((video) => {
                return <VideoItem key={video.etag} video={video} />;
              })}
            </Grid>
          </Scroll>
          {/* <Pagination defaultActivePage={1} totalPages={10} /> */}
        </Grid.Column>
      </Grid>
    </Home>
  );
}

export default HomePage;
