import { useState } from 'react'
import './App.css'

function App() {

  return <div>
    <Light />
  </div>
}

function Light(){
  const [bulbOn, setButtonOn] = useState(true);

  return <div>
    <LightBulb bulbOn = {bulbOn}/>
    <OnSwitch bulbOn={bulbOn} setButtonOn={setButtonOn}/>
  </div>
}

function LightBulb({bulbOn}){
  return <div>
    {bulbOn ? "Bulb on" : "Bulb off"}
  </div>
}

function OnSwitch({bulbOn, setButtonOn}){
  function switchHandeler(){
    setButtonOn(bulbOn => bulbOn = !bulbOn)
  }

  return <div>
    <button onClick={switchHandeler}>On-Off-Switch</button>
  </div>
}


export default App
