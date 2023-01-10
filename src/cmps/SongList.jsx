import { SongPreview } from "./SongPreview"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const SongList = ({station,songs,isEdit,toggleSong,playSong}) => {return ( 
    <Paper>
    <TableContainer >
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>Name</TableCell>
           {isEdit && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody className="table-song">
          {songs?.map((song, idx) => (
            <SongPreview station={station} isEdit={isEdit} song={song} idx={idx + 1} toggleSong={toggleSong} playSong={playSong} key={idx} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)

}