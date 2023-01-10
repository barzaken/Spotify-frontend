import { stationService } from "../../services/station.service"

export function loadStations() {
    return async (dispatch, getState) => {
        try {
            const filterBy = getState().stationModule.filterBy
            const stations = await stationService.query(filterBy)
            console.log(stations)
            dispatch({ type: 'SET_STATIONS', stations })
            return stations
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeStation(stationId) {
    return async (dispatch) => {
        try {
            await stationService.remove(stationId)
            dispatch({ type: 'REMOVE_STATION', stationId })
            return
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function updateStation(station) {
    return async (dispatch) => {
        try {
            const updatedStation = await stationService.save(station)
            dispatch({ type: 'UPDATE_STATION', updatedStation })
            return
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function getStationById(stationId) {
    return async (dispatch) => {
        try {
            const station = await stationService.getById(stationId)
            await dispatch({ type: 'SET_STATION', currStation: station })
            console.log('set station',station);
            return station
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function addStation(station) {
    return async (dispatch) => {
        try {
            if(!station) station = stationService.getEmptyStation()
            const savedStation = await stationService.save(station)
            dispatch({ type: 'ADD_STATION', station:savedStation })
            return savedStation
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setSearchTerm(term) {
    return async (dispatch) => {
        try {
            if(!term)return dispatch({ type: 'SET_QUERY', query: null })

            
            const queryStations = await stationService.search(term)
            dispatch({ type: 'SET_QUERY', query: queryStations })
            dispatch({ type: 'SET_SEARCH', searchTerm: term })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setStation(station) {
    return (dispatch) => {
        try {
            dispatch({ type: 'SET_STATION', currStation: { ...station } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function toggleSongFromStation(station,song) {
    return async (dispatch) => {
        const songIdx = station.songs.findIndex(s => s.songId === song.songId)
        var action = ''
        if(songIdx === -1){
            station.songs.unshift(song)
            action = 'added'
        }else {
          station.songs.splice(songIdx,1)
          action = 'removed'
        }
        try {
            const updatedStation = await stationService.save(station)
            console.log(updatedStation)
            dispatch({ type: 'UPDATE_STATION', updatedStation })
            dispatch({ type: 'SET_MSG', msg:`${song.song_title} ${action} ` })
        } catch (err) {
            console.log('err:', err)
        }
    }
}


export function setPlaylist(station) {
    return (dispatch) => {
        try {
            dispatch({ type: 'SET_PLAYLIST', station: { ...station } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setPlaylistIdx(idx) {
    return (dispatch) => {
        try {
            dispatch({ type: 'SET_PLAYLIST_IDX', idx: idx })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function toggleIsPlaying(mode) {
    return (dispatch) => {
        try {
            dispatch({ type: 'TOGGLE_PLAYLIST', isPlaying: mode })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setSong(song) {
    return async (dispatch) => {
        try {
            if(song) song.url = await stationService.getSongById(song.songId)
            dispatch({ type: 'SET_SONG', currSong: { ...song } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function getEmptyStation() {
    return async (dispatch) => {
        try {
            const station = await stationService.getEmptyStation()
            return station
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function alert(msg) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_MSG', msg })
        } catch (err) {
            console.log('err:', err)
        }
    }
}