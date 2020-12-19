import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const randomNumber = (min, max) => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleDotes = () => setSelected(randomNumber(0, anecdotes.length));

  const handleVote = () => {
    console.log(points);
    let copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };
  let max = Math.max(...points);

  let highestIndex = points.indexOf(max);

  return (
    <div>
      <p> {anecdotes[selected]} </p>
      <p>has {points[selected] > 0 ? points[selected] : 0} votes</p>
      <button onClick={handleDotes}>next anecdotes</button>
      <button onClick={handleVote}>Vote</button>
      <h3>Anecdotes with the most votes</h3>
      {max > 0 ? (
        <>
          <span> {anecdotes[highestIndex]}</span>
          <p>has {points[highestIndex]} votes</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
