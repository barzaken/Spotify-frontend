import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export const BottomNav = () => {
    const [value, setValue] = useState('recents');
    const navigate = useNavigate()
    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/')
                break;
            case 1:
                navigate('/search')
                break;
                case 2:
                break;
            case 3:
                navigate('/user')
                break;
            default:
        }
    }

    return (
        <section className="bottom-nav">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => { handleChange(event, newValue) }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Libary" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="User" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </section>
    )
}