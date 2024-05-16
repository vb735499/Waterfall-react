import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import APIService from '../api/apiservice';
import { ImageList } from '@mui/material';
import ImagePost from './ImagePost';

interface jsonData {
  id: string
  date: string
  title: string
  image: string
  username: string
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {

  const [imgsFile, setImgsFile] = React.useState<jsonData[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const handleGetHelleMsg = async () => {
    const result = await APIService._get();
    setImgsFile(result);
  }
  React.useEffect(() => {
    if (!isLoaded) {
      handleGetHelleMsg();
      setIsLoaded(true);
    }
  }, [imgsFile, isLoaded]);
  if (imgsFile === undefined || imgsFile === null) {
    return (
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="PicShare" />
        <main>
        </main>
      </Container>
      <Footer
        description="Sorry, this website maybe not working correctly, please contact the website manager Email: kevintee825@gmail.com"
      />
    </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="PicShare" />
        <main>
          <Grid container spacing={1} sx={{ mt: 3 }}>
            <ImageList sx={{ width: 500, height: 450, margin: 'auto' }}>
              {imgsFile.map((post) => (
                <ImagePost post={post} />
              ))}
            </ImageList>
          </Grid>
        </main>
      </Container>
      <Footer
        description="Welcome to PicShare, where you can share your pictures as you like. But you still have to pay attention to your personal privacy"
      />
    </ThemeProvider>
  );
}
