import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    // return httpService.get(BASE_URL, filterBy)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = 1000
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) && toy.price < filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    // return httpService.get(BASE_URL + toyId)
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return httpService.delete(BASE_URL + toyId)
    return storageService.remove(STORAGE_KEY, toyId)

}

function save(toy) {
    // if (toy._id) {
    //     return httpService.put(BASE_URL, toy)
    // } else {
    //     return httpService.post(BASE_URL, toy)
    // }
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: 'Demo toy ' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(10, 500),
        labels: [],
        createdAt: '',
        inStock: false
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        labels: []
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 10; i++) {
            toys.push(_createRandToy())
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
        console.log(toys)
    }
}

function _createRandToy() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    return {
        _id: utilService.makeId(),
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(10, 500),
        labels: [labels[Math.floor(Math.random() * labels.length)]],
        createdAt: Date.now(),
        inStock: true
    }
}