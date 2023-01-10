import { useDispatch, useSelector } from 'react-redux';

import { setSong } from '../store/actions/station.actions';
import { SongList } from '../cmps/SongList';
import { TextField } from '@mui/material';
import { useState,useEffect } from "react";

import { setSearchTerm } from "../store/actions/station.actions"


export const CategoryPage = () => {
    function randColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    // const songs = 

    const [term, setTerm] = useState("");
    useEffect(() => {
        const search = setTimeout(() => {
            if(!term) return
            dispatch(setSearchTerm(term))
        }, 2000)
        return () => clearTimeout(search)
      }, [term])
      
    const dispatch = useDispatch()
    const searchTerm = useSelector((state) => state.stationModule.searchTerm)
    const queryItems = useSelector((state) => state.stationModule.query)
    async function playSong(song) {
        dispatch(setSong(song))
    }
    const categories = [
        { name: 'Best Hits', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: '2023 Israel Hits', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: '2023 UK Hits', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'All Time Hits', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: '2000 Hits', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: '2010 Hits', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: '2020 Hits', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: `90s Mix`, imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: '80s Mix', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'Moody Mix', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'Happy Mix', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'Pop Mix', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'Workout Mix', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'Sports Mix', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'Hype Mix', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
        { name: 'Live Show Performance', imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg", color: randColor() },
    ]
    return (
        <section className="category-page main-layout">
            <h1 className="mobile-input-title">Search</h1>
            <input type="search" onChange={(event) => setTerm(event.target.value)} className='mobile-input' placeholder="Search for music"  />
            <h1>{searchTerm ? `Results for ${searchTerm}` : 'Explore Categories'}</h1>
            {(searchTerm && queryItems) ? <div className="song-list">
                <div className="songs">
                {queryItems.slice(0, 2).map((song) =>
                    <div className="song" key={song.songId} >
                        <h1>{song.song_title}</h1>
                        <img src={song.song_cover} alt='' />
                    </div>
                )}
                </div>
                <SongList playSong={playSong} songs={queryItems} />
            </div>
            :<div className="collection-list">
                {categories.map((category) =>
                    <div className="collection" onClick={() => setTerm(`${category.name}`)} key={category.color} style={{ backgroundColor: category.color }}>
                        <h1>{category.name}</h1>
                        <img src={category.imgUrl} alt='' />
                    </div>
                )}
            </div> }
        </section>

    )
}