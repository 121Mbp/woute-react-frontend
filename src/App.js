import { useState, useEffect } from "react";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import MyFeedMain from "./components/MyFeed/MyFeedMain";
import CourseList from "./components/courseList/CourseList";
import Modal from "./components/Modal";
import Modifyprofile from "./components/user/ModifyProfile";
import Loghead from "./components/user/LogHead";
import Loginform from "./components/user/LoginForm";
import Join from "./components/user/Join";
import Logfooter from "./components/user/LogFooter";
import "./assets/styles/_login.scss";

function App() {
  const location = useLocation();
  const state = location.state && location.state.backgroundLocation;
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);
  const [token, setToken] = useState(false);

  const handleScroll = () => {
    window.pageYOffset < scrollY
      ? setScrollActive(false)
      : setScrollActive(true);
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    };
    scrollListener();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const LogLayout = ({ children }) => (
    <>
      <div className="log-top">
        <Loghead />
        {children}
      </div>
      <Logfooter />
    </>
  );

  return (
    <>
      {token ? (
        <div className={`App ${scrollActive ? "__active" : ""}`}>
          <Navigation />
          <div className="container">
            <Routes location={state || location}>
              <Route path="/" element={<Main />} />
              <Route path="/course" element={<CourseList />} />
              <Route path="/profile/*" element={<MyFeedMain />} />
              <Route path="/modifyProfile" element={<Modifyprofile />} />
            </Routes>
            {state && (
              <Routes>
                <Route path="create" element={<Modal />} />
                <Route path="p/:id" element={<Modal />} />
                <Route path="chat" element={<Modal />} />
                <Route path="notice" element={<></>} />
              </Routes>
            )}
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <LogLayout>
                <Loginform />
              </LogLayout>
            }
          ></Route>
          <Route
            path="/join"
            element={
              <LogLayout>
                <Join />
              </LogLayout>
            }
          ></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
