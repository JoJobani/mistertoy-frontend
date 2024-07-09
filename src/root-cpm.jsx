import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {store} from './store/store.js'

import '../src/assets/style/main.css'


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='app'>

        </section>
      </Router>
    </Provider>
  )
}
