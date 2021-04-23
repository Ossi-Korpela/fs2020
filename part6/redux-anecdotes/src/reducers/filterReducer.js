

const filterReducer = (state = '', action) => {
    switch (action.type){
        case 'SET-FILTER':
            return action.data
        case 'REMOVE-FILTER':
            return ''
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {
        type : 'SET-FILTER',
        data: filter
    }
}

export const removeFilter = () => {
    return {
        type : 'REMOVE-FILTER',
        data : {}
    }
}

export default filterReducer