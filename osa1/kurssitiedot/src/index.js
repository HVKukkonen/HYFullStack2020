import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const Hello = (props) => {
  return (
    <div>
      Hello {props.name}, you are {props.age} years old
    </div>
  )
}

const App = () => {
  const nimi = "Memias"
  const ika = 24

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={nimi} age={ika} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
