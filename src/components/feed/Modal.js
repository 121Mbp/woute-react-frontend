import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import '../../assets/styles/_modal.scss'
import PostType from './PostType'
import CourseCreate from './CourseCreate'
import CourseView from './CourseView'
import ModalAddFeed from './ModalAddFeed'
import ModalFeed from './ModalFeed'

function Modal() {
    const location = useLocation()
    const state = location.state && location.state?.backgroundLocation
    const [type, setType] = useState('')
    console.log(location)
    return (
        <div className='modal'>
            <div className='inner'>
                {
                    location.pathname === '/create' ? (
                        <><PostType type={ setType } />
                        { type === 'course' ? <CourseCreate /> : type === 'feed' ? <ModalAddFeed /> : '' }</>
                    ) : (
                        location.pathname === '/p' && (
                            location.state.type === 'course' ? <CourseView /> : (
                                location.state.type === 'feed' ? <ModalFeed /> : ''
                            )
                        )
                    )
                }
                <Link to={ state } className='close'>닫기 <Outlet /></Link>
            </div>
        </div>
    )
}

export default Modal