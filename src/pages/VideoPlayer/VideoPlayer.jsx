import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Embed, Grid, Icon, Popup } from 'semantic-ui-react';
import RelatedVideos from './RelatedVideos';
import styled from 'styled-components';
import './VideoPlayer.styles.css'
import gapi from '../Home/api';
import { useAuth } from '../../providers/Auth';
import { storage } from '../../utils/storage';
import { FAVORITES_LIST, WATCH_LATER_LIST } from '../../utils/constants';
import { relatedResult } from './mock';
import { useHistory } from 'react-router-dom';
import NotFound from '../../components/NotFound';

const Scroll = styled.div`
  height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 5px;ß
`;

const Player = styled(Embed)({
    height: '500 !important',
});

const Container = styled(Grid)({
    margin: '4% 2% 0% 2% !important'
});
function VideoPlayer() {
    const location = useLocation();
    const history = useHistory();

    const { video, from } = location.state ? location.state : {};

    const { authenticated } = useAuth();
    const currentFavList = storage.get(FAVORITES_LIST);
    const currentLatList = storage.get(WATCH_LATER_LIST);
    const [isFavorite, setIsFavorite] = useState(video ? currentFavList.find(f => f.id.videoId === video.id.videoId) : [])
    const [isWatchLater, setIsWatchLater] = useState(video ? currentLatList.find(f => f.id.videoId === video.id.videoId) : [])
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (video) {
            console.log('cambia video')
            console.log(video.id.videoId)
            if (from === 'home') {
                setRelated(relatedResult);
                // gapi.get('/search', {
                //     params: {
                //       maxResults: 15,
                //       relatedToVideoId: video.id.videoId,
                //       type: "video"
                //     }
                //   }).then((response) =>{
                //     setRelated([...response.data.items]);
                //   })
            }

            if (from === 'favorites') {
                const favList = storage.get(FAVORITES_LIST);
                console.log([...favList.filter(f => f.id.videoId !== video.id.videoId)])
                setRelated([...favList.filter(f => f.id.videoId !== video.id.videoId)])
            }

            if (from === 'watchLater') {
                const latList = storage.get(WATCH_LATER_LIST);
                console.log([...latList.filter(f => f.id.videoId !== video.id.videoId)])
                setRelated([...latList.filter(f => f.id.videoId !== video.id.videoId)])
            }
        }

    }, [video, from]);

    useEffect(() => {
        if (video) {
            const favList = storage.get(FAVORITES_LIST);
            const latList = storage.get(WATCH_LATER_LIST);
            if (favList.find(f => f.id.videoId === video.id.videoId))
                setIsFavorite(true)
            else setIsFavorite(false);
            if (latList.find(f => f.id.videoId === video.id.videoId))
                setIsWatchLater(true)
            else setIsWatchLater(false);
        }

    }, [video]);

    if (location.state === undefined) {
        history.push('/notFound')
        return (
            <NotFound />
        )
    }
    const addToFavorites = () => {
        const favList = storage.get(FAVORITES_LIST);
        storage.set(FAVORITES_LIST, [...favList, video]);
        setIsFavorite(true);
    };

    const removeFromFavorites = () => {
        const favList = storage.get(FAVORITES_LIST);
        storage.set(FAVORITES_LIST, [...favList.filter(f => f.id.videoId !== video.id.videoId)]);
        setIsFavorite(false);
    };

    const addToWatchLater = () => {
        const latList = storage.get(WATCH_LATER_LIST);
        storage.set(WATCH_LATER_LIST, [...latList, video]);
        setIsWatchLater(true);
    };

    const removeFromWatchLater = () => {
        const latList = storage.get(WATCH_LATER_LIST);
        storage.set(WATCH_LATER_LIST, [...latList.filter(f => f.id.videoId !== video.id.videoId)]);
        setIsWatchLater(false);
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
                            {authenticated && (
                                <>
                                    <Grid.Column width={1}>
                                        <Popup
                                            content={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                            trigger={
                                                <Button
                                                    basic={!isFavorite}
                                                    color={'purple'}
                                                    onClick={isFavorite ? removeFromFavorites : addToFavorites}
                                                >
                                                    <Button.Content><Icon name='heart' /></Button.Content>
                                                </Button>
                                            }
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <Popup
                                            content={isWatchLater ? 'Remove from watch later' : 'Watch later'}
                                            trigger={
                                                <Button
                                                    basic={!isWatchLater}
                                                    color={'orange'}
                                                    onClick={isWatchLater ? removeFromWatchLater : addToWatchLater}
                                                >
                                                    <Button.Content><Icon name='clock' /></Button.Content>
                                                </Button>
                                            }
                                        />
                                    </Grid.Column>
                                </>
                            )}

                        </Grid.Row>
                    </Grid>
                    <h3>{video?.snippet?.channelTitle}</h3>
                    <p>{video?.snippet?.description}</p>
                </Grid.Column>
                <Grid.Column width={4}>
                    <h3>This might interest you:</h3>
                    <Scroll>
                        {related.length > 0 && (
                            <RelatedVideos related={related} from={from} />
                        )}
                    </Scroll>
                </Grid.Column>
            </Grid.Row>
        </Container>
    );
}

export default VideoPlayer;
