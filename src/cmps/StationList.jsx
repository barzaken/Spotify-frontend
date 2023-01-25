import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { StationPreview } from "./StationPreview"

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
                    {stations.map(station => <StationPreview key={station._id} station={station}  />)}
                </div>
    )
}