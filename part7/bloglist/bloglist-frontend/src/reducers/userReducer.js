import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = (state = { user : null }, action) => {
    switch (action.type){
        case 'LOGIN':            
            return action.data
        case 'LOGOUT':
            return action.data
        case 'SET_USER':
            return action.data
        default:
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
              username, password,
            })
            window.localStorage.setItem(
              'loggedNoteappUser', JSON.stringify(user)
            )
            
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN',
                data: {
                    user: user
                }
            })
        }
        catch (err) {
            dispatch(setNotification('incorrect username or password'))
        }
      
    }
}

export const logout = () => {
    return async dispatch => {
        try{
            window.localStorage.removeItem('loggedNoteappUser')
            blogService.setToken('')

            dispatch({
                type : 'LOGOUT',
                data: {
                    user : null
                }
            })
            dispatch(setNotification('Logged out', 5))
          }
          catch (exeption){
            dispatch(setNotification('Error logging out', 5))
          }
    }
}

export const userFromToken = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        let user = null
        if (loggedUserJSON) {
            user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
        }
        dispatch({
            type : 'SET_USER',
            data: {
                user: user
            }
        })
    }
}

export default userReducer
