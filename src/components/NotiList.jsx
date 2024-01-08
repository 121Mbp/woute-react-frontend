import { useEffect, useState } from "react"
import { wouteAPI } from "../api"
import { Link } from "react-router-dom"
import moment from "moment"

export default function NotiList({data}) {
    const [notis, setNotis] = useState([])
    const currentId = localStorage.getItem('id')
    console.log('data : ' + data);
    
    const getNoti = async () => {
        const response = await wouteAPI(`/noti/${currentId}`, 'GET') 
        console.log(response.data);
        setNotis(response.data)
    }
    

    useEffect(() => {
        getNoti()
    },[data])

    return (
            <>
            <div className='title'>알림</div>
            <ul>
                {notis.map(item => {
                    return(
                        <li key={item.id}>
                            <div className='user'>
                                <Link to={item.senderUrl}>
                                    <i style={{backgroundImage: `url(${item.profileImg})`}}></i>
                                </Link>
                            </div>
                            <div className='activity'>
                                <Link to={item.senderUrl}>
                                <strong>{item.nickname}</strong>
                                </Link>
                                {item.content}
                                <span>{moment(item.createdAt).fromNow()}</span>
                            </div>
                        </li>
                    )
                })}
                {/* <li key={item.id}>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>{item.content}<span>1일</span>
                    </div>
                    <button className='follow'>팔로우</button>
                </li> */}
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                    </div>
                    <button className='follow' disabled={ true }>팔로잉</button>
                </li>
                {/* <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 댓글을 남겼습니다: 맛있게 생겼네요🤭<span>1일</span>
                    </div>
                </li>
                <li>
                    <div className='user'>
                        <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                    </div>
                    <div className='activity'>
                        <strong>woute</strong>님이 회원님의 게시물을 좋아합니다.<span>1일</span>
                    </div>
                </li> */}
            </ul>
        </>
    )
}