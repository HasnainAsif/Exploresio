import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth'
import newsletter from './newsletter'
import tour from './tour'
import customTour from './customTour'

export default combineReducers({
    alert,
    auth,
    newsletter,
    tour,
    customTour
})