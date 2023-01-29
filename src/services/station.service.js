
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    search,
    getEmptyStation,
    getSongById,
    addstationMsg,
    getAlbumById,
    getArtistById,
    getAlbums
}
window.cs = stationService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)

}
function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}
function getSongById(stationId) {
    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`song/${stationId}`)
}
function getAlbumById(albumId) {
    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`album/${albumId}`)
}
function getAlbums() {
    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`album`)
}
function getArtistById(artistId) {
    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`artist/${artistId}`)
}

async function remove(stationId) {
    // await storageService.remove(STORAGE_KEY, stationId)
    return httpService.delete(`station/${stationId}`)
}
async function search(term) {
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





