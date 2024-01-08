import { useEffect, useState } from 'react'
import { Link, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { wouteAPI } from '../api'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import Hearts from './Hearts'
import FeedLike from './feed/FeedLike'

function Post({ data, wouteFeeds, user }) {
    const path = `/p/${ data.id }`
    const location = useLocation()
    const [like, setLike] = useState(false)
    const [likeId, setLikeId] = useState()
    const userId = user.id

    useEffect(() => {
        const likedUsers = data.likes?.filter(user => user.id === userId)
        setLike(likedUsers.length > 0)
        if (likedUsers.length > 0) setLikeId(likedUsers[0].id) 
    }, [ data.likes, userId ])

    const handleLike = async () => {
        console.log(like)
        if(like) {
            try {
                await wouteAPI(`${ path }/like/${ likeId }`, 'DELETE', null)
                setLike(!like)
            } catch(err) {
                console.log('에러: ' + err)
            }
        } else {
            const params = {
                nickname: data.nickname,
                profileImage: data.profileImage,
            }
            try {
                await wouteAPI(`${ path }/like`, 'PUT', params)
                setLike(!like)
            } catch(err) {
                console.log('에러: ' + err)
            }
        }
        wouteFeeds()
    }
    
    return (
        <div className='post'>
            <div className='upper'>
                <Link to='/' className='user'><i style={{backgroundImage: `url(${ data.profileImage })`}}></i>{ data.nickname }</Link>
                { data.type === 'courses' && <Link to={ path } state={{ backgroundLocation: location, type: data.type }}>코스보기</Link> }
            </div>
            <div className='middle'>
                {
                    data?.attaches?.length > 1 ? (
                        <Swiper
                            navigation={ true }
                            pagination={{ dynamicBullets: true }}
                            modules={[ Pagination, Navigation ]}
                            onDoubleClick={ handleLike }
                        >   
                            {
                                data.attaches?.map(item => (
                                    <SwiperSlide key={ item.uuid }><img src={ `http://localhost:8081/file/${item.uuid}` } alt='' /></SwiperSlide>
                                ))
                            }
                        </Swiper>
                    ) : (
                        <img src={ `http://localhost:8081/file/${data?.attaches[0].uuid}` } alt='' />
                    )
                }
            </div>
            <div className='lower'>
                <div className='likes'>
                    <div className='heart' onClick={ handleLike }>
                        { like ? <Hearts /> : '' }
                    </div>
                    <Routes>
                        <Route path={ `${ path }/like` } element={<FeedLike likes={ data.likes } />} />
                    </Routes>
                    <Link to={ `p/${ data.id }/like` }>좋아요 { data.likes.length }개</Link>
                </div>
                <div className='description'>
                    <p>{ data.title }</p>
                    {
                        data?.tags.map(item => (
                            <span key={ item.id }>{ item.words }</span>    
                        ))
                    }
                </div>
                <Link to={ path } className='comment' state={{ backgroundLocation: location, type: data.type }}>
                    <span className='user'><i style={{backgroundImage: `url(${ user.profileImage })`}}></i></span>
                    <span>댓글쓰기</span>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Post