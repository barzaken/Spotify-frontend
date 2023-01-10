
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import songs from '../songs.json'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    search,
    getEmptyStation,
    getSongById,
    addstationMsg
}
window.cs = stationService


async function query(filterBy = { txt: '', price: 0 }) {
    console.log('send req');
    return httpService.get(STORAGE_KEY, filterBy)

}
function getById(stationId) {
    console.log('sent req fromid');    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`station/${stationId}`)
}
function getSongById(stationId) {
    console.log('send req!');
    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`song/${stationId}`)
}

async function remove(stationId) {
    // await storageService.remove(STORAGE_KEY, stationId)
    return httpService.delete(`station/${stationId}`)
}
async function search(term) {
    console.log('sent search');
    return httpService.get(`song/search/${term}`)
}
async function save(station) {
    var savedStation
    if (station._id) {
        // savedstation = await storageService.put(STORAGE_KEY, station)
        savedStation = await httpService.put(`station/${station._id}`, station)

    } else {
        // Later, owner is set by the backend
        station.createdBy = userService.getLoggedinUser()
        // savedstation = await storageService.post(STORAGE_KEY, station)
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

async function addstationMsg(stationId, txt) {
    const savedMsg = await httpService.post(`station/${stationId}/msg`, { txt })
    return savedMsg
}


function getEmptyStation() {
    return {
        name: "New Playlist",
        tags: [],
        createdBy: {},
        likedByUsers: [],
        songs: [],
        msgs: []
    }

}





