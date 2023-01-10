import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export const SongPreview = ({station,song,idx,isEdit,toggleSong,playSong}) => {
    const currSong = useSelector((state) => state.stationModule.currSong)
    const isPlaying = currSong?.songId === song.songId
    return(
        <>
    <TableRow  className="songs-table">
    <TableCell sx={{maxWidth:30}} align="center">{isPlaying ? <MusicNoteIcon sx={{width:25}} color="success" /> : idx}</TableCell>
    <TableCell  onClick={() => playSong(song)} component="th" scope="row">
        <div className="song-info">
            <div className="img">
                <div className="img-hover">
            {isPlaying ? <PauseIcon className="play-icon"/> : <PlayArrowIcon className="play-icon"/> }
                </div>
                <img className="cover" src={song.song_cover} alt="" />
            </div>
            <div className="info">
        <span className={isPlaying ? 'playing' : ''}>{song.song_title}</span>
        <small>{song.song_artist}</small>
            </div>
        </div>
    </TableCell>
    {isEdit && <TableCell>  <Button onClick={() => toggleSong(song)} variant="contained" color= {station?.songs?.find(s => s.songId === song.songId) ? 'error' : 'success'} size="small">
    {station?.songs?.find(s => s.songId === song.songId) ? 'Remove' : 'Add'}
        </Button> </TableCell>}
  </TableRow>
        </>
    )
}