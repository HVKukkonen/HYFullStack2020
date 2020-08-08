import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
    <button> onClick={props.Handler}
      {props.name}
    </button>
    <div>{props.count}</div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GoodClick = () => setGood(good + 1)

  return (
    <div>
      
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)