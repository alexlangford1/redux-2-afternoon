import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from "./ducks/budgetReducer";
import userReducer from './ducks/userReducer'

const rootReducer = combineReducers({
    budget: reducer,
    user: userReducer,
    
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))