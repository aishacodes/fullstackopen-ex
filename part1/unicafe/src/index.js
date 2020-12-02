import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Botton = ({handleEvent, text}) => {
  
  return(
  <button onClick={handleEvent}>{text}</button>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Botton handleEvent = {() => setGood(good+1)} text="Good"/>
      <Botton handleEvent = {() => setNeutral(neutral+1)} text="Neutral"/>
      <Botton handleEvent = {() => setBad(bad+1)} text="Bad"/>
      <h1>Statistics</h1>
        <h3>Good {good}</h3> 
        <h3>Neutral {neutral}</h3>
        <h3>Bad {bad}</h3>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)