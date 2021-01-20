import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const MostVoted = (props) => {
  const {points, anecdotes} = props
  const maxPoints = Math.max.apply(Math, points)
  var i
  for (i = 0; i < points.length; i++){
    if(points[i] === maxPoints){
      break
    }
  }
  console.log(i)
  return(
    <>
      {anecdotes[i]}
    </>
  )

}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  

  const handleClick = () => {    
    let nextAnecdote = Math.floor(Math.random()*anecdotes.length)
    while(nextAnecdote === selected){
      nextAnecdote = Math.floor(Math.random()*anecdotes.length)
    }

    setSelected(nextAnecdote)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br/>
      has {points[selected]} votes<br/>
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h1>Anecdote with most votes</h1>
      <MostVoted points={points} anecdotes={anecdotes}/>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)