import { useSelector } from "react-redux"
import { StationPreview } from "./StationPreview"

export const StationList = () => {
    const stations = useSelector((state) => state.stationModule.stations)
    if(!stations) return <div>Loading...</div>
    return (
                <div className="station-list">
                    {stations.map(station => <StationPreview key={station?._id} station={station}  />)}
                </div>
    )
}