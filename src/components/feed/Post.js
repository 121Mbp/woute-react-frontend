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
                    <SwiperSlide><img src='https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/294403150_7844086842331965_1581287340140642271_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zhI9ixwvdkAAX-U_LbJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB2CwNh8lAx8cc3tCuDTNc-33IFxcxWdPUfgnfybwMpyA&oe=65808F4D' alt='' /></SwiperSlide>
                    <SwiperSlide><img src='https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/294403150_7844086842331965_1581287340140642271_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zhI9ixwvdkAAX-U_LbJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB2CwNh8lAx8cc3tCuDTNc-33IFxcxWdPUfgnfybwMpyA&oe=65808F4D' alt='' /></SwiperSlide>
                    <SwiperSlide><img src='https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/294403150_7844086842331965_1581287340140642271_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zhI9ixwvdkAAX-U_LbJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB2CwNh8lAx8cc3tCuDTNc-33IFxcxWdPUfgnfybwMpyA&oe=65808F4D' alt='' /></SwiperSlide>
                    <SwiperSlide><img src='https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/294403150_7844086842331965_1581287340140642271_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zhI9ixwvdkAAX-U_LbJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB2CwNh8lAx8cc3tCuDTNc-33IFxcxWdPUfgnfybwMpyA&oe=65808F4D' alt='' /></SwiperSlide>
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