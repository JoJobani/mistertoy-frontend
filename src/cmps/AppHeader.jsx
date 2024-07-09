import { NavLink } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {

    return (
        <header className='app-header main-layout'>
            <h1>Mister Toy</h1>
            <nav className='app-nav'>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
            <UserMsg />
        </header>
    )

}