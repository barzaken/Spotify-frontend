import {useSelector,useDispatch} from 'react-redux'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import {setStation} from "../store/actions/station.actions.js"

export const HomepageLegend = () => {
    const bgColor = useSelector((state) => state.stationModule.currStation?.avgColor?.rgba)
    const currStation = useSelector((state) => state.stationModule.currStation)
    const stations = useSelector((state) => state.stationModule.stations)
    const dispatch = useDispatch()
    const stationsToShow = stations.slice(0,3)

    function changeBackground(ev) {
        if(!ev.target.dataset.idx || stations[ev.target.dataset.idx]._id === currStation?._id) return
        dispatch(setStation(stations[ev.target.dataset.idx]))
    }
    if(!stations) return <div>Loading</div>
    return(
        <div className="legend" style={{background:`linear-gradient(180deg, ${bgColor}, rgba(18, 18, 18, 1) 102%)`}}>
            <h1>Welcome user</h1>
            <div className="previews">
                {stationsToShow.map((station,idx) => 
                    <div data-idx={idx} key={idx} onMouseOver={changeBackground} className="preview">
                        <img src={station.songs[0].song_cover} alt="" />
                        <p>{station.name}</p>
                        <PlayCircleFilledWhiteIcon className="play-btn" />
                    </div>)}
            </div>

        </div>
    )
}