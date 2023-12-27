import "../../assets/styles/_modalFeed.scss";
import { Link, NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Reply from "./Reply";

function ModalFeed() {
  return (
    <div className="myfeed">
      <div className="feedImg">
        <Swiper
          navigation={true}
          pagination={{ dynamicBullets: true }}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide>
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAyMjEyMDJfMTAw/MDAxNjY5OTU3MjcwNjEy.QoEE0nDGXuXvNiHaouDC1n77DqXoqXSyiiBiu1fCQbgg.gOTLKvlfynfliHXYjkOfFFSC_OZ9m6yMPEsMrFcDFlYg.JPEG.neweunha/SE-79b660f6-d36d-4cc1-82f7-00f15911e49f.jpg?type=w800"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </div>
      <Reply />
    </div>
  );
}

export default ModalFeed;