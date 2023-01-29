
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setSong, setPlaylist, toggleIsPlaying, getArtist } from "../store/actions/station.actions"
import { useEffect, useState } from 'react';
import { SongList } from '../cmps/SongList';

import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Divider from '@mui/material/Divider';
import { CardPreview } from '../cmps/CardPreview';

export const ArtistDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playlist = useSelector((state) => state.stationModule.playlist)
  const [artist, setArtist] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    async function getArtistById() {
      const _artist = await dispatch(getArtist(id))
      setArtist((prev) => _artist)
    }
    getArtistById()
  }, [id])



  async function playSong(song) {
    dispatch(setSong(song))
  }

  function togglePlaylist() {
    if (playlist.isPlaying && playlist.station?._id === artist._id) {
      dispatch(toggleIsPlaying(false))
      return
    }
    dispatch(setPlaylist(artist))
    dispatch(setSong(artist.songs[0]))
  }

  if (!artist?.name?.length) return <div>Hello</div>

  return (
    <section className="artist-details main-layout">
      <div className="artist-showcase" style={{ backgroundImage: `url(${artist.thumbnails?.pop()?.url}) ` }}>
        <div className="artist-header">
          <ArrowBackIosRoundedIcon onClick={() => navigate('/')} className="mobile-back-btn" />
          <div className="info">
            <small>Artist</small>
            <h1>{artist?.name}</h1>
          </div>
        </div>
        <Divider />
        <div className="station-controller">
          {playlist.station?._id === artist._id && playlist.isPlaying ?
            <PauseCircleFilledIcon onClick={() => togglePlaylist()} className="play-btn" />
            : <PlayCircleFilledWhiteIcon onClick={() => togglePlaylist()} className="play-btn" />
          }
        </div>
      </div>
        <h1 className='song-h1-title'>Songs</h1>
      <div className="songs">
        <SongList playSong={playSong} songs={artist.songs} />
      </div>
      <div className="category-list">

        <div className="category-container">
          <h1>Albums</h1>
          <div className="category">
            <div className="station-list">
              {artist.albums.map(album => <CardPreview type="album" key={album.albumId} id={album.albumId} img={album.thumbnailUrl} title={album.title} text={album.year} />)}
            </div>
          </div>
        </div>

        <div className="category-container">
          <h1>Suggested Artists</h1>
          <div className="category">
            <div className="station-list">
          {artist.suggestedArtists.map(artist => <CardPreview type="artist" key={artist.artistId} id={artist.artistId} img={artist.thumbnailUrl} title={artist.name} text={artist.subscribers} />)}
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default ArtistDetails