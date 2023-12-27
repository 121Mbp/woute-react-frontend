import { useState } from "react";
import "../../assets/styles/_changepw.scss";

function ChangePw({ onCloseModal }) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e, setPassword) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (password2 && newPassword !== password2) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const handlePassword2Change = (e) => {
    const newPassword = e.target.value;
    setPassword2(newPassword);

    if (password2 && newPassword !== password1) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const handleButtonClick = () => {
    //비밀번호 변경로직 수행 후 모달 닫기

    onCloseModal();
  };
  return (
    <>
      <div className="change-frame">
        <div className="changepw-header">
          <span className="changepw-icon"></span>
          <div>
            <h2>비밀번호변경</h2>
            <h3>안전한 비밀번호로 내 정보를 보호하세요.</h3>
          </div>
        </div>
        <input
          className="current-pw"
          type="password"
          placeholder="현재 비밀번호"
        />
        <input
          className="change-pw"
          type="password"
          value={password1}
          onChange={(e) => handlePasswordChange(e, setPassword1)}
          placeholder="변경할 비밀번호"
        />
        <input
          className="check-pw"
          type="password"
          value={password2}
          onChange={handlePassword2Change}
          placeholder="비밀번호 확인"
        />
        <div className="submit-btn" style={{ position: "relative" }}>
          {errorMessage && (
            <span
              style={{
                color: "red",
                position: "absolute",
                bottom: "100%",
                left: 15,
              }}
            >
              {errorMessage}
            </span>
          )}
          <button onClick={handleButtonClick}>변경하기</button>
        </div>
      </div>
    </>
  );
}
export default ChangePw;
