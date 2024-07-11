import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useNavigate, useLocation } from 'react-router-dom'

export function AppHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState(getInitialTab());

    function getInitialTab() {
        const pathToIndex = {
            '/about': 0,
            '/toy': 1,
            '/dashboard': 2
        }
        return pathToIndex[location.pathname] || 0;
    }

    const handleChange = (event, newTab) => {
        setTab(newTab)
        const paths = ['/about', '/toy', '/dashboard']
        navigate(paths[newTab])
    }

    return (
        <header className='app-header'>
            <div className='logo'>
                <h1>Mister Toy</h1>
            </div>
            <nav className='app-nav'>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'cyan',
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
        </header >
    )

}