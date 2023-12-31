import { useLocation } from 'react-router';
import { wouteAPI } from '../../api';
import '../../assets/styles/_courseList.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CourseLlist() {
    const location = useLocation()
    const [scrollY, setScrollY] = useState(0)
    const [scrollActive, setScrollActive] = useState(false)
    const [courseList, setCourseList] = useState([
        {
            id:1,
            img :'https://image.blip.kr/v1/file/51e913eef7c7545bffed072eaeda3611'
        },
        {
            id:2,
            img :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmrDbzeRoOl_Rc_tb0jN1OY-ifCtSflVYbQ&usqp=CAU'
        },
        {
            id:3,
            img :'https://img.sportsworldi.com/content/image/2023/06/08/20230608510214.jpg'
        },
        {
            id:4,
            img :'https://news.nateimg.co.kr/orgImg/iz/2021/11/07/2cdx4f1SaIOm637718401281006314.jpg'
        },
        {
            id:5,
            img :'https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTVfMjA0/MDAxNjgxNTMxOTUwNjY5.3aFBdZfQySJSo2TH5mUuRGg8riRIxNMY3P_W9vLHo0Qg.T_gDjf-V2-PyCmm0zklwtcOihGTBR-pA1bCbi6KEBGwg.JPEG.johtaa27/resized_img_3347(1).jpg?type=w800'
        },
        {
            id:6,
            img :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpA7Ei_T3tgcOgdKGGRSTJftDKfKRLy_q9sg&usqp=CAU'
        },
        {
            id:7,
            img :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DUd0CnKIWb4BZjZfw6vcfflkZZfuWgnvnw&usqp=CAU'
        },
        {
            id:8,
            img :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwhlluLohGUusaZ0RoqQF1CMRxzerX0V3bZfWeFBlD1vWG_qe2zyH3B4u5tAf0KEAF0k&usqp=CAU'
        },
        {
            id:9,
            img :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2e83jzb8qUMzjKZHralrLTOYhoeOhPmtSFg&usqp=CAU'
        },
        {
            id:10,
            img :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLINDNYhIBBa5PN91341XLTOcXlMRoFO6ZA&usqp=CAU'
        },
    ])

    const handleScroll = () => {
        (window.pageYOffset < scrollY) ? setScrollActive(false) : setScrollActive(true)
        setScrollY(window.pageYOffset)
    }
    useEffect(() => {
        const scrollListener = () => {
            window.addEventListener('scroll', handleScroll)
        }
        scrollListener()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [ scrollY ])

    const courses = async () => {
        const response = await wouteAPI('/p/courses', 'GET')
        setCourseList(response.data)
        console.log(response.data);
    }
    
    useEffect(() => {
        courses()
    },[])

    const devidePosts = (data) => {
        const arr = [...data];
        let tmp = [];
        const length = data.length;
        for (let i = 0; i <= length / 3; i++) {
          tmp = [...tmp, [...arr.splice(0, 3)]];
        }
        return tmp;
      };
    
    return (
        <div className='main'>
            <div className='clMain'>
                <div className='section'>
                    <div className={`search ${ scrollActive ? '__active' : '' }`}>
                        <div className='inner'>
                            <input type='text' name='keyword' placeholder='검색' />
                            <button type='submit'>검색</button>
                        </div>
                    </div>
                    <article >
                        {devidePosts(courseList).map((row, index) => (
                            <div className='courseList' key={index}>
                                {[0, 1, 2].map((i) =>
                                row[i] && row[i].attaches && row[i].attaches.length > 0  ? (
                                    <Link to={`/p/${row[i].id}`} className='view' state={{ backgroundLocation: location, type: row[i].type}} key={i}>
                                            <img src={`http://localhost:8081/file/${row[i].attaches[0].uuid}`} key={row[i].id} />
                                            <div className='feedHover'>
                                                <ul className='prevInfo'>
                                                    <li>{row[i].heartCount}</li>
                                                    <li>{row[i].replyCount}</li>
                                                </ul>
                                            </div>
                                        </Link>
                                        ) : (
                                            <div className="none_image" key={i}></div>
                                        )
                                    )}
                            </div>
                        ))}
                        {/* {devidePosts(courseList).map((row, index) => (
                            <div className='courseList' key={index}>
                                {[0, 1, 2].map((i) =>
                                row[i] ? (
                                        <Link href='#1' className='view' key={i}>
                                            <img src={row[i].img} key={row[i].id} alt="" />
                                            <div className='feedHover'>
                                                <ul className='prevInfo'>
                                                    <li>1000</li>
                                                    <li>500</li>
                                                </ul>
                                            </div>
                                        </Link>
                                        ) : (
                                            <div className="none_image" key={i}></div>
                                        )
                                    )}
                            </div>
                        ))} */}
                    </article>
                </div>
            </div>
        </div>
    )
}