import React, { useState } from "react";
import ReactDOM from "react-dom";

const Botton = ({ handleEvent, text }) => {
  return <button onClick={handleEvent}>{text}</button>;
};
const Statistic = ({ text, operation }) => {
  return (
    <table>
      <tbody>
        <tr style={{ marginBottom: "20px" }}>
          <td>{text}</td>
          <td>{operation}</td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all;

  return (
    <div>
      <h1>Give feedback</h1>
      <Botton handleEvent={() => setGood(good + 1)} text="Good" />
      <Botton handleEvent={() => setNeutral(neutral + 1)} text="Neutral" />
      <Botton handleEvent={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      {good || bad || neutral ? (
        <>
          <Statistic text="Good" operation={good} />
          <Statistic text="Neutral" operation={neutral} />
          <Statistic text="Bad" operation={bad} />
          <Statistic text="All" operation={(all = good + neutral + bad)} />
          <Statistic
            text="Average"
            operation={good * 1 + neutral * 0 + (bad * -1) / 3}
          />
          <Statistic
            text="Positive"
            operation={((good / all) * 1 * 100 || 0) + "%"}
          />
        </>
      ) : (
        <h4>No feedback given</h4>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
