import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { toyReducer } from './reducers/toy.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { reviewReducer } from "./reducers/review.reducer.js"
import { systemReducer } from "./reducers/system.reducer.js"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,
    systemModule: systemReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

//For debugging
window.gStore = store