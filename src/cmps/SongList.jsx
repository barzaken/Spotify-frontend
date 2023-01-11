import { SongPreview } from "./SongPreview"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const SongList = ({station,songs,isEdit,toggleSong,playSong,moveSong,findSong,updateStationSongs}) => {

  return ( 
    <TableContainer >
      <Table className="main-table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>Name</TableCell>
           {isEdit && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody className="table-song">
          {songs?.map((song, idx) => (
            <SongPreview updateStationSongs={updateStationSongs} station={station} findSong={findSong} moveSong={moveSong} isEdit={isEdit} song={song} idx={idx + 1} toggleSong={toggleSong} playSong={playSong} key={idx} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
)

}