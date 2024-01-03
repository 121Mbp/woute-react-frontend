import { useState } from "react";

function Loginform() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const emailHandle = (e) => {
    setEmail(e.currentTarget.value);
  };
  const passwordHandle = (e) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <>
      <div className="logform-position">
        <form>
          <div className="logform-input">
            <input
              className="log-input-email"
              value={Email}
              onChange={emailHandle}
              type="text"
              placeholder="이메일"
            />
            <button className="email-button"></button>
          </div>
          <div className="logform-input">
            <input
              className="log-input-pw"
              type="password"
              value={Password}
              onChange={passwordHandle}
              placeholder="비밀번호"
            />
            <button className="pw-button"></button>
          </div>
          <div className="btn-position">
            <button className="log-btn" type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
      <ul className="log-find">
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
      </ul>
      <ul className="log-sns">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
}
export default Loginform;
