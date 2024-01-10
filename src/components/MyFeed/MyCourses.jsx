import { useEffect, useState } from "react";
import { wouteAPI } from "../../api";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function MyCourses() {
    const [courses, setCourses] = useState([
        {
            id:1,
            courseImg :'https://news.nateimg.co.kr/orgImg/iz/2021/11/07/2cdx4f1SaIOm637718401281006314.jpg'
        },
        {
            id:2,
            courseImg :'https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTVfMjA0/MDAxNjgxNTMxOTUwNjY5.3aFBdZfQySJSo2TH5mUuRGg8riRIxNMY3P_W9vLHo0Qg.T_gDjf-V2-PyCmm0zklwtcOihGTBR-pA1bCbi6KEBGwg.JPEG.johtaa27/resized_img_3347(1).jpg?type=w800'
        },
        {
            id:3,
            courseImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpA7Ei_T3tgcOgdKGGRSTJftDKfKRLy_q9sg&usqp=CAU'
        },
    ])
    
    const location = useLocation()

    const getCourses =  async () => {
        const response = await wouteAPI(`${location.pathname}`, 'GET')
        console.log(response);
        setCourses(response.data.reverse())
    }

    useEffect(() => {
        getCourses()
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
    return(
        <>
        {devidePosts(courses).map((row,index) => (
            <article key={index}>
                {[0,1,2].map((i) => 
                row[i] && row[i].attaches && row[i].attaches.length > 0  ? (
                    <Link to={`/p/${row[i].id}`} state={{ backgroundLocation: location, type: row[i].type}} key={i}>
                        <img src={`${process.env.REACT_APP_IMAGE_PATH}${row[i].attaches[0].uuid}`} />
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
            </article>
        ))}
        </>
    )
}