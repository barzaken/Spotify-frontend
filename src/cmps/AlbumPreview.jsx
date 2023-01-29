import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmptyCover from '../assets/imgs/emptyCover.png';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import {setPlaylist,setSong} from "../store/actions/station.actions.js"
import {useDispatch} from 'react-redux'

export const AlbumPreview = ({album}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const openStation = (station) => {
        navigate(`/playlist/${station._id}`)
    }

    function playStation(ev,station){
      ev.stopPropagation();
      dispatch(setPlaylist(station))
      // dispatch(setSong(station?.songs[0]))
  }

    return(
        // <Card sx={{ minWidth: 200, minHeight:255,maxHeight:285,maxWidth:200}} onClick={() => openStation(station)}>
         <Card onClick={() => openStation(album)}> 
        <CardActionArea className="card-preview">
          <CardMedia
            component="img"
            image={album.thumbnailUrl}
            // image={station?.thumbnailUrl || EmptyCover}
            alt=""
            className='card-image'
          />
        <PlayCircleFilledWhiteIcon onClick={(ev) => playStation(ev,album)} className="play-btn" />
          <CardContent className='card-text'>
            <Typography gutterBottom variant="h6" component="h5">
            {album.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="h6">
              {album?.artist}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" component="h6">
              {station?.year }
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    )
}