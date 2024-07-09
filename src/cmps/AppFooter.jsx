import { useSelector } from "react-redux"

import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {
    const toyCount = useSelector(storeState => storeState.toyModule.toys.length)

    return (
        <footer className="app-footer">
            <h5>Currently {toyCount} toys in the database</h5>
            <p>Rights reserved to me and the places i copied the code from :D</p>
            <UserMsg />
        </footer>
    )


}