import { combineReducers } from 'redux';
import { userReducer } from './userReducer'
import { reservationReducer } from './reservationReducer'
import { reviewReducer } from './reviewReducer'

const rootReducer = combineReducers({
  userReducer,
  reservationReducer,
  reviewReducer
})

export default rootReducer;