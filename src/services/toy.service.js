import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels
}

function query(filterBy = {}, sortBy) {
    // return httpService.get(BASE_URL, { filterBy, sortBy })
    return storageService.query(STORAGE_KEY)
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
        name: '',
        price: '',
        labels: [],
        isAvailable: true
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        labels: []
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

function getToyLabels() {
    return [...labels]
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 10; i++) {
            toys.push(_createRandToy())
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createRandToy() {
    return {
        _id: utilService.makeId(),
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(10, 500),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: true
    }
}