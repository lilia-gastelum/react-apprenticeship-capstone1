import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Pagination } from 'semantic-ui-react';

import { useAuth } from '../../providers/Auth';
import Header from '../Header';
import SideBar from '../SideBar';
import './Home.styles.css';
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
  padding-top: 2%;
  background-color: #fdfdfd;
`;

const Heading = styled.h1`
  font-size: 3rem;
  letter-spacing: -2px;
  text-align: left !important;
`;

const SmallMessage = styled.h5`
  text-align: left !important;
`;

function HomePage() {
  const history = useHistory();
  const sectionRef = useRef(null);
  const { authenticated, logout } = useAuth();
  const [listVideos, setListVideos] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

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

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }

  return (
    <Home className="homepage" ref={sectionRef}>
      <Header />
      <Grid>
        {authenticated && (
          <Grid.Column width={3}>
            <SideBar logout={deAuthenticate} />
          </Grid.Column>
        )}
        <Grid.Column width={authenticated ? 13 : 16}>
          <Heading>Hi, there!</Heading>
          <SmallMessage>Showing you {totalItems} results...</SmallMessage>
          <Scroll>
            <Grid container doubling columns="4">
              {listVideos.map((video) => {
                return <VideoItem key={video.etag} video={video} />;
              })}
            </Grid>
          </Scroll>
          <Pagination defaultActivePage={1} totalPages={10} />
        </Grid.Column>
      </Grid>

      {/* {authenticated ? (
        <>
          <h2>Good to have you back</h2>
          <span>
            <Link to="/" onClick={deAuthenticate}>
              ← logout
            </Link>
            <span className="separator" />
            <Link to="/secret">show me something cool →</Link>
          </span>
        </>
      ) : (
        <Link to="/login">let me in →</Link>
      )} */}
    </Home>
  );
}

export default HomePage;
