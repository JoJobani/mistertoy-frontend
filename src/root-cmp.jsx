import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'


import '../src/assets/style/main.css'


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='app'>
          <AppHeader />
          <main className='main-layout'>
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<About />} path='/about' />
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<ToyEdit />} path='/toy/edit' />
              <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
              <Route element={<ToyDetails />} path='/toy/:toyId' />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}