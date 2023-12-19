import { useEffect, useState } from 'react'
import Aside from '../Aside'
import Post from './Post'

function Main() {
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
        <div className='main'>
            <div className='section'>
                <div className={`search ${ scrollActive ? '__active' : '' }`}>
                    <div className='inner'>
                        <input type='text' name='keyword' placeholder='검색' />
                        <button type='submit'>검색</button>
                    </div>
                </div>
                <div className='feeds'>
                    <Post type={ 'course' } />
                    <Post type={ 'feed' } />
                    <Post type={ 'course' } />
                </div>
            </div>
            <Aside />
        </div>
    )
}

export default Main