import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Join() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const verfiyHandle = (e) => {
    e.preventDefault();
    alert("인증되었습니다.");
    setShowVerification(false);
  };

  // const [verificationText, setVerificationText] = useState("");

  // const handleConfirmationButtonClick = () => {
  //   // 인증 확인 로직 필요
  //   setShowVerification(true);
  //   console.log("인증확인완료");
  // };

  // const generateNewVerificationText = () => {
  //   // 새로운 인증 텍스트를 생성하는 함수
  //   return Math.random().toString(36).substring(7);
  // };
  const handleVerificationButtonClick = (e) => {
    e.preventDefault();
    console.log("handleVerificationButtonClick 호출");
    setShowVerification(true);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordMatch(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    checkPasswordMatch(password, newConfirmPassword);
  };

  const checkPasswordMatch = (pw, confirmPw) => {
    if (pw === confirmPw || pw === "" || confirmPw === "") {
      setPasswordMatchError("");
    } else {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    }
  };

  // 이메일 입력값 변경 시 호출되는 함수
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNickChange = (e) => {
    setNickname(e.target.value);
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Nickname:", nickname);
    console.log("password :", password);
    console.log("password2:", confirmPassword);
    if (password !== confirmPassword) {
      alert("패스워드가 다릅니다.");
      // 패스워드가 다를때 작동하지 않음
    } else {
      const user = {
        nickname: nickname,
        password: password,
        email: email,
        provider: "woute",
      };
      console.log("객체선언");
      console.log("user" + user.email);

      axios
        .post("/join", user, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("서버 응답:", response.data);
        })
        .catch((error) => {
          console.error("에러 발생:", error.message);
        });
      alert(nickname + "님의 가입이 완료되었습니다.");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="logform-position">
        <form onSubmit={handleSubmit}>
          <div className="signup-input">
            <div className="email-position">
              <input
                className="signup-input-email"
                type="text"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className="email-veri-button"
                onClick={handleVerificationButtonClick}
              >
                인증하기
              </button>
            </div>
            <button className="email-button"></button>
          </div>
          {showVerification && (
            <div className="signup-input">
              <div className="email-position">
                <input className="verify-input-email" type="text" />
                <button className="email-confirm" onClick={verfiyHandle}>
                  확인
                </button>
              </div>
            </div>
          )}

          <div className="signup-input">
            <input
              className="signup-input-nick"
              type="text"
              placeholder="닉네임"
              autoComplete="off"
              value={nickname}
              onChange={handleNickChange}
            />
            <button className="nick-button"></button>
          </div>
          <div className="signup-input">
            <input
              className="signup-input-pw"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
            <button className="pw-button"></button>
          </div>
          <div className="signup-input">
            <input
              className="signup-input-check"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ marginBottom: "10px" }}
              autoComplete="new-password"
            />
            <button className="pw-button2"></button>
          </div>
          <span style={{ color: "red", marginLeft: "20px", paddingTop: "3px" }}>
            {passwordMatchError}
          </span>
          <div className="btn-position">
            <button className="signup-btn" type="submit">
              가입하기
            </button>
          </div>
        </form>
      </div>
      <ul className="signup-sns">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
}

export default Join;
