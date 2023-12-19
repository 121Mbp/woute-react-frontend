import { Link, NavLink } from 'react-router-dom'
import '../../assets/styles/_modalFeed.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Reply from './Reply'

function ModalFeed() {
    return (
        <div className='myFiid'>
            <div className='fiidImg'>
                <Swiper
                    navigation={true}
                    pagination={{ dynamicBullets: true }}
                    modules={[Pagination, Navigation]}
                >
                    <SwiperSlide><img src='./img/jeju.jpg' alt=''/></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                </Swiper>
            </div>
            <Reply />
        </div>
    )
}

export default ModalFeed