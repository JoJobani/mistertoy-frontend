import { toyService } from "../../services/toy.service.js"
import {
    ADD_TOY,
    UPDATE_TOY,
    REMOVE_TOY,
    SET_TOYS,
    TOY_UNDO,
    SET_FILTER_BY,
    SET_SORT_BY,
    SET_IS_LOADING,

} from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const { filterBy, sortBy } = store.getState().toyModule
        let toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys ', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('toy action -> Cannot remove toy ', err)
        throw err
    }
}

export async function removeToyOptimistic(toyId) {
    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        await toyService.remove(toyId)
    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        let savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.log('toy action -> Cannot save toy ', err)
        throw err
    }
}

export function setFilterBy(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setSortBy(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}