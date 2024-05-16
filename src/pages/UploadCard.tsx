import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UploadForm from './UploadForm';
import Typography from '@mui/material/Typography';

export default function UploadCard() {

  return (
    <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography
            component="a"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            href='/'
            sx={{ flex: 1 , textDecoration:'none'}}
          >
            圖片上傳
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <UploadForm></UploadForm>
          </Typography>
        </CardContent>
    </Card>
  );
}
