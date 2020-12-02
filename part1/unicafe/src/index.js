import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Botton = ({handleEvent, text}) => {
  
  return(
  <button onClick={handleEvent}>{text}</button>
  )
}
const Statistics = ({text, operation}) => {
  
  return(
    <div>
      <h3>{text} {operation}</h3>
    </div>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


let all;

  return (
    <div>
      <h1>give feedback</h1>
      <Botton handleEvent = {() => setGood(good+1)} text="Good"/>
      <Botton handleEvent = {() => setNeutral(neutral+1)} text="Neutral"/>
      <Botton handleEvent = {() => setBad(bad+1)} text="Bad"/>
      <h1>Statistics</h1>
        <Statistics text= "Good" operation={good} />
        <Statistics text= "Neutral" operation={neutral} />
        <Statistics text= "Bad" operation={bad} />
        <Statistics text= "All" operation={ all = good + neutral + bad} />
        <Statistics text ="Average" operation={(good *1)+(neutral*0) + (bad* -1) / 3}/>
        <Statistics text="Positive" operation={(good/all)* 1
        *100 || 0}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)