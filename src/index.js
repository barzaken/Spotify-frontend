import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './assets/styles/global.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MusicPlayer } from './cmps/MusicPlayer';
const container = document.getElementById('root');
const root = createRoot(container);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <App/>
      <MusicPlayer />
    </ThemeProvider>
  </Provider>
);


