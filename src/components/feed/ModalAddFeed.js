import React, { useState, useEffect } from "react";
import "./../../assets/styles/_modalAddFeed.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import imageCompression from "browser-image-compression";

function ModalAddFeed() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const imageFiles = e.target.files;
    if (imageFiles.length === 0) return;

    const newFiles = [...files, ...imageFiles];
    setFiles(newFiles);
    generatePreviews(imageFiles);
  };

  const generatePreviews = (imageFiles) => {
    const newPreviews = Array.from(imageFiles).map((imageFile) =>
      URL.createObjectURL(imageFile)
    );
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const compressImages = async () => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedImages = await Promise.all(
        files.map((file) => imageCompression(file, options))
      );
      console.log("Compressed Images:", compressedImages);
    } catch (error) {
      console.error("Error compressing images:", error);
    }
  };

  const handleImgDelete = (idx) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== idx));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== idx));
    URL.revokeObjectURL(previews[idx]);
  };

  const handlePostSubmit = async () => {
    await compressImages();
    alert("이미지가 압축되었습니다!");
  };

  const isMaxImagesReached = previews.length >= 5;
  return (
    <div className="addFeed">
      <div className="feedImg">
        <Swiper
          navigation={true}
          pagination={{ dynamicBullets: true }}
          modules={[Pagination, Navigation]}
        >
          {previews.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`Slide Preview ${i}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="feedRecord">
        <div className="feedRecordinner">
          <div className="recordImg">
            {previews.length > 0 && (
              <ul style={{ display: "flex" }}>
                {previews.map((src, i) => (
                  <li key={i}>
                    <img src={src} alt={`Preview ${i}`} />
                    <i onClick={() => handleImgDelete(i)}></i>
                  </li>
                ))}
              </ul>
            )}
            {!isMaxImagesReached && (
              <div
                className="addIcon"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </div>
          <div className="feedTitle">
            <input placeholder="타이틀을 입력하세요"></input>
          </div>
          <div className="feedContent">
            <textarea placeholder="#을이용하여태그를이용해보세요"></textarea>
          </div>

          <div className="feedBtn">
            <button onClick={handlePostSubmit}>피드기록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddFeed;