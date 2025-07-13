import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let CounterVisible = true;

  return (
    <div>
      {CounterVisible ? <Counter></Counter> : null}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(function () {
    setInterval(function () {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App
