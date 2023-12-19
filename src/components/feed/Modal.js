import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import '../../assets/styles/_modal.scss'
import PostType from './PostType'
import CourseCreate from './CourseCreate'

function Modal() {
    const location = useLocation()
    const state = location.state && location.state?.backgroundLocation
    const [type, setType] = useState('')
    return (
        <div className='modal'>
            <div className='inner'>
                <PostType type={ setType } />
                {
                    type === 'course' ? <CourseCreate /> : '' 
                }
                <Link to={ state } className='close'>닫기 <Outlet /></Link>
            </div>
        </div>
    )
}

export default Modal