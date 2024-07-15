import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels,
    getLabelPriceSum,
    getLabelStock,
    addToyMsg,
    removeToyMsg,
    createRandToy
}

function query(filterBy = {}, sortBy) {
    return httpService.get(BASE_URL, { filterBy, sortBy })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        labels: [],
        inStock: ''
    }
}

function getDefaultSort() {
    return { sortBy: '', desc: true }
}

function getToyLabels() {
    return [...labels]
}

function getLabelPriceSum(toys) {
    if (!toys || toys.length === 0) return []

    const labelPriceSums = {}
    labels.forEach(label => { labelPriceSums[label] = 0; })
    toys.forEach(toy => {
        toy.labels.forEach(label => {
            labelPriceSums[label] += toy.price
        })
    })
    return labels.map(label => labelPriceSums[label])
}

function getLabelStock(toys) {
    if (!toys || toys.length === 0) return []

    const labelStock = {}
    labels.forEach(label => { labelStock[label] = 0; })
    toys.forEach(toy => {
        toy.labels.forEach(label => {
            labelStock[label]++
        })
    })
    return labels.map(label => labelStock[label])
}

async function addToyMsg(toyId, txt) {
    return await httpService.post(`toy/${toyId}/msg`, { txt })
}

async function removeToyMsg(toyId, msgId) {
    return await httpService.delete(`toy/${toyId}/msg/${msgId}`)
}

function createRandToy() {
    return {
        _id: utilService.makeId(),
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(10, 500),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: true
    }
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

