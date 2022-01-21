import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';

function VideoItem(props) {
    const {video} = props;
    return (
        <Grid.Column>
            <Card href='#' className="selectable">
                <Image alt={'thumbnail'} src={video?.snippet?.thumbnails?.high?.url} />
                <Card.Content>
                    <Card.Header>{video?.snippet?.title}</Card.Header>
                    <Card.Meta>{video?.snippet?.channelTitle}</Card.Meta>
                    <Card.Description>
                        {video?.snippet.description}
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

export default VideoItem;
