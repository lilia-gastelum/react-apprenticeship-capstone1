import React from 'react';
import { Item } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from "../../utils/contexts/AppContext";

function RelatedVideos({ related, from }) {
    const history = useHistory();
    const { appContext } = useAppContext();

    const renderGroup = () => {
        const items = [];
        related.forEach((video, i) => {
            items.push({
                childKey: i,
                image: video?.snippet?.thumbnails?.high?.url,
                header: video?.snippet?.title,
                as: 'a',
                description: '',
                title: 'card',
                className: appContext.themeIsDark ? 'dark' : '',
                meta: video?.snippet?.channelTitle,
                onClick: () => history.push(`/video/${video.id.videoId}`, { video: video, from })
            })
        })
        return items;
    };

    return (
        <Item.Group title={'relatedList'} divided items={renderGroup()} />
    );
}

export default RelatedVideos;