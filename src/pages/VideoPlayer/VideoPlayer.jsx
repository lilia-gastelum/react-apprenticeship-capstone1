import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Embed, Grid, Icon } from 'semantic-ui-react';
import RelatedVideos from './RelatedVideos';
import styled from 'styled-components';
import gapi from '../Home/api';

const Scroll = styled.div`
  height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 5px;
`;

const Player = styled(Embed)({
    height: '500 !important',
});

const Container = styled(Grid)({
    margin: '4% 2% 0% 2% !important'
});
function VideoPlayer() {
    const location = useLocation();
    const [related, setRelated] = useState([]);
    const video = location.state.video;

    useEffect(() => {
        gapi.get('/search', {
          params: {
            maxResults: 15,
            relatedToVideoId: video.id.videoId,
            type: "video"
          }
        }).then((response) =>{
          setRelated([...response.data.items]);
        })
      }, [video]);

    return (
        <Container>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Player
                        active={true}
                        id={video.id.videoId}
                        placeholder='omd.png'
                        source='youtube'
                    />
                    <br />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <h1>{video?.snippet?.title}</h1>
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <Button animated='fade' basic color={'purple'}>
                                <Button.Content hidden><Icon name='heart' /></Button.Content>
                                <Button.Content visible>
                                    Add to favorites
                                </Button.Content>
                            </Button>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Button animated='fade' basic color={'orange'}>
                                <Button.Content hidden><Icon name='clock' /></Button.Content>
                                <Button.Content visible>
                                    Watch later
                                </Button.Content>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <h3>{video?.snippet?.channelTitle}</h3>
                    <p>{video?.snippet?.description}</p>
                </Grid.Column>
                <Grid.Column width={4}>
                    <h3>This might interest you:</h3>
                    <Scroll>
                        {related.length > 0 && (
                            <RelatedVideos related={related} />
                        )}
                    </Scroll>
                </Grid.Column>
            </Grid.Row>
        </Container>
    );
}

export default VideoPlayer;
