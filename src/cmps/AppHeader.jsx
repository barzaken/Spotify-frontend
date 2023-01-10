import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { setSearchTerm } from "../store/actions/station.actions"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {onLogout } from "../store/actions/user.actions.js"
import {alert } from "../store/actions/station.actions.js"
import Logo from '../assets/imgs/spotifylogo.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const AppHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userModule.user)
  const avgColor = useSelector((state) => state.stationModule.currStation?.avgColor?.rgba)
  const location = useLocation()
  const currColor = (location.pathname.length > 10) ? avgColor : ""
  const [term, setTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
      const search = setTimeout(() => {
          if(!term) return
          dispatch(setSearchTerm(term))
        }, 2000)
      return () => clearTimeout(search)
      }, [term])
   

  function doLogout() {
      dispatch(onLogout())
      dispatch(alert('Logged Out'))
      }

  function userProfile() {
      handleClose()
      navigate('/user')
          }
          
      return (
        <section className="app-header main-layout" style={{background:currColor}}>
    <div onClick={() => navigate('/')} className="mobile-logo">
      <img className='logo-img' src={Logo} alt="" />
      <h1 >Spotify</h1>
      </div>
            <div className="actions">
              <div className="btn-container">
              <button onClick={() => navigate(-1)}> {'<'} </button>  
              </div>
              <div className="btn-container">
              <button onClick={() => navigate(1)}> {'>'} </button>
              </div>

                {location.pathname === '/search' && <input onChange={(event) => setTerm(event.target.value)} type="text" placeholder="Search for music"></input>}
            </div>
            <div className="user-section">
                {user?.fullname ? 
                          <>
                          <div className="user-info">
                          <MoreHorizIcon    
                           aria-controls={openMenu ? 'basic-menu' : undefined}
                           aria-haspopup="true"
                           aria-expanded={openMenu ? 'true' : undefined}
                           onClick={handleClick}/>
                             <img src={user.imgUrl} alt=""/>
                             <h3>{user.fullname}</h3>
                          </div>
                         <Menu
                           anchorEl={anchorEl}
                           open={openMenu}
                           onClose={handleClose}
                         >
                           <MenuItem onClick={() => userProfile()}>Profile</MenuItem>
                           <MenuItem onClick={() => doLogout()}>Logout</MenuItem>
                         </Menu>
                       </>
  
                :
                <>
                <button onClick={() => navigate('/login/signup')} className='signup-btn'>Signup</button>
                <button onClick={() => navigate('/login')} className='login-btn'>Login</button>
                </>}
            </div>
        </section>
    )
}