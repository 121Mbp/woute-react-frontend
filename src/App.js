import { useState } from 'react'
import './App.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Main from './components/feed/Main'
import Modal from './components/feed/Modal'

function App() {
  const location = useLocation()
  const state = location.state && location.state.backgroundLocation
  return (
    <div className='App'>
      <Navigation />
      <div className='container'>
        <Routes location={ state || location }>
          <Route path='/' element={ <Main /> } />
          <Route path='/cource' element={ <>cource</> } />
        </Routes>
        {state && (
          <Routes>
            <Route path='create' element={ <Modal /> } />
            <Route path='p' element={ <Modal /> } />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;