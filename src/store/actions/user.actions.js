import { userService } from "../../services/user.service"

export function onSignup(credentials) {
    return async (dispatch) => {
      try {
        const user = await userService.signup(credentials)
        dispatch({
          type: 'SET_USER',
          user,
        })
        return user
      } catch (err) {
        console.log('Cannot signup', err)
      }
    }
  }
  
  export function onLogin(credentials) {
    return async (dispatch) => {
      try {
        const user = await userService.login(credentials)
        dispatch({
          type: 'SET_USER',
          user,
        })
        return user
      } catch (err) {
        console.log('Cannot login', err)
      }
    }
  }
  
  export function onLogout() {
    return async (dispatch) => {
      try {
        await userService.logout()
        dispatch({
          type: 'SET_USER',
          user: {
            userName: 'Guest',},
        })
      } catch (err) {
        console.log('Cannot logout', err)
      }
    }
  }
  
  export function loadUsers() {
    return async (dispatch) => {
      try {
        const loggedinUser = await userService.getLoggedinUser()
        let users = await userService.getUsers()
        users = users.filter(user => user._id !== loggedinUser._id)
        dispatch({ type: 'SET_USERS', users })
      } catch (err) {
        console.log('UserActions: err in loadUsers', err)
      }
    }
  }
  