import { Button, Paper, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SongPreview } from '../cmps/SongPreview';

export const StationEdit = () => {
    const params = useParams()
    // const { id } = params
    const id  = 1
    
    const songs = [
        { name: 'Die Young', album: 'Album', addedOn: '11.12.2022', time: '2.35', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: 'Die Youdfng', album: 'Albdsfum', addedOn: '11.10.2022', time: '2.25', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },
        { name: '23Die Young', album: 'A32lbum', addedOn: '61.12.2022', time: '2.15', cover: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", },

    ]
    return (
        <section className="station-edit main-layout">
            <div className="station">
                <img src="https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg" />
                { id ? <div className="station-info">
                    <h2>Station Name</h2>
                    <h3> Station By user</h3>
                    <h4>Station date</h4>
                </div> : <div className="station-add">
                <TextField label="Playlist name" variant="filled" color="success" focused />

                </div> }
                <div className="station-actions">
                    {id && <Button variant="outlined" color="error">
                        Delete
                    </Button>}
                    <Button variant="contained" color="success">
                        {id ? 'Save' : 'Add'}
                    </Button>
                </div>
                <div className="songs">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Added on</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="table-song">
                                {songs.map((song, idx) => (
                                    <SongPreview song={song} idx={idx + 1} key={idx} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                </div>
            </div>
        </section >
    )
}