import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
    <button onClick={props.handler}>
      {props.name}
    </button>
  )
}

function all(good, neutral, bad) {
  return good + neutral + bad
}

function avg(good, neutral, bad) {
  return ( good - bad ) / all(good, neutral, bad)
}

function pos(good, neutral, bad) {
  return good / all(good, neutral, bad) *100
}

const StatisticLine = (props) => {
  return <tr><td>{props.name}</td><td>{props.value}</td></tr>
}

const Statistics = (props) => {

  if (all(props.good, props.neutral, props.bad) === 0) {
    return "No feedback given"

  } else {

    return (
      <div>
      <h1>{"statistics"}</h1>
      <table>
        <tbody>
          <StatisticLine name="Good" value={props.good}/>
          <StatisticLine name="Neutral" value={props.neutral}/>
          <StatisticLine name="Bad" value={props.bad}/>
          <StatisticLine name="All" value={all(props.good, props.neutral, props.bad)}/>
          <StatisticLine name="Average" value={avg(props.good, props.neutral, props.bad)}/>
          <StatisticLine name="Positive" value={pos(props.good, props.neutral, props.bad)}/>
        </tbody>
      </table>
    </div>
    )
  }

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>

      <h1>{"give feedback"}</h1>

      <div>
        <Button name={"Good"} handler={goodClick} />
        <Button name={"Neutral"} handler={neutralClick} />
        <Button name={"Bad"} handler={badClick} />
      </div>

      <div><Statistics good={good} neutral={neutral} bad={bad}/></div>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)