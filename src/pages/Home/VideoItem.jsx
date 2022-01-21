import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from "../../utils/contexts/AppContext";
import './Home.styles.css';

const Thumbnail = styled(Card)((props) => ({
    backgroundColor: `${props.themeisdark ? '#584D5F ' : '#fdfdfd'} !important`,
    shadowBox: `${props.themeisdark ? '#0 1px 3px 0 #red ' : '#0 1px 3px 0 #d4d4d5'} !important`,
}));

function VideoItem(props) {
    const { video, from } = props;
    const { appContext } = useAppContext();
    const history = useHistory();

    return (
        <Grid.Column>
            <Thumbnail 
            $themeisdark={appContext.themeIsDark} 
            className="selectable" 
            onClick={() => { history.push(`/video/${video?.id?.videoId}`, { video: video, from }) }}
            >
                <Image alt={'thumbnail'} src={video?.snippet?.thumbnails?.high?.url} />
                <Card.Content className={appContext.themeIsDark ? 'dark' : ''}>
                    <Card.Header>{video?.snippet?.title}</Card.Header>
                    <Card.Meta>{video?.snippet?.channelTitle}</Card.Meta>
                    <Card.Description>
                        {video?.snippet.description}
                    </Card.Description>
                </Card.Content>
            </Thumbnail>
        </Grid.Column>
    );
}

export default VideoItem;
