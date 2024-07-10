import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className='app-header main-layout'>
            <div>
                <h1>Mister Toy</h1>
            </div>
            <nav className='app-nav'>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    )

}