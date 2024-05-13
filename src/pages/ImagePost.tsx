import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

interface ImagePostProps {
    post: {
        date: string;
        title: string;
        image: string;
        username: string;
    };
}

export default function ImagePost(props: ImagePostProps) {
    const { post } = props;

    return (
        <ImageListItem key={post.image}>
            <img
                srcSet={`${post.image}`}
                alt={post.title}
                loading="lazy"
            />
            <ImageListItemBar
                title={post.title}
                subtitle={post.username}
                actionIcon={
                    <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${post.title}`}
                    >
                    <InfoIcon />
                    </IconButton>
                }
            />
        </ImageListItem>
    );
}