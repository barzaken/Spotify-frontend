import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setStation } from '../store/actions/station.actions';
import { useNavigate } from 'react-router-dom';
import EmptyCover from '../assets/imgs/emptyCover.png';

export const StationPreview = ({station}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const openStation = (station) => {
        navigate(`/playlist/${station._id}`)
    }

    return(
        <Card sx={{ maxWidth: 200, minHeight:250,minWidth:150 }} onClick={() => openStation(station)}>
        <CardActionArea className="card-preview">
          <CardMedia
            component="img"
            image={station.songs[0]?.song_cover || EmptyCover}
            alt="green iguana"
            className='card-image'
          />
          <CardContent className='card-text'>
            <Typography gutterBottom variant="h6" component="h5">
            {station?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="h6">
              {station?.tags}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}