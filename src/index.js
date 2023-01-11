import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './assets/styles/global.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MusicPlayer } from './cmps/MusicPlayer';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
const container = document.getElementById('root');
const root = createRoot(container);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <App/>
      <MusicPlayer />
    </ThemeProvider>
    </DndProvider>
  </Provider>
);



