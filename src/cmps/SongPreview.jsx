import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useDrag, useDrop } from 'react-dnd'
export const SongPreview = ({station,song,idx,isEdit,toggleSong,playSong,findSong,moveSong,updateStationSongs,isDragMode}) => {
    const currSong = useSelector((state) => state.stationModule.currSong)
    const isPlaying = currSong?.songId === song.songId
    const songType = {
        song:'song'
      }
    const originalIndex = isDragMode ? findSong(song._id).index : ''

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: songType.song,
        item: { id:song._id, originalIndex },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
          const { id: droppedId, originalIndex } = item
          const didDrop = monitor.didDrop()
          updateStationSongs()  
          if (!didDrop) {
            moveSong(droppedId, originalIndex)
          }
        },
      }),
      [song._id, originalIndex, moveSong],
    )
    const [, drop] = useDrop(
      () => ({
        accept: songType.song,
        hover({ id: draggedId }) {
          if (draggedId !== song._id) {
            const { index: overIndex } = findSong(song._id)
            moveSong(draggedId, overIndex)
          }
        },
      }),
      [findSong, moveSong],
    )

    return(
        <>
    <TableRow className="songs-table" ref={(node) => isDragMode && drag(drop(node))}>
    {idx && <TableCell sx={{maxWidth:30}} align="center">{isPlaying ? <MusicNoteIcon sx={{maxWidth:20}} color="success" /> : idx}</TableCell>}
    <TableCell  onClick={() => playSong(song)} component="th" scope="row">
        <div className="song-info">
            <div className="img">
                <div className="img-hover">
            {isPlaying ? <PauseIcon className="play-icon"/> : <PlayArrowIcon className="play-icon"/> }
                </div>
                <img className="cover" src={song?.song_cover} referrerPolicy="no-referrer"  alt="" />
            </div>
            <div className="info">
        <span className={isPlaying ? 'playing' : ''}>{song.song_title}</span>
        <small>{ song.song_artist }</small>
            </div>
        </div>
    </TableCell>
    <TableCell>{song.song_album}</TableCell>
    <TableCell>{song.duration.label}</TableCell>
    {isEdit && <TableCell>  <button onClick={() => toggleSong(song)} className= {station?.songs?.find(s => s.songId === song.songId) ? 'remove' : 'add'} >
    {station?.songs?.find(s => s.songId === song.songId) ? 'Remove' : 'Add'}
        </button> </TableCell>}

  </TableRow>
        </>
    )
}