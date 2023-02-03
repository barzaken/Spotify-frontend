import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardPreview } from "./CardPreview"

export const StationList = ({stations}) => {

    if(!stations || !stations.length) return(     
    <div className="station-list">
             { Array.from(new Array(7)).map((item,idx) => 
            <Card key={idx} sx={{ maxWidth: 345 }}>
             <Skeleton variant="rectangular" width={200} height={180} />
             <CardContent>
             <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
            </>
          </CardContent>
             </Card>
             )}
                </div>
    )
    return (
                <div className="station-list">
                    {stations.map(station => <CardPreview type={station.title ? 'album' : 'playlist'}  key={station._id} id={station.title ?station.albumId : station._id} img={station.thumbnailUrl || station?.songs[0]?.song_cover } hasStation={station.name} station={station} title={station.name || station.title} text={station.title ? 'Album' : 'Playlist'} />)}
                </div>
    )
}