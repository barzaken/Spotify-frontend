import { useSelector,useDispatch } from 'react-redux';
import { ReactSimplifiedPlayer } from 'react-simplified-player';
import { setSong,setPlaylistIdx,toggleIsPlaying } from '../store/actions/station.actions';

export const MusicPlayer = () => {
    const dispatch = useDispatch()
    const song = useSelector((state) => state.stationModule.currSong)
    const playlist = useSelector((state) => state.stationModule.playlist)
     function playNext(song){
        if(playlist.isPlaying){
            const idx = playlist.idx
             dispatch(setPlaylistIdx(idx + 1))
             dispatch(setSong( playlist.station.songs[idx + 1]))
        }
    }
    function handleClick(diff){
        if(playlist.isPlaying){
            let idx = playlist.idx
            if(idx + 1 === playlist.station.songs.length) {
                idx = 0
                diff = 0
            } 
            dispatch(setSong( playlist.station.songs[idx + diff]))
            dispatch(setPlaylistIdx(idx + diff))
        }
    }
    if(!song) return null
    return(
        <div className="music-player">
            <ReactSimplifiedPlayer onBack={() => handleClick(-1)} onForward={() => handleClick(1)}	onAudioEnded={(currSong) => playNext(currSong)} song={song} showQueue={playlist.isPlaying} queue={playlist.isPlaying}  />
        </div>
    )
}