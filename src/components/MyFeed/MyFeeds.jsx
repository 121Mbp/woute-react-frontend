import { useEffect, useState } from "react"
import { wouteAPI } from "../../api";

export default function MyFeeds() {
    const [feeds, setFeeds] = useState([
        {
            id:1,
            feedImg :'https://image.blip.kr/v1/file/51e913eef7c7545bffed072eaeda3611'
        },
        {
            id:2,
            feedImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmrDbzeRoOl_Rc_tb0jN1OY-ifCtSflVYbQ&usqp=CAU'
        },
        {
            id:3,
            feedImg :'https://img.sportsworldi.com/content/image/2023/06/08/20230608510214.jpg'
        },
    ])
    
    // const getFeeds =  async () => {
    //     const response = await wouteAPI('/users/{id}', 'GET')
    //     console.log(response);
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
                row[i] ? (
                    <a href='#1' key={i}>
                        <img src={row[i].feedImg} key={row[i].id} />
                        <div className='feedHover'>
                            <ul className='prevInfo'>
                                {/* 좋아요 댓글 카운트 */}
                                <li>1000</li>
                                <li>500</li>
                            </ul>
                        </div>
                    </a>
                ) : (
                    <div className="none_image" key={i}></div>
                    )
                )}
            </article>
        ))}
        </>
    )
}