import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UploadForm from './UploadForm';
import Typography from '@mui/material/Typography';

export default function UploadCard() {

  return (
    <Card sx={{ maxWidth: 600 }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            UploadForm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <UploadForm></UploadForm>
            </Typography>
        </CardContent>
    </Card>
  );
}
