import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Loginform({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [localToken, setLocalToken] = useState(localStorage.getItem("token"));
  const emailHandle = (e) => {
    setEmail(e.currentTarget.value);
  };
  const passwordHandle = (e) => {
    setPassword(e.currentTarget.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log({ email });
    console.log({ password });

    const user = {
      email: email,
      password: password,
    };
    console.log("user : " + user.email, user.password);
    axios
      .post("/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("서버 응답 : ", response.data);
        const newToken = response.data.token;
        setLocalToken(newToken);
        //header에 담아서
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", newToken);
        onLogin(newToken);
        navigate("/");
        console.log("서버 응답 : ", response.data);
        console.log("토큰 값 : ", response.data.token);
      })
      .catch((error) => {
        console.error("로그인 에러 : " + error);
      });
  };

  return (
    <>
      <div className="logform-position">
        <form onSubmit={handlesubmit}>
          <div className="logform-input">
            <input
              className="log-input-email"
              value={email}
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
              value={password}
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
