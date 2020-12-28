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