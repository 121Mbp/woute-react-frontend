import '../../App.scss';
import '../../assets/styles/_login.scss';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
function Loghead() {
  const [isLogClick, setIsLogClick] = useState(true);
  const [isSignClick, setIsSignClick] = useState(false);

  const handleLog = () => {
    setIsLogClick(true);
    setIsSignClick(false);
  }
  const handleSign = () => {
    setIsSignClick(true);
    setIsLogClick(false);
  }

  return (
   <>
    
        <div className='log-logo-position'>
          <div className='log-logo'></div>
        </div>
        
        <div className='log-sign-position'>
          <ul className='log-sign'>
            <li className={`log-title ${isLogClick ? 'active' : ''}`}>
              <Link to="/login" onClick={handleLog}>Login</Link>
            </li>
            <li className={`sign-title ${isSignClick ? 'active' : ''}`}>
              <Link to="/join"  onClick={handleSign}>Sign up</Link>
            </li>
          </ul>
        </div>
        
   </>
  );
}

export default Loghead;
