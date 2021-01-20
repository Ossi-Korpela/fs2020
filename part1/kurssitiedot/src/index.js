import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Part = (props) => {
  
  return(
    <>
      <p>{props.n1} {props.e1}</p>
      <p>{props.n2} {props.e2}</p>
      <p>{props.n3} {props.e3}</p>

    </>
  )
}

const Content = (props) => {
  
  return(
    <div>
      <Part n1={props.parts[0].name} e1={props.parts[0].exercises} />
      <Part n1={props.parts[1].name} e1={props.parts[1].exercises}/>
      <Part n1={props.parts[2].name} e1={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
}

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))