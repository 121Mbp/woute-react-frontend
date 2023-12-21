import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

function Navigation() {
    const location = useLocation()
    const navigate = useNavigate()
    const noticeRef = useRef()
    const [prev, setPrev] = useState('/')
    const [active, setActive] = useState(false)
    
    useEffect(()=>{
        if(location.pathname === '/notice') {
            document.body.style.overflow = 'hidden';
            setActive(true)
            const handleFocus = e => {
                if(noticeRef.current && !noticeRef.current.contains(e.target)) {
                    document.body.style.overflow = 'unset';
                    setPrev(location.pathname)
                    navigate(prev)
                    setActive(false)
                }
            }
            document.addEventListener('mouseup', handleFocus)
            return () => { document.removeEventListener('mouseup', handleFocus) }
        } else {
            document.body.style.overflow = 'unset';
            setActive(false)
        }
    }, [ noticeRef, prev ])

    const handleClick = e => {
        if(location.pathname === '/notice') {
            e.preventDefault()
            navigate(prev)
            setActive(false)
        }
        setPrev(location.pathname)
        setActive(true)
        noticeRef.current?.scrollTo({ top: 0, hefavior: 'smooth' })
    }

    return (
        <div className={`navigation ${ active ? 'active' : '' }`}>
            <div className='inner'>
                <h1 className='logo'><Link to='/'>woute</Link></h1>
                <div className='gnb'>
                    <ul>
                        <li className='home'><NavLink to='/'>홈</NavLink></li>
                        <li className='course'><NavLink to='/course'>코스</NavLink></li>
                        <li className='create'><NavLink to='/create' state={{ backgroundLocation: location }}>만들기</NavLink></li>
                        <li className='notice'><NavLink to='/notice' state={{ backgroundLocation: location }} onClick={ handleClick }>알림</NavLink></li>
                        <li className='chat'><NavLink to='/chat' state={{ backgroundLocation: location }}>채팅</NavLink></li>
                        <li className='profile'><NavLink to='/profile'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>프로필</NavLink>
                        </li>
                    </ul>
                    <Outlet />
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
            <div className='notification' ref={ noticeRef }>
                <div className='title'>알림</div>
                <ul>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                        </div>
                        <button className='follow'>팔로우</button>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                        </div>
                        <button className='follow' disabled={ true }>팔로잉</button>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                        </div>
                    </li>
                    <li>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation