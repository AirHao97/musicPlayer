import {combineReducers} from 'redux'

import songsMsg from './reducers/songsMsg'
import userMsg from './reducers/userMsg'
import loginStatus from './reducers/loginStatus'
import playerState from './reducers/playerState'

export default combineReducers(
    {
        songsMsg,
        userMsg,
        loginStatus,
        playerState
    }
)