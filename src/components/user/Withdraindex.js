import { useState } from "react";
import "../../assets/styles/_withdraindex.scss";

function WithdraIndex({ onCloseModal }) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 비밀번호 일치여부 확인 로직 필요
  // 계정삭제 로직 필요
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
      <div className="withdra-frame">
        <div className="withdra-header">
          <span className="withdra-icon"></span>
          <div>
            <h2>회원탈퇴</h2>
            <h3>탈퇴한 아이디는 재사용 및 복구가 불가능합니다.</h3>
          </div>
        </div>
        <input className="current-pw" type="text" placeholder="이메일" />
        <input
          className="change-pw"
          type="password"
          value={password1}
          onChange={(e) => handlePasswordChange(e, setPassword1)}
          placeholder="비밀번호"
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
          <button onClick={handleButtonClick}>탈퇴하기</button>
        </div>
      </div>
    </>
  );
}
export default WithdraIndex;
