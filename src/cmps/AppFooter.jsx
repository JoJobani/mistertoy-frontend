import { useSelector } from "react-redux"
import { UserMsg } from './UserMsg.jsx'
import { useEffect } from "react"
import { loadToys } from "../store/actions/toy.actions.js"

export function AppFooter() {
    const toyCount = useSelector(storeState => storeState.toyModule.toys.length)

    useEffect(() => {
        awaitLoad()
    }, [toyCount])

    async function awaitLoad() {
        try {
            await loadToys()
        } catch {
            showErrorMsg('Cannot load toys')
        }
    }

    return (
        <footer className="app-footer">
            <h5>Currently {toyCount} toys in the database</h5>
            <p>Rights reserved to me and the places i copied the code from :D</p>
            <UserMsg />
        </footer>
    )
}