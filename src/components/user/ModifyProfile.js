import { useRef, useState } from "react";
import "../../assets/styles/_modifypro.scss";
import UserModal from "./UserModal";
import Withdrawal from "./Withdrawal";
function Modifyprofile() {
  const [isEditing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("mark_ju");
  const [isInEditing, setInEditing] = useState(false);
  const [intro, setIntro] = useState("서울 wouter 마크주커버그입니다.");
  // 닉네임수정
  const handleNEditClick = () => {
    setEditing(true);
  };
  const handleNSaveClick = () => {
    alert(`닉네임이 ${nickname}으로 수정되었습니다.`);
    setEditing(false);
  };
  const handleNInputChange = (e) => {
    setNickname(e.target.value);
  };
  //소개내용
  const handleInEditClick = () => {
    setInEditing(true);
  };
  const handleInSaveClick = () => {
    alert(`자기소개가 수정되었습니다.`);
    setInEditing(false);
  };
  const handleInInputChange = (e) => {
    setIntro(e.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const closeModalHandler = () => {
    setIsOpen(false);
  };
  const [isOpen2, setIsOpen2] = useState(false);
  const openModalHandler2 = () => {
    setIsOpen2(!isOpen);
  };
  const closeModalHandler2 = () => {
    setIsOpen2(false);
  };
  //프로필 이미지 교체
  //파일 저장 로직 구현 필요
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  const inputRef = useRef(null);

  const handlePicButtonClick = () => {
    inputRef.current.click();
  };
  return (
    <>
      <div className="modify-main">
        <div className="modify-profile">
          <div className="modify-form">
            <div className="button-position">
              <div></div>
              <span>프로필</span>
            </div>
            <div className="edit-picture">
              <div
                className="picture"
                style={{
                  backgroundImage: selectedImage
                    ? `url(${selectedImage}`
                    : "none",
                }}
              ></div>
              <input
                ref={inputRef}
                className="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <button onClick={handlePicButtonClick}>사진수정</button>
            </div>
          </div>
          <ul className="modify-content">
            <li>
              <span className="email-icon"></span>e-mail
            </li>
            <div className="modify-input-position">
              <span className="email-input">mark_ju123@wouter.com</span>
            </div>

            <li>
              <span className="nick-icon"></span>닉네임
            </li>
            <div className="modify-input-position">
              {isEditing ? (
                <>
                  <input
                    className="nick-input-edit"
                    value={nickname}
                    onChange={handleNInputChange}
                  />
                  <button className="save-button" onClick={handleNSaveClick}>
                    저장
                  </button>
                </>
              ) : (
                <>
                  <span className="nick-input">{nickname}</span>
                  <button className="edit-button" onClick={handleNEditClick}>
                    수정
                  </button>
                </>
              )}
            </div>

            <li>
              <span className="intro-icon"></span>소개내용
            </li>
            <div className="modify-input-position">
              {isInEditing ? (
                <>
                  <input
                    className="intro-input-edit"
                    value={intro}
                    onChange={handleInInputChange}
                  />
                  <button className="save-button" onClick={handleInSaveClick}>
                    저장
                  </button>
                </>
              ) : (
                <>
                  <span className="intro-input">{intro}</span>
                  <button className="edit-button" onClick={handleInEditClick}>
                    수정
                  </button>
                </>
              )}
            </div>
          </ul>
          <button className="pw-change" onClick={openModalHandler}>
            비밀번호 변경
          </button>
          {isOpen ? <UserModal closeModal={closeModalHandler} /> : null}
          <button className="withdrawal" onClick={openModalHandler2}>
            회원탈퇴
          </button>
          {isOpen2 ? <Withdrawal closeModal={closeModalHandler2} /> : null}
        </div>
      </div>
    </>
  );
}

export default Modifyprofile;
