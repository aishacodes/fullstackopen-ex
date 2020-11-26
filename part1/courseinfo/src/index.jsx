import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}
const Total = ({ parts }) => {
return( <p> Number of exercise { parts.reduce((s, val) => s + val.exercises, 0 )}</p>)
}
const Part = ({part}) => {
  return(
    <>
     <p>
        {part.name} {part.exercise}
      </p>
    </>
  )

}
const Content = ({ parts }) => {
  return (
    <>
    {parts.map((part, index) => <Part key={`part-${index}`} part={part}/>
 )}


    </>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const parts =[{
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
  }]

  return (
    <div>
      <Header course={course} />
      <Content parts = {parts} />
      <Total parts={parts} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
