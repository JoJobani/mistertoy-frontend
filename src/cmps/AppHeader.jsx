import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { LoginSignup } from "./LoginSignup.jsx"
import { logout } from '../store/actions/user.actions.js'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [tab, setTab] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        setTab(getTabValue(location.pathname))
    }, [location.pathname])

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }

    function getTabValue(path) {
        const pathToIndex = {
            '/about': 0,
            '/toy': 1,
            '/dashboard': 2
        }
        return pathToIndex[path] !== undefined ? pathToIndex[path] : false
    }

    const handleChange = (event, newTab) => {
        const paths = ['/about', '/toy', '/dashboard']
        navigate(paths[newTab])
    }

    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <header className='app-header'>
            <Link
                to={'/'}
                className="logo"
                onClick={handleLogoClick}>
                <h1>Mister Toy</h1>
            </Link>
            {user && (
                <section>
                    <p>Welcome back {user.fullname}</p>
                    <button onClick={onLogout}>Logout</button>
                </section>
            )}
            {!user && (
                <section>
                    <LoginSignup />
                </section>
            )}
            <nav className='app-nav'>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: tab === false ? 'transparent' : 'cyan',
                        }
                    }}>
                    <Tab
                        label="About"
                        sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} />
                    <Tab
                        label="Toys"
                        sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} />
                    <Tab
                        label="Dashboard"
                        sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} />
                </Tabs>
            </nav>
        </header>
    )
}