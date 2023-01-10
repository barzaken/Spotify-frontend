import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import App from './App';
import './assets/styles/global.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactSimplifiedPlayer } from 'react-simplified-player';
import { MusicPlayer } from './cmps/MusicPlayer';
const container = document.getElementById('root');
const root = createRoot(container);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const song = {
  url : "https://connectloaded.xyz/uploads/2022/10/Flo_Rida_-_High_Heels_Ft_Walker_Hayes-CONNECTLOADED.COM.mp3",
  id : "sad",
  song_artist : "Ke$ha",
  song_cover : "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg",
  song_title : "Die young",
}
// const CurrSong = () => {  
//   const playSong = useSelector((state) => console.log(state))
// }
// CurrSong()

root.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <App/>
      <MusicPlayer />
    </ThemeProvider>
  </Provider>
);


