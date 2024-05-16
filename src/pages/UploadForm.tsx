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
import { ImageList } from '@mui/material';
import ImagePost from './ImagePost';

interface imageBlob{
    date: string;
    title: string;
    image: string;
    username: string;
}

export default function UploadForm() {
    const [formData, setFormData] = React.useState({
        username: '',
        upload: null as FileList | null | string[], 
    });
    const [preview, setPreviewData] = React.useState<imageBlob[]>([]);
    
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
        if(formData.upload && formData.username !== '')
            await APIService._upload(formData.username, formData.upload);
    };

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null){
            return ;
        }
        const file = event.target.files ;
        setPreviewData([]);
        let _files = preview;
        for(let i = 0; i < file.length ; i++){
            _files.push({
                username: "Default",
                date: new Date().toString(),
                title: file[i].name.split(".")[0],
                image: URL.createObjectURL(file[i]),
            });
            console.log(URL.createObjectURL(file[i]));
        }
        setFormData({ ...formData, upload: file });
        setPreviewData(_files);
    };
    
  return (
        <Grid container spacing={2}>
                <Toaster position="top-right" reverseOrder={false}/>

                <ImageList sx={{ width: 500, height: 450, margin: 'auto' }}>
                    {preview.map((post) => (
                        <ImagePost post={post} />
                    ))}
                </ImageList>
                
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
                        onChange={handleUserNameChange}
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
