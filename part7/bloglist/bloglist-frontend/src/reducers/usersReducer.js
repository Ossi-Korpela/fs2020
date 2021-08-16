import usersService from '../services/users'
import { setNotification } from './notificationReducer'

const usersReducer = (state = [], action) => {
    switch (action.type){
        case 'SET_USERS' :
            return action.data
        default:
            return state
    }
}

export const initUsers = () => {
    return async dispatch => {
        try {
            const users = await usersService.getAll()
        dispatch({
            type : 'SET_USERS',
            data : users
        })
        }
        catch (err){
            console.log(err)
            dispatch(setNotification('error retrieving users', 5))
        }        
    }
}

export default usersReducer