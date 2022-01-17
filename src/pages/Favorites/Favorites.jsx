import React, { useRef } from 'react';
import { Grid } from 'semantic-ui-react';

import '../Home/Home.styles.css';
import VideoItem from '../Home/VideoItem';
import styled from 'styled-components';
import { storage } from '../../utils/storage';
import { FAVORITES_LIST } from '../../utils/constants';

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

function Favorites() {
    const sectionRef = useRef(null);
    const listVideos = storage.get(FAVORITES_LIST);

    return (
        <Home className="homepage" ref={sectionRef}>
            <Grid>
                <Grid.Column width={16}>
                    <Heading>Your favorites</Heading>
                    <Scroll>
                        <Grid container doubling columns="4">
                            {listVideos.map((video) => {
                                return <VideoItem key={video.etag} video={video} from={'favorites'} />;
                            })}
                        </Grid>
                    </Scroll>
                </Grid.Column>
            </Grid>
        </Home>
    );
}

export default Favorites;
