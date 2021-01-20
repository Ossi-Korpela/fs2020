import React, { useState } from 'react'
import ReactDOM from 'react-dom'




const All = (props) => {
  const {good, neutral, bad} = props
  return(
    good+neutral+bad
  )
}

const Average = (props) => {
  const {good, neutral, bad} = props
  const average = (good - bad)/(good+neutral+bad)
  return(
    average
  )
}

const Positive = (props) => {
  const {good, neutral, bad} = props
  const positiveP = good/(good+neutral+bad)*100
  return(
    <>{positiveP} %</>
  )
}

const StatisticLine = (props) => {
  const {text, value} = props
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr> 
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
    if(good+neutral+bad > 0)
      return(
        <table>
          <tbody>             
            <StatisticLine text="good" value ={good}/>
            <StatisticLine text="neutral" value ={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={<All good={good} neutral={neutral} bad={bad}/>}/>
            <StatisticLine text="average" value={<Average good={good} neutral={neutral} bad={bad}/>}/>
            <StatisticLine text="postitive" value={<Positive good={good} neutral={neutral} bad={bad}/>}/>
          </tbody>  
        </table>
      )
    else
        return(
          <p>
            No feedback given
          </p>
        )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClickGood = () => {
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral +1)
  }
  const handleClickBad = () => {
    setBad(bad +1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClickGood} text="good">good</button>
      <button onClick={handleClickNeutral} text="neutral" >neutral</button>
      <button onClick={handleClickBad} text="bad" >bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>   

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

