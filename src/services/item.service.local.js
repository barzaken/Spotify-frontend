
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'item'

export const itemService = {
    query,
    getById,
    save,
    remove,
    getEmptyItem,
    addItemMsg
}
window.cs = itemService


async function query(filterBy = { txt: '', price: 0 }) {
    var items = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        items = items.filter(item => regex.test(item.vendor) || regex.test(item.description))
    }
    if (filterBy.price) {
        items = items.filter(item => item.price <= filterBy.price)
    }
    return items
}

function getById(itemId) {
    return storageService.get(STORAGE_KEY, itemId)
}

async function remove(itemId) {
    await storageService.remove(STORAGE_KEY, itemId)
}

async function save(item) {
    var savedItem
    if (item._id) {
        savedItem = await storageService.put(STORAGE_KEY, item)
    } else {
        // Later, owner is set by the backend
        item.owner = userService.getLoggedinUser()
        savedItem = await storageService.post(STORAGE_KEY, item)
    }
    return savedItem
}

async function addItemMsg(itemId, txt) {
    // Later, this is all done by the backend
    const item = await getById(itemId)
    if (!item.msgs) item.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    item.msgs.push(msg)
    await storageService.put(STORAGE_KEY, item)

    return msg
}

function getEmptyItem() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
;(async ()=>{
    await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
    await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
})()