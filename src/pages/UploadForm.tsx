import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import APIService from '../api/apiservice';
import { Toaster } from 'react-hot-toast';
// import { formatDiagnostic } from 'typescript';

export default function UploadForm() {
    const [formData, setFormData] = React.useState({
        username: '',
        upload: null as FileList | null, 
    });
    
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleSubmit = async () => {
        console.log('Form submitted:', formData);
        if(formData.upload && formData.username !== '')
            await APIService._upload(formData.username, formData.upload);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null){
            return ;
        }
        const file = event.target.files ;
        setFormData({ ...formData, upload: file });
    };
    
  return (
        <Grid container spacing={2}>
                <Toaster position="top-right" reverseOrder={false}/>
                <Grid xs={8}> 
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        請選擇上傳的檔案(可拖拉檔案至此，支援jpg,jpeg,png,gif格式):
                        <VisuallyHiddenInput type="file" multiple={true} name='upload[]' accept='image/*' draggable={true} onChange={handleFileChange}/>
                    </Button>
                </Grid>
                <Grid spacing={4}>
                    <TextField
                        type="text"
                        name="username"
                        label="Username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Stack spacing={2} direction="row">
                    <Button 
                        variant="text" 
                        endIcon={<SendIcon />} 
                        onClick={handleSubmit}
                    >
                        送出
                    </Button>
                </Stack>
        </Grid>
  );
}
