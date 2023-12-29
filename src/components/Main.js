import { useEffect, useState } from 'react'
import { wouteAPI } from './../api'
import Search from './Search'
import Aside from './Aside'
import Post from './Post'


function Main() {
    const limit = 10
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [target, setTarget] = useState()
    const [loaded, setLoaded] = useState(false)


    const feedData = async (offset) => {
        try {
            const feedList = await wouteAPI('/p', 'GET', null)
            setData(feedList.data)
            // setData((prev) => prev.concat(feedList.data))
            setTotalPage(feedList.data.length / limit)
        } catch(err) {
            console.log('에러: ' + err)
        }
    }

    useEffect(() => {
        feedData(offset)
    }, [ offset ])

    const handlePageChange = async page => {
        setLoaded(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        if(page >= 1 && page <= totalPage) {
            setOffset(page)
        }
        setLoaded(false)
    }

    const onIntersect = async ([entry], observer) => {
        if(entry.isIntersecting && !loaded) {
            observer.unobserve(entry.target)
            await handlePageChange()
            observer.observe(entry.target)
        }
    }

    useEffect(() => {
        let observer
        if(target) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: 0.4,
            })
            observer.observe(target)
        }
        return () => observer && observer.disconnect()
    }, [ target ])

    return (
        <div className='main'>
            <div className='section'>
                <Search />
                <div className='feeds'>
                    {
                        [...data]?.reverse().map(item => (
                            <Post data={ item } />
                        ))
                    }
                    <div ref={ setTarget } className='observer'>
                        { loaded && <></> }
                    </div>
                </div>
            </div>
            <Aside />
        </div>
    )
}

export default Main