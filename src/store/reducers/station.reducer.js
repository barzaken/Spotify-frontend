const INITIAL_STATE = {
    stations: [],
    currStation:null,
    currSong:null,
    playlist:{
        station:null,
        idx:null,
        isPlaying:null,
    },
    filterBy: {
        txt: '',
    },
    searchTerm: null,
    query:null,
    msg:'Welcome'
}


export function stationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_STATIONS':
            return {
                ...state,
                stations: action.stations
            }
        case 'SET_SONG':
            return {
                ...state,
                currSong: action.currSong
            }
        case 'ADD_STATION':
            return {
                ...state,
                stations: [...state.stations, action.station]
            }
        case 'REMOVE_STATION':
            return {
                ...state,
                stations: state.stations.filter(station => station._id !== action.stationId)
            }
        case 'UPDATE_STATION':
            return {
                ...state,
                stations: state.stations.map(station => station._id === action.updatedStation._id ? action.updatedStation : station),
                // currStation:action.updatedStation
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: {...action.filterBy}
            }
        case 'SET_STATION':
            return {
                ...state,
                currStation: {...action.currStation}
            }
        case 'SET_MSG':
            return {
                ...state,
                msg:action.msg
            }
        case 'SET_PLAYLIST':
            return {
                ...state,
                playlist: {station:{...action.station},idx:0,isPlaying:true}
            }
        case 'SET_PLAYLIST_IDX':
            return {
                ...state,
                playlist: {...state.playlist,idx:action.idx}
            }
        case 'TOGGLE_PLAYLIST':
            return {
                ...state,
                playlist: {...state.playlist,isPlaying:action.mode}
            }
        case 'SET_SEARCH':
            return {
                ...state,
                searchTerm: action.searchTerm
            }
        case 'SET_QUERY':
            return {
                ...state,
                query: action.query
            }

        default:
            return state
    }

}