import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import NotiList from './NotiList'

function Navigation({ user }) {
    const location = useLocation()
    const navigate = useNavigate()
    const noticeRef = useRef()
    const [prev, setPrev] = useState('/')
    const [active, setActive] = useState(false)
    const [noti, setNoti] = useState([])
    const currentId = localStorage.getItem('id')
    const [redDot, setRedDot] = useState(false)
    

    useEffect(() => {
        if(user.id !== undefined) {
            const eventSource = new EventSource(`http://localhost:8081/sub/${user.id}`)
    
            eventSource.addEventListener('connect', e => {
                console.log("data : " + e.data);
                // console.log(e.data);
            })
            eventSource.addEventListener('sse', e => {
                console.log("sse : " + e.data);
                console.log("알림 : " + e.data);
                setNoti(e.data);
                // toast.success(e.data.nickname + e.data.content)
            })
            eventSource.addEventListener("error", function (event) {
                // console.log(event.target.readyState);
                if (event.target.readyState === EventSource.CLOSED) {
                console.log("eventsource closed");
                }
                eventSource.close();
            });
        }
    },[user])

    
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
                        <li className='course'><NavLink to='/p/courses'>코스</NavLink></li>
                        <li className='create'><NavLink to='/create' state={{ backgroundLocation: location }}>만들기</NavLink></li>
                        <li className='notice'>
                            <NavLink to='/notice' state={{ backgroundLocation: location }} onClick={ handleClick }>알림</NavLink>
                            <div className='redDot'></div>
                        </li>
                        <li className='chat'><NavLink to='/chat' state={{ backgroundLocation: location }}>채팅</NavLink></li>
                        <li className='profile'><NavLink to={`/users/${user.id}`}>
                            {
                                user?.profileImage == null ? (
                                    <i></i>
                                ) : (
                                    <i style={{backgroundImage: `url(${ user.profileImage })`}}></i>
                                )
                            }
                            프로필</NavLink>
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
            <div className="notification" ref={noticeRef}>
                {/* <SearchList/> */}
                <NotiList data={noti} user={user}/>
            </div>
        </div>
    )
}

export default Navigation