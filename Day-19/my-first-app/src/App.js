import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  function onClickHandeler(){
    setCount(count + 1);
  }

  return (
    <div>
      <button onClick={onClickHandeler}>
        Counter {count}
      </button>
    </div>
  );
}

export default App;
