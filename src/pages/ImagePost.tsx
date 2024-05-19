import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';

interface ImagePostProps {
    post: {
        date: string;
        title: string;
        image: string;
        username: string;
    }
}

export default function ImagePost(props: ImagePostProps) {
    const { post } = props;
    const title = post.title.split('/').pop();
    const handleDownload = () => {
        fetch(post.image, { 
            method: 'GET',
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
            })
        })
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          var url = window.URL.createObjectURL(blob); // create url from blob
          var fileLink = document.createElement('a'); // create link for file
          fileLink.href = url;
          console.log(blob.type.split('/')[1]);
          fileLink.download = moment().format('YYYY-MM-DD_HH-mm-ss') + '.' + blob.type.split('/')[1]; // download filename
          document.body.appendChild(fileLink); // append file link to download
          fileLink.click();
          fileLink.remove(); // remove file link after click
        })
        .catch((error:any) => {
          console.log(error)
        }) 
      };

    return (
        <ImageListItem key={post.image}>
            <img
                srcSet={`${post.image}`}
                alt={title}
                loading="lazy"
            />
            <ImageListItemBar
                title={title}
                subtitle={post.username}
                actionIcon={
                    <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${title}`}
                    onClick={handleDownload}
                    >
                    <DownloadIcon />
                    </IconButton>
                }
            />
        </ImageListItem>
    );
}