import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import Hearts from '../Hearts'

function Post() {
    return (
        <div className='post'>
            <div className='upper'>
                <Link to='/' className='user'><i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>mark_ju</Link>
                <Link to='/'>코스보기</Link>
            </div>
            <div className='middle'>
                <Swiper
                    navigation={ true }
                    pagination={{ dynamicBullets: true }}
                    modules={[ Pagination, Navigation ]}
                >
                    <SwiperSlide><img src='https://cdn.tourtoctoc.com/news/photo/202311/2999_19038_1129.jpg' alt='' /></SwiperSlide>
                    <SwiperSlide><img src='https://cdn.tourtoctoc.com/news/photo/202311/2999_19039_1133.jpg' alt='' /></SwiperSlide>
                    <SwiperSlide><img src='https://cdn.tourtoctoc.com/news/photo/202311/2999_19040_1138.jpg' alt='' /></SwiperSlide>
                    <SwiperSlide><img src='https://cdn.tourtoctoc.com/news/photo/202311/2999_19041_1142.jpg' alt='' /></SwiperSlide>
                </Swiper>
            </div>
            <div className='lower'>
                <div className='likes'>
                    <div className='heart'>
                        <Hearts />
                    </div>
                    <div>좋아요 999개</div>
                </div>
                <div className='description'>
                    <p>일상비일상의틈 ...</p>
                    <span>#hash</span>
                    <span>#hashtagme</span>
                    <span>#hashlongtag</span>
                    <span>#hashshorttagyou</span>
                    <span>#hashliketag</span>
                    <span>#hashtag</span>
                    <span>#hash</span>
                </div>
                <Link to='/' className='comment'>
                    <span className='user'><i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i></span>
                    <span>댓글쓰기</span>
                </Link>
            </div>
        </div>
    )
}

export default Post