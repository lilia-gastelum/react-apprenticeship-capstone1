import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Embed, Grid, Icon, Popup } from 'semantic-ui-react';
import RelatedVideos from './RelatedVideos';
import styled from 'styled-components';
import './VideoPlayer.styles.css'
import gapi from '../Home/api';
import { useAppContext } from "../../utils/contexts/AppContext";

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
    const { appContext, setAppContext } = useAppContext();
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

    const addToFavorites = () => {
        setAppContext({ ...appContext, favorites: [...appContext.favorites, video] });
    };

    const removeFromFavorites = () => {
        const list = [...appContext.favorites.filter(f => f.id.videoId !== video.id.videoId)];
        setAppContext({ ...appContext, favorites: list });
    };

    const addToWatchLater = () => {
        setAppContext({ ...appContext, watchLater: [...appContext.watchLater, video] });
    };

    const removeFromWatchLater = () => {
        const list = [...appContext.watchLater.filter(f => f.id.videoId !== video.id.videoId)];
        setAppContext({ ...appContext, watchLater: list });
    };

    return (
        <Container>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Player
                        active={true}
                        id={video.id.videoId}
                        source='youtube'
                    />
                    <br />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={13}>
                                <h1>{video?.snippet?.title}</h1>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <Popup
                                    content={appContext.favorites.find(f => f.id.videoId === video.id.videoId) ? 'Remove from favorites' : 'Add to favorites'}
                                    trigger={
                                        <Button
                                            basic={!appContext.favorites.find(f => f.id.videoId === video.id.videoId)}
                                            color={'purple'}
                                            onClick={appContext.favorites.find(f => f.id.videoId === video.id.videoId) ? removeFromFavorites : addToFavorites}
                                        >
                                            <Button.Content><Icon name='heart' /></Button.Content>
                                        </Button>
                                    }
                                />
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <Popup
                                    content={appContext.watchLater.find(f => f.id.videoId === video.id.videoId) ? 'Remove from watch later' : 'Watch later'}
                                    trigger={
                                        <Button
                                            basic={!appContext.watchLater.find(f => f.id.videoId === video.id.videoId)}
                                            color={'orange'}
                                            onClick={appContext.watchLater.find(f => f.id.videoId === video.id.videoId) ? removeFromWatchLater : addToWatchLater}
                                        >
                                            <Button.Content><Icon name='clock' /></Button.Content>
                                        </Button>
                                    }
                                />

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
