import React, { useState, useEffect } from "react";
import "./../../assets/styles/_modalAddFeed.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { wouteAPI } from "./../../api";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

function ModalAddFeed({ type }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [spot, setSpot] = useState([]);
  const handleContent = (e) => {
    let value = e.target.value;
    setContent(value);
  };
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

  const postSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    let reg = /#([\S]+)/gim;
    let matches = (content.match(reg) || []).map((e) =>
      e.replace(content, "$1")
    );

    let feed = {
      nickname: "dominic",
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
      type: type,
      title: title,
      content: content,
      hashtag: "",
      heartCount: 0,
    };

    for (let file of files) {
      formData.append("attaches", file);
    }

    formData.append(
      "feed",
      new Blob([JSON.stringify(feed)], { type: "application/json" })
    );
    formData.append(
      "tags",
      new Blob([JSON.stringify(matches)], { type: "application/json" })
    );

    let coursesData = [];
    for (let s of spot) {
      coursesData.push({
        code: s.id,
        store: s.place_name,
        address: s.road_address_name,
        phone: s.phone,
        homepage: s.place_url,
        category: s.category_group_name,
        latitude: s.y,
        longitude: s.x,
      });
    }

    formData.append(
      "courses",
      new Blob([JSON.stringify(coursesData)], { type: "application/json" })
    );

    try {
      await wouteAPI("/p", "POST", formData);

      navigate("/");
    } catch (error) {}
  };

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
            <input
              name="title"
              placeholder="타이틀을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="feedContent">
            <textarea
              name="content"
              placeholder="#을이용하여태그를이용해보세요"
              onChange={handleContent}
            ></textarea>
          </div>

          <div className="feedBtn">
            <button type="submit" onClick={postSubmit}>
              피드기록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddFeed;