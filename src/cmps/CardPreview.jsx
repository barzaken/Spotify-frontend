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
export const CardPreview = ({id,img,title,text,type,station,hasStation}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const open = (id) => {
        navigate(`/${type}/${id}`)
    }

    function playStation(ev,station){
      ev.stopPropagation();
      console.log(station);
      dispatch(setPlaylist(station))
      dispatch(setSong(station?.songs[0]))
  }

    return(
         <Card onClick={() => open(id)}> 
        <CardActionArea className="card-preview">
          <CardMedia
            component="img"
            referrerPolicy="no-referrer" 
            image={img || EmptyCover }
            alt=""
            className='card-image'
          />
        {hasStation && <PlayCircleFilledWhiteIcon onClick={(ev) => playStation(ev,station)} className="play-btn" />}
          <CardContent className='card-text'>
            <Typography gutterBottom variant="h6" component="h5">
            {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="h6">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}