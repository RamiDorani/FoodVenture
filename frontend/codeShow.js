
//*store.js*\\
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);



//*index.js*\\
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



//*user.ACTION*//

import { userService } from '../../services/userService'

export function setFilter(filter) {
  return dispatch => {
    dispatch({ type: 'SET_FILTER', filter })
  }
}

export function clearFilter() {
  return dispatch => {
    dispatch({ type: 'CLEAR_FILTER' })
  }
}

export function loadUsers(filterBy) {
  return async dispatch => {
    const users = await userService.query(filterBy)
    dispatch({ type: 'SET_USERS', users })
  }
}

export function removeUser(userId) {
  return async dispatch => {
    await userService.remove(userId)
    dispatch({ type: 'REMOVE_USER', userId })
  }
}

export function saveUser(user) {
  return async dispatch => {
    const actionType = user._id ? 'UPDATE_USER' : 'ADD_USER'
    user = await userService.save(user)
    dispatch({ type: actionType, user })
  }
}

export function login(userCreds) {
  return async dispatch => {
    const user = await userService.login(userCreds);
    dispatch({ type: 'SET_USER', user });
  };
}

export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
  };
}
  
export function logout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}  


//*user.REDUCER*//
let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
  loggedInUser: localLoggedinUser,
  users: [],
  filter: ''
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    
    case 'SET_USERS':
      return { ...state, users: action.users }

    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
        
    case 'REMOVE_USER':
      return { ...state, users: state.users.filter(user => user._id !== action.userId)}

    case 'UPDATE_USER':
      const idx = state.users.findIndex(user => user._id === action.user._id)
      const updatedUsers = [...state.users]
      updatedUsers[idx] = action.user
      return { ...state, users: updatedUsers}

    case 'ADD_USER':
      return { users: [...state.users, action.user], ...state }

    case 'SET_FILTER':
      return { ...state, filter: action.filter }

    case 'CLEAR_FILTER':
      return { ...state, filter: '' }

    default:
      return state
  }
}