import { useState, useEffect } from 'react'
import './App.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Main from './components/Main'
import Modal from './components/Modal'

function App() {
  const location = useLocation()
  const state = location.state && location.state.backgroundLocation
  const [scrollY, setScrollY] = useState(0)
  const [scrollActive, setScrollActive] = useState(false)

  const handleScroll = () => {
      (window.pageYOffset < scrollY) ? setScrollActive(false) : setScrollActive(true)
      setScrollY(window.pageYOffset)
  }
  
  useEffect(() => {
      const scrollListener = () => {
          window.addEventListener('scroll', handleScroll)
      }
      scrollListener()
      return () => window.removeEventListener('scroll', handleScroll)
  }, [ scrollY ])

  return (
    <div className={`App ${ scrollActive ? '__active' : '' }`}>
      <Navigation />
      <div className='container'>
        <Routes location={ state || location }>
          <Route path='/' element={ <Main /> } />
          <Route path='/course' element={ <>course</> } />
        </Routes>
        {state && (
          <Routes>
            <Route path='create' element={ <Modal /> } />
            <Route path='p/:id' element={ <Modal /> } />
            <Route path='chat' element={ <Modal /> } />
            <Route path='notice' element={ <></> } />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;