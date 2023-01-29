import {useSelector,useDispatch} from 'react-redux'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import {setStation,setPlaylist,setSong} from "../store/actions/station.actions.js"
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

export const HomepageLegend = ( {stations}) => {
    const navigate = useNavigate()
    const bgColor = useSelector((state) => state.stationModule.currStation?.avgColor?.rgba)
    const currStation = useSelector((state) => state.stationModule.currStation)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userModule.user)
    function changeBackground(ev) {
        if(!ev.target.dataset.idx || stations[ev.target.dataset.idx]._id === currStation?._id) return
        dispatch(setStation(stations[ev.target.dataset.idx]))
    }
    function playStation(ev,station){
        ev.stopPropagation();
        dispatch(setPlaylist(station))
        dispatch(setSong(station.songs[0]))
    }
    if(!stations) return <div>
{Array.from(new Array(3)).map((item,idx) => {
<Skeleton key={idx} variant="rectangular" width={215} height={60} />
})}
    </div>
    return(
        <div className="legend" style={{background:`linear-gradient(180deg, ${bgColor}, rgba(18, 18, 18, 1) 101%)`}}>
            <h1>Welcome {user ? user.fullname : 'Guest'}</h1>
            <div className="previews">
                {stations.length ? stations.map((station,idx) => 
                    <div data-idx={idx} key={idx} onMouseOver={changeBackground} onClick={() =>  navigate(`/playlist/${station._id}`)} className="preview">
                        <img src={station.songs[0]?.song_cover} alt="" />
                        <p>{station.name}</p>
                        <PlayCircleFilledWhiteIcon onClick={(ev) => playStation(ev,station)} className="play-btn" />
                    </div>) : <>
                    {Array.from(new Array(3)).map((item,idx) => 
                    <div className="preview" key={idx}>
                       <Skeleton variant="rectangular" width={'100%'} height={70} />
                    </div>
)}
                        </>}
            </div>

        </div>
    )
}