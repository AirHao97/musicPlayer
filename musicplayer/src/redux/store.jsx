import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import allReducer from '../redux'

export default createStore(allReducer,applyMiddleware(thunk))