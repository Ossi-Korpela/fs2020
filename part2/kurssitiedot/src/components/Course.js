import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}


const Content = (props) => {
  const parts = props.course.parts
  const total = parts.reduce( (s,p) => s + p.exercises, 0)  

  return(
    <>
      {parts.map(part => 
        <p key={part.id}>{part['name']} {part['exercises']}<br/></p>
        )}
        <b>total of {total} exercises</b>
        
    </>
  )
}



const Course = (props) => {
  const {course} = props
  return(
    <div>
      <Header course={course.name}/>
      <Content course={course}/>      
    </div>

  )

}

const Courses = (props) => {
  const {courses} = props
  return(
    <div>
      {courses.map(c => <Course course={c}/>)}
    </div>
  )

}

export default Courses