import { useEffect, useState } from "react"
import { wouteAPI } from "../../api";
import { Link, useLocation } from "react-router-dom";

export default function MyFeeds({feeds}) {
    // const [feeds, setFeeds] = useState([
    //     {
    //         id:1,
    //         feedImg :'https://image.blip.kr/v1/file/51e913eef7c7545bffed072eaeda3611'
    //     },
    //     {
    //         id:2,
    //         feedImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmrDbzeRoOl_Rc_tb0jN1OY-ifCtSflVYbQ&usqp=CAU'
    //     },
    //     {
    //         id:3,
    //         feedImg :'https://img.sportsworldi.com/content/image/2023/06/08/20230608510214.jpg'
    //     },
    //     {
    //         id:4,
    //         feedImg :'https://img.sportsworldi.com/content/image/2023/06/08/20230608510214.jpg'
    //     },
    //     {
    //         id:5,
    //         feedImg :'https://img.sportsworldi.com/content/image/2023/06/08/20230608510214.jpg'
    //     },
    // ])
    // const [feeds, setFeeds] = useState([])
    const currentId = localStorage.getItem('id')
    const location = useLocation()
    console.log(feeds);
    // const getFeeds =  async () => {
    //     const response = await wouteAPI(`/users/${currentId}`, 'GET')
    //     console.log(response.data);
    //     setFeeds(response.data)
    // }

    // useEffect(() => {
    //     getFeeds()
    // },[])
    
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
        {devidePosts(feeds).map((row,index) => (
            <article key={index}>
                {[0,1,2].map((i) => 
                row[i] && row[i].attaches && row[i].attaches.length > 0  ? (
                    <Link to={`/p/${row[i].id}`} state={{ backgroundLocation: location, type: row[i].type}} key={i}>
                        <img src={`http://localhost:8081/file/${row[i].attaches[0].uuid}`} />
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