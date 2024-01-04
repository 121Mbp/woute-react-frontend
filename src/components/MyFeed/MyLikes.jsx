import { useEffect, useState } from "react";
import { wouteAPI } from "../../api";

export default function MyLikes() {
    const [likes, setLikes] = useState([
        {
            id:1,
            likeImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DUd0CnKIWb4BZjZfw6vcfflkZZfuWgnvnw&usqp=CAU'
        },
        {
            id:2,
            likeImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwhlluLohGUusaZ0RoqQF1CMRxzerX0V3bZfWeFBlD1vWG_qe2zyH3B4u5tAf0KEAF0k&usqp=CAU'
        },
        {
            id:3,
            likeImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2e83jzb8qUMzjKZHralrLTOYhoeOhPmtSFg&usqp=CAU'
        },
        {
            id:4,
            likeImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLINDNYhIBBa5PN91341XLTOcXlMRoFO6ZA&usqp=CAU'
        },
        {
            id:5,
            likeImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLINDNYhIBBa5PN91341XLTOcXlMRoFO6ZA&usqp=CAU'
        },
    ])
    


    // const getLikes =  async () => {
    //     const response = await wouteAPI('/users/{id}/likes', 'GET')
    //     console.log(response);
    //     setLikes(response.data)
    // }

    // useEffect(() => {
    //     getLikes()
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
        {devidePosts(likes).map((row,index) => (
            <article key={index}>
                {[0,1,2].map((i) => 
                row[i] ? (
                    <a href='#1' key={i}>
                        <img src={row[i].likeImg} key={row[i].id} />
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