import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import BrowserRouter from './router';
import logo from './imgs/logo.svg';
import './css/App.css';

const App: FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider  router={BrowserRouter}/>
    </ThemeProvider>
  );
}


export default App;
