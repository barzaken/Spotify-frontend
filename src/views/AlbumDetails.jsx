import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setSong, setPlaylist, toggleIsPlaying, getAlbum } from "../store/actions/station.actions"
import { useEffect, useMemo, useState } from 'react';
import { SongList } from '../cmps/SongList';
import EmptyCover from '../assets/imgs/emptyCover.png';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Divider from '@mui/material/Divider';

export const AlbumDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playlist = useSelector((state) => state.stationModule.playlist)
  const [album, setAlbum] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    async function getAlbumById() {
      const _album = await dispatch(getAlbum(id))
      setAlbum((prev) => _album)
    }
    getAlbumById()
  }, [id])

  function randColor() {
    return '#' + Math.floor(Math.random() * 4000).toString(16);
  }


  async function playSong(song) {
    dispatch(setSong(song))
  }

  function togglePlaylist() {
    if (playlist.isPlaying && playlist.station?._id === album._id) {
      dispatch(toggleIsPlaying(false))
      return
    }
    dispatch(setPlaylist(album))
    dispatch(setSong(album.songs[0]))
  }
  const color = useMemo(() => randColor(), [album])
  if (!album) return <div>Hello</div>

  return (
    <section className="station-details main-layout">
      <div className="station-showcase" style={{ background: `linear-gradient(180deg, ${color}, rgba(18, 18, 18, 1) 96%)` }} >
        <div className="station-header">
          <ArrowBackIosRoundedIcon onClick={() => navigate('/')} className="mobile-back-btn" />
          <div className="img">
            <img className="station-img" src={album.songs[0]?.song_cover || EmptyCover} alt="" />
          </div>
          <div className="info">
            <small>Playlist</small>
            <h1>{album.title}</h1>
          </div>
        </div>
        <Divider />
        <div className="station-controller">
          {playlist.station?._id === album._id && playlist.isPlaying ?
            <PauseCircleFilledIcon onClick={() => togglePlaylist()} className="play-btn" />
            : <PlayCircleFilledWhiteIcon onClick={() => togglePlaylist()} className="play-btn" />
          }
        </div>
      </div>
      <h1 className='song-h1-title'>Songs</h1>
      <div className="songs">
        <SongList playSong={playSong} songs={album.songs} />
      </div>
    </section>
  )
}

