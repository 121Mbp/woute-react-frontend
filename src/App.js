import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Main from './components/feed/Main'

function App() {
  return (
    <div className='App'>
      <Navigation />
      <div className='container'>
        <Routes>
          <Route path='/' element={ <Main /> } />
          <Route path='/' element={ <></> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;