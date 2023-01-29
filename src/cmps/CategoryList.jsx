import { StationList } from "./StationList"
import {HomepageLegend} from "./HomepageLegend"
import { useSelector } from "react-redux"
export const CategoryList = () => {
        const stations = useSelector((state) => state.stationModule.stations)
        const top5 = stations.sort((a,b) => a.likedByUsers.length - b.likedByUsers.length).slice(0,5)
        const mostPlayed = [...stations].sort((a,b) =>b.songs.length - a.songs.length ).slice(0,5)
        const mixes = stations.filter(station => station.name.includes('hits'))
        const randIdx = Math.floor( Math.random() * 4)
        const random = stations.slice(randIdx,randIdx+3)
        const albums = useSelector((state) => state.stationModule.albums)

    return (<>
            <HomepageLegend stations={random}/>
        <div className="category-list">
        <div className="category-container">
                <h1>Most Played</h1>
            <div className="category">
                <StationList stations={mostPlayed} />
            </div>
            </div>
            <div className="category-container">
                <h1>Albums</h1>
            <div className="category">
                <StationList stations={albums} />
            </div>
            </div>
            <div className="category-container">
                <h1>New</h1>
            <div className="category">
                <StationList stations={stations} />
            </div>
            </div>
        </div>
        </>
    )
}