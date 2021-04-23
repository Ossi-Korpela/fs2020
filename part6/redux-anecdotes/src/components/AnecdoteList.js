import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filterValue = useSelector(state => state.filter)    
    const filtered = anecdotes.filter(a => a.content.toLowerCase().match(filterValue.toLowerCase()))

    return(
        <ul>
            {filtered.map(anecdote =>
            <li key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => {
                    dispatch(vote(anecdote))
                    dispatch(setNotification(`You voted "${anecdote.content}"`,5))                 
                }}>vote</button>
            </div>
            </li>
            )}
        </ul>
    )
}

export default AnecdoteList