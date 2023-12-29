import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import Abb from "./Abb";
import Cbb from "./Cbb";
import FeedList from "./FeedList";

export default function MyFeedList() {
    return(
        <>
        <div className='feed-cate'>
            <NavLink to='/profile' className='cate-btn'><div>게시물</div></NavLink>
            {/* <NavLink to='/profile/' className='cate-btn'><div>게시물</div></NavLink> */}
            {/* <NavLink to='feeds' className='cate-btn'><div>게시물</div></NavLink> */}
            <NavLink to='courses' className='cate-btn'><div>코스</div></NavLink>
            <NavLink to='likes' className='cate-btn'><div>좋아요</div></NavLink>
        </div>
        <div className="myFeed-list">
            <Routes>
                <Route path={`/`} element={<Abb/>} ></Route>
                {/* <Route path={`/feeds`} element={<Abb/>} ></Route> */}
                <Route path={`/courses`} element={<Cbb/>}></Route>
                <Route path={`/likes`} element={<FeedList/>}></Route>
            </Routes>
        </div>
        </>
    )
}