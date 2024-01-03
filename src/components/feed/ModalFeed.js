import "../../assets/styles/_modalFeed.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Reply from "./Reply";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { wouteAPI } from "../../api";

function ModalFeed() {
  const { id } = useParams();
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await wouteAPI(`/p/${id}`, "GET");
        // feedData가 배열이라고 가정하고 새 데이터를 추가
        setFeedData(response.data);
      } catch (error) {
        console.error("피드 데이터 불러오기 실패:", error);
      }
    };
    fetchFeedData();
  }, [id]); // id가 변경될 때마다 호출

  useEffect(() => {
    // feedData 상태가 변경될 때마다 로그를 찍어 확인
    console.log(feedData);
  }, [feedData]);
  return (
    <div className="myfeed">
      <div className="feedImg">
        <Swiper
          navigation={true}
          pagination={{ dynamicBullets: true }}
          modules={[Pagination, Navigation]}
        >
          {feedData?.attaches?.map((item) => (
            <SwiperSlide key={item.uuid}>
              <img src={ `http://localhost:8081/file/${item.uuid}` } alt='' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Reply feedData={feedData} />
    </div>
  );
}

export default ModalFeed;