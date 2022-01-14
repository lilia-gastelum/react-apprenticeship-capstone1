import React from 'react';
import { Item } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

function RelatedVideos({ related }) {
    const history = useHistory();
    const renderGroup = () => {
        const items = [];
        related.forEach((video, i) => {
            items.push({
                childKey: i,
                image: video?.snippet?.thumbnails?.high?.url,
                header: video?.snippet?.title,
                as: 'a',
                description: '',
                meta: video?.snippet?.channelTitle,
                onClick: () => history.push('/video', {video: video})
              })
        })
        return items;
    };

    return (
        <Item.Group divided items={renderGroup()} />
    );
}

export default RelatedVideos;