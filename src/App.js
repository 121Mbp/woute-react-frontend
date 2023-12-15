import { useState } from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Main from './components/feed/Main'
import Modal from './components/feed/Modal'


function App() {

  return (
    <div className='App'>
      <Navigation />
      <div className='container'>
        <Routes>
          <Route path='/' element={ <Main /> } />
          <Route path='/create' element={ <><Main /><Modal /></> } />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;