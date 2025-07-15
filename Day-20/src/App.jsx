import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/neet/online-coaching-class-11" element={<CLass11Program />} />
        <Route path="/neet/online-coaching-class-12" element={<CLass12Program />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </div>
}

function ErrorPage(){
  return <div>
    Sorry page not found
  </div>
}

function Landing(){
  return <div>
    Welcome to allen
  </div>
}

function CLass11Program() {
  return <div>
    NEET programs for class 11th
  </div>
}

function CLass12Program() {
  return <div>
    NEET programs for class 12th
  </div>
}

export default App
