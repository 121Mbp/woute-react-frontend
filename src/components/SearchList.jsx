import { Link } from "react-router-dom";
import '../assets/styles/_searchList.scss';

export default function SearchList() {
    return(
        <>
        {/* <div className="searchList"> */}
            <div className='title' >검색결과</div>
            <ul>
                {/* {notis.map(item => {
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
                })} */}
                <li>
                    <Link>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <div className='user'>
                            <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>
                        </div>
                        <div className='activity'>
                            <strong>woute</strong>님이 회원님을 팔로우하기 시작했습니다.<span>1일</span>
                        </div>
                    </Link>
                </li>
            </ul>
        {/* </div> */}
        </>
    )
}