import { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [tab, setTab] = useState(false)

    useEffect(() => {
        setTab(getTabValue(location.pathname))
    }, [location.pathname])

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