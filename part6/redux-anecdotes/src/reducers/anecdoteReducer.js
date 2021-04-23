import anecdoteService from "../services/anecdoteService"


const compareAnecdotes = (a1, a2) => {
  return a2.votes - a1.votes
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type){
    case 'VOTE':
      const updated = state.map(s => s.id === action.data.id ? action.data : s)
      return updated.sort(compareAnecdotes);
    case 'CREATE':            
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data.sort(compareAnecdotes) 
    default:
      return state;
  }
}

export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const vote = (anecdote) => {
    return async dispatch => {
      const newObj = {...anecdote, votes: anecdote.votes +1}
      const votedAnecdote = await anecdoteService.edit(newObj.id, newObj)
      dispatch({
        type: 'VOTE',
        data:  votedAnecdote 
      })
  }
}

export const create = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer