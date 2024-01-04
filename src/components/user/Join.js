import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Join() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
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
    passwordRuleCheck(newPassword);
    setPassword(newPassword);
    checkPasswordMatch(newPassword, confirmPassword);
  };
  //비밀번호 유효성 검사
  const passwordRuleCheck = (password) => {
    //영문,숫자,특문 1개씩, 6글자이상
    const PasswwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    const isValid = PasswwordRegex.test(password);
    setIsValidPassword(isValid);
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    checkPasswordMatch(password, newConfirmPassword);
  };
  // 이메일 입력값 변경 시 호출되는 함수
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    emailErrorcheck(e.target.value);
  };

  const emailErrorcheck = (email) => {
    // 이메일 유효성 검사를 위한 정규표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);

    if (!isValid) {
      setEmailError("유효한 이메일이 아닙니다.");
    } else {
      setEmailError("");
    }
  };
  const checkPasswordMatch = (pw, confirmPw) => {
    if (pw === confirmPw || pw === "" || confirmPw === "") {
      setPasswordMatchError("");
    } else {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleNickChange = (e) => {
    setNickname(e.target.value);
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    console.log("Email:", email);
    console.log("Nickname:", nickname);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    if (emailError != null) {
      alert("유효한 이메일이 아닙니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("패스워드가 다릅니다.");
      return; // 패스워드가 다를 때 함수 종료
    }

    const user = {
      nickname: nickname,
      password: password,
      email: email,
      provider: "woute",
    };
    console.log("객체 선언");
    console.log("user: " + user.email);

    try {
      const response = await axios.post("/join", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("서버 응답:", response.data);
      alert(nickname + "님의 가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("에러 발생:", error.message);
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
            <button
              className="email-button"
              style={{ transform: "translateY(32%)" }}
            ></button>
          </div>
          <span
            style={{
              color: "red",
              marginLeft: "20px",
              fontSize: "12px",
            }}
          >
            {emailError}
          </span>
          {showVerification && (
            <div
              className="signup-input"
              style={{ paddingTop: ".1rem", paddingBottom: "1.5rem" }}
            >
              <div className="email-position">
                <input
                  className="verify-input-email"
                  type="text"
                  placeholder="인증번호를 입력하세요."
                />
                <button className="email-confirm" onClick={verfiyHandle}>
                  확인
                </button>
              </div>
            </div>
          )}

          <div className="signup-input" style={{ paddingTop: "3px" }}>
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
              autoComplete="new-password"
            />
            <button
              className="pw-button2"
              style={{ transform: "translateY(-20%)" }}
            ></button>
          </div>
          <span
            style={{
              color: "red",
              marginLeft: "20px",
              fontSize: "12px",
            }}
          >
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
