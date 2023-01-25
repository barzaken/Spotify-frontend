
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStations, getStationById, setSearchTerm, setSong, setPlaylist, toggleIsPlaying, updateStation, removeStation, alert, toggleSongFromStation } from "../store/actions/station.actions"
import { useEffect, useState } from 'react';
import EmptyCover from '../assets/imgs/emptyCover.png';
import { SongList } from '../cmps/SongList';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Divider from '@mui/material/Divider';
import update from 'immutability-helper'
import { useCallback } from 'react'
import { useDrop } from 'react-dnd'
import CloseIcon from '@mui/icons-material/Close';

export const StationDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const playlist = useSelector((state) => state.stationModule.playlist)
  const queryItems = useSelector((state) => state.stationModule.query)
  let currStation = useSelector((state) => state.stationModule.currStation)
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.userModule.user)
  const isEdit = user?._id === currStation?.createdBy?._id
  const [anchorEl, setAnchorEl] = useState(currStation?.songs);
  const openMenu = Boolean(anchorEl);


  const [songs, setSongs] = useState([])

  const findSong = useCallback(
    (id) => {
      const song = songs.filter((s) => s?._id === id)[0]
      return {
        song,
        index: songs.indexOf(song),
      }
    },
    [songs],
  )

  const moveSong = useCallback(
    async (id, atIndex) => {
      const { song, index } = findSong(id)
      await setSongs(
        update(songs, {
          $splice: [
            [index, 1],
            [atIndex, 0, song],
          ],
        }),
      )
    },
    [findSong, songs, setSongs],
  )

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function getStation() {
      if (!currStation) {
        await dispatch(loadStations())
      }
      await dispatch(getStationById(id))
    }
    getStation()
  }, [id]);

  useEffect(() => {
    if (currStation?.songs) {
      setSongs(currStation.songs)
    }
  }, [currStation]);


  useEffect(() => {
    const search = setTimeout(() => {
      if (!term) return
      dispatch(setSearchTerm(term))
    }, 2000)
    return () => clearTimeout(search)
  }, [term])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    currStation = { ...currStation, [field]: value }
  }

  async function toggleSong(song) {
    dispatch(toggleSongFromStation(currStation, song))
  }

  async function playSong(song) {
    dispatch(setSong(song))
  }

  function togglePlaylist() {
    if (playlist.isPlaying && playlist.station?._id === id) {
      dispatch(toggleIsPlaying(false))
      return
    }
    dispatch(setPlaylist(currStation))
    dispatch(setSong(currStation.songs[0]))
  }

  async function saveStation() {
    await dispatch(updateStation(currStation))
    setOpen(false)
    dispatch(alert(`Playlist ${currStation.name} saved `))
  }

  async function updateStationSongs() {
    await dispatch(updateStation({ ...currStation, songs: songs }))
  }

  async function deleteStation() {
    await dispatch(removeStation(currStation._id))
    dispatch(alert(`Playlist ${currStation.name} Removed `))
    navigate('/')
  }



  if (!currStation) return (<h1>Loading..</h1>)

  return (
    <section className="station-details main-layout">
      <div className="station-showcase" style={{ background: `linear-gradient(180deg, ${currStation?.avgColor?.rgba}, rgba(18, 18, 18, 1) 96%)` }}>
        <div className="station-header">
          <ArrowBackIosRoundedIcon onClick={() => navigate('/')} className="mobile-back-btn" />
          <div className="img">
            <img className="station-img" src={currStation.songs[0]?.song_cover || EmptyCover} alt="" />
          </div>
          <div className="info">
            <small>Playlist</small>
            <h1 onClick={() => setOpen(true)}>{currStation.name}</h1>
            {currStation.tags?.map(tag => <small key={tag}>{tag},</small>)}
          </div>
        </div>
        <Divider />
        <div className="station-controller">
          {playlist.station?._id === id && playlist.isPlaying ?
            <PauseCircleFilledIcon onClick={() => togglePlaylist()} className="play-btn" />
            : <PlayCircleFilledWhiteIcon onClick={() => togglePlaylist()} className="play-btn" />
          }
          <FavoriteBorderIcon sx={{ color: '#b3b3b3', fontSize: 40 }} />
          {isEdit && <>
            <MoreHorizIcon
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              className="station-option-menu"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClick} />
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={() => deleteStation()}>Delete Playlist</MenuItem>
            </Menu>
          </>}
          {isEdit && <input type="search" onChange={(event) => setTerm(event.target.value)}
            placeholder="Search for music" className="station-input" />}
        </div>
      </div>
      <div className="songs">
        <SongList isDragMode={isEdit} updateStationSongs={updateStationSongs} findSong={findSong} moveSong={moveSong} station={currStation} toggleSong={toggleSong} playSong={playSong} isEdit={isEdit} songs={term ? queryItems : songs} />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isEdit ?
          <Box className="modal">
            <div className="modal-header">
              <h1>Edit details</h1>
              <CloseIcon onClick={() => setOpen(false)} />
            </div>
            <div className="edit-modal">
              <img src={currStation.songs[0]?.song_cover || EmptyCover} alt="" />
              <div className="edit-info">
                <TextField onChange={(ev) => handleChange(ev)} color="success" size="small" id="outlined-basic" name="name" label="Name" variant="outlined" placeholder={currStation.name} />
                <TextField onChange={(ev) => handleChange(ev)} color="success" multiline={true} rows="4.1" className="text-area" id="outlined-basic" value={currStation.description} name="description" label="Description" variant="outlined" />
              </div>
            </div>
            <button className="save-btn" onClick={() => saveStation()} >Save</button>
          </Box>
          : <Box className="modal">
            <div className="modal-header">
              <h1>This is not your playlist</h1>
              <CloseIcon onClick={() => setOpen(false)} />
            </div>
          </Box>}
      </Modal>
    </section>
  )
}

