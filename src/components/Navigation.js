import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navigation() {
    return (
        <div className='navigation'>
            <div className='inner'>
                <h1 className='logo'><Link to='/'>woute</Link></h1>
                <div className='gnb'>
                    <ul>
                        <li className='home'><NavLink to='/'>홈</NavLink></li>
                        <li className='cource'><NavLink to='/cource'>코스</NavLink></li>
                        <li className='create'><NavLink to='/create'>만들기</NavLink></li>
                        <li className='notice'><NavLink to='/notice'>알림</NavLink></li>
                        <li className='profile'><NavLink to='/profile'><i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>프로필</NavLink></li>
                    </ul>
                </div>
                <div className='terms'>
                    <ul>
                        <li>약관</li>
                        <li>채용정보</li>
                        <li>도움말</li>
                        <li>개인정보처리방침</li>
                    </ul>
                    <p>&copy; woute all right reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Navigation