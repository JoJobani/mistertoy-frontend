import Button from '@mui/material/Button'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { loadToys, removeToyOptimistic, setFilterBy, setSortBy } from "../store/actions/toy.actions.js"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        awaitLoad()
    }, [filterBy, sortBy])

    async function awaitLoad() {
        try {
            await loadToys()
        } catch {
            showErrorMsg('Cannot load toys')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    async function onRemoveToy(toyId) {
        if (!confirm('Are you sure?')) return
        try {
            await removeToyOptimistic(toyId)
            await loadToys()
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    return (
        <main className="toy-index">
            <Button
                variant="contained"
                href="/toy/edit"
                color="secondary"
                sx={{ width: "fit-content" }}
            >
                Add toy
            </Button>
            <ToyFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                sortBy={sortBy}
                onSetSort={onSetSort}
            />
            {!isLoading
                ? <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />
                : <div>Loading...</div>
            }
        </main>
    )
}