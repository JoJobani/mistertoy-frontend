import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, saveToy, setFilterBy } from "../store/actions/toy.actions.js"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg('New toy added!')
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('Enter new price')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg('Toy price updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update toy price')
            })
    }

    return (
        <main>
            <Link to="/toy/edit">Add toy</Link>
            <button className="add-btn" onClick={onAddToy}>Add a new toy</button>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {!isLoading
                ? <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                />
                : <div>Loading...</div>
            }
        </main>
    )
}