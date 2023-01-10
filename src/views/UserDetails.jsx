import { StationPreview } from "../cmps/StationPreview"
import {useSelector,useDispatch} from "react-redux"
import {useEffect} from "react"
import {loadStations} from "../store/actions/station.actions.js"
import {onLogout } from "../store/actions/user.actions.js"
import {LoginSignup} from "../views/LoginSignup"
import { useNavigate } from "react-router-dom";


export const UserDetails = () => {
const user = useSelector(state => state.userModule.user)
const stations = useSelector(state => state.stationModule.stations)
const dispatch = useDispatch()
const navigate = useNavigate()
let userStations = stations.filter(station => station?.createdBy?._id === user?._id)

useEffect(() => {
  if(!stations.length){
      dispatch(loadStations())
  }
}, [])

async function logOut() {
    await dispatch(onLogout())
    navigate('/')
}

if(!user) return <LoginSignup />
return (
    <section className="user-details">
        <div className="user-card">

       <div className="user-info">
<img src={user.imgUrl} alt="" />
<h1>{user.fullname}</h1>
    <button onClick={() => logOut()}>Logout</button>
</div>
<h1>Your Playlists</h1>
<div className="station-list">
                    {userStations.length  && userStations.map(station => <StationPreview key={station._id} station={station}  />)}
                </div>
       </div>
    </section>
)

}