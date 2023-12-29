import { useState } from 'react'
import { Link, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import Hearts from './Hearts'
import FeedLike from './feed/FeedLike'

function Post({ data }) {
    const path = `/p/${ data.id }`
    const location = useLocation()
    const [like, setLike] = useState(false)
    const handleLike = () => {
        setLike((prev) => !prev)
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
                            toggle={ like }
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
                    <div className='heart' onClick={ handleLike } toggle={ like }>
                        { like && <Hearts /> }
                    </div>
                    <Routes>
                        <Route path='/like' element={<FeedLike />}/>
                    </Routes>
                    <Link to='like'>좋아요 { data.heartCount }개</Link>
                </div>
                <div className='description'>
                    <p>{ data.content }</p>
                    {
                        data?.tags.map(item => (
                            <span>{ item.words }</span>    
                        ))
                    }
                </div>
                <Link to={ path } className='comment' state={{ backgroundLocation: location, type: data.type }}>
                    <span className='user'><i style={{backgroundImage: `url(${ data.profileImage })`}}></i></span>
                    <span>댓글쓰기</span>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Post