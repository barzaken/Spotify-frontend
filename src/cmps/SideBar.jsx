import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/imgs/spotifylogo.png';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch,useSelector } from 'react-redux';
import { addStation,alert } from '../store/actions/station.actions';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EmptyCover from '../assets/imgs/emptyCover.png';

export const SideBar = () => {  
const navigate = useNavigate()
const dispatch = useDispatch()
const [isOpen,setIsOpen] = useState(false)
const toggleSide = () => {
  setIsOpen((last => !last))
}
const [open, setOpen] = useState(false);
const playlists = useSelector((state) => state.stationModule.stations)
const user = useSelector((state) => state.userModule.user)
const myPlaylists = playlists.filter(playlist => playlist?.createdBy?._id === user?._id)
const handleClick = () => {
  setOpen(!open);
};

async function createStation(){
  const station = await dispatch(addStation())
  dispatch(alert('New Playlist Created'))
  navigate(`/playlist/${station._id}`)
}


  return (
    <div className={`side-bar ${isOpen ? 'open' : ''}`}  >
      <div className="logo" onClick={() => navigate('/')}>
      <button onClick={() => toggleSide()} className="hamburger">☰</button>
      <img className='logo-img' src={Logo} alt="" />
      <h1 >Musicfy</h1>
      </div>
      <Box className='nav-box' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                setIsOpen(false)
                navigate('/')
              } }>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() =>{
                setIsOpen(false)
                navigate('/search')
              } }>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() =>createStation()  }>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Create Playlist" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Liked songs" />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleClick}>
        <ListItemIcon>
              <QueueMusicIcon />
        </ListItemIcon>
        <ListItemText primary="My Playlists" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {myPlaylists.map(playlist => 
          <ListItemButton key={playlist._id} onClick={() => navigate(`playlist/${playlist._id}`)}>
          <ListItemAvatar>
                <Avatar
                  alt={''}
                  src={playlist.songs[0]?.song_cover || EmptyCover}
                />
              </ListItemAvatar>
            <ListItemText primary={playlist.name} />
          </ListItemButton>
            )}
        </List>
      </Collapse>

          </List>
        </nav>
      </Box>
    </div>
  )
}