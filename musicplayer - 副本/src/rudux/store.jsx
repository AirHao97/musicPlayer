import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import allReducer from '../rudux'

export default createStore(allReducer,applyMiddleware(thunk))