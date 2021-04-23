
const notificationReducer = (state = '', action) => {
    switch (action.type){        
        case 'SET':
            if(state.msgExists){
                window.clearTimeout(state.timer)
            }
            return action.data
        case 'REMOVE':
            return action.data
        default:
            return state
    }
}

export const setNotification = (msg, duration) => {
    return async dispatch => 
        {
            const timeoutID = window.setTimeout(() => {
                dispatch({
                    type: 'REMOVE',
                    data: {
                        msg: '',
                        msgExists: false,
                        timer: null
                    }
                })
            }, duration*1000)

            dispatch({
                type: 'SET',
                data: {
                    msg: msg,
                    msgExists: true,
                    timer: timeoutID
                }
            })
            

        }    
}

export const remove = () => {
    return {
        type : 'REMOVE',
        data: {
            msg: '',
            msgExists: false,
            timer: null
        }
    }
}

export default notificationReducer