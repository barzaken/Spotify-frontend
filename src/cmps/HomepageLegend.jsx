import {useSelector} from 'react-redux'
import {useState} from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

export const HomepageLegend = () => {
    const currStation = useSelector((state) => state.stationModule.currStation)
    // let bgColor = currStation?.avgColor.rgba
    const [bgColor,setBgColor] = useState(currStation?.avgColor.rgba)
    function changeBackground(ev) {
        // bgColor = stations[ev.target.dataset.idx]?.avgColor.rgba
        // bgColor = stations[1]?.avgColor.rgba
        setBgColor(stations[1]?.avgColor.rgba)
        console.log(bgColor)
    }
    const stations = useSelector((state) => state.stationModule.stations)
    let stationsToShow = stations.slice(0,3)
    if(!currStation) return <div>Loading</div>
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