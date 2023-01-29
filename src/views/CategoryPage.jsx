import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSong } from '../store/actions/station.actions';
import { SongPreview } from '../cmps/SongPreview';
import { CardPreview } from '../cmps/CardPreview';
import { useState, useEffect } from "react";
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { setSearchTerm } from "../store/actions/station.actions"


export const CategoryPage = () => {
    const navigate = useNavigate()
    const [term, setTerm] = useState("");
    const dispatch = useDispatch()
    const searchTerm = useSelector((state) => state.stationModule.searchTerm)
    const queryItems = useSelector((state) => state.stationModule.query)
    const categories = useSelector((state) => state.stationModule.albums)
    
    function randColor() {
        return '#' + Math.floor(Math.random() * 4000).toString(16);
    }

    useEffect(() => {
        const search = setTimeout(() => {
            if (!term) return
            dispatch(setSearchTerm(term))
        }, 2000)
        return () => clearTimeout(search)
    }, [term])


    async function playSong(song) {
        dispatch(setSong(song))
    }
    if (!categories) return <div>hello</div>
    return (
        <section className="category-page main-layout">
            <h1 className="mobile-input-title">Search</h1>
            <input type="search" onChange={(event) => setTerm(event.target.value)} className='mobile-input' placeholder="Search for music" />
            {(searchTerm && (queryItems.songs.length || queryItems.albums.length)) ? <div className="results">
                <div className="header">
                    <div className="top-result">
                        <h2>Top result</h2>
                        <div className="container" onClick={() => queryItems.artist[0] && navigate(`/artist/${queryItems.artist[0]?.artistId}`.replace('/search'), { replace: true })}  >
                            <img src={queryItems.artist[0]?.thumbnails[0].url || queryItems.songs[0]?.song_cover} referrerPolicy="no-referrer" alt="" />
                            <h1>{queryItems.artist[0]?.name || queryItems.songs[0]?.song_title}</h1>
                            <div className="type">
                                <span>{queryItems.artist[0] ? 'Artist' : 'Song'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="songs">
                        <h2>Songs</h2>
                        <TableContainer>
                            <Table className="table">
                                <TableBody className="table">
                                    {queryItems?.songs?.map(song => <SongPreview key={song._id} song={song} playSong={playSong} />)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div className="category-list" style={{ padding: '0' }}>
                    <div className="category-container">
                        <h1>Albums</h1>
                        <div className="category">
                            <div className="station-list">
                                {queryItems.artist[0] ? queryItems.artist[0].albums?.map(album => <CardPreview key={album.albumId} id={album.albumId} type="album" img={album.thumbnailUrl} title={album.title} text={album.year} />) : queryItems.albums?.map(album => <CardPreview key={album.albumId} id={album.albumId} type="album" img={album.thumbnailUrl} title={album.title} text={album.year} />)}

                            </div>
                        </div>
                    </div>
                    {queryItems.artist[0] && <>
                        <div className="category-container">
                            <h1>Suggested Songs</h1>
                            <div className="category">
                                <div className="station-list">
                                    {queryItems.artist[0].singles?.map(single => <CardPreview type="album" id={single.albumId} img={single.thumbnailUrl} key={single.title} title={single.title} text={single.year} />)}

                                </div>
                            </div>
                        </div>
                        <div className="category-container">
                            <h1>Artists</h1>
                            <div className="category">
                                <div className="station-list">
                                    {queryItems.artist[0].suggestedArtists?.map(artist => <CardPreview type="artist" id={artist.artistId} img={artist.thumbnailUrl} key={artist.artistId} title={artist.name} text={artist.subscribers} />)}
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div>
                : <div className="collection-list">
                    {categories?.map((category) =>
                        <div className="collection" onClick={() => navigate(`/album/${category.albumId}`.replace('/search'), { replace: true })} key={category._id} style={{ backgroundColor: randColor() }}>
                            <h1>{category.title}</h1>
                            <img src={category.thumbnailUrl} referrerPolicy="no-referrer" alt='' />
                        </div>
                    )}
                </div>}
        </section>

    )
}