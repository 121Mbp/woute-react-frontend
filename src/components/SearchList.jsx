import { Link } from "react-router-dom";
import '../assets/styles/_searchList.scss';

export default function SearchList({searchList, showList}) {
    const users = searchList.users
    const tags = searchList.tags
    return(
        <>
        <div className={`keywordList ${showList ? '' : 'd-none'}`}>
            <div className='title' >검색결과</div>
            <ul>
                {(users || []).map(item => {
                    return(
                        <Link to={item.url}
                        >
                            <li key={item.id}>
                                <div className='user'>
                                    {/* <i style={{backgroundImage: `url(${item.profileImg})`}}></i> */}
                                    <img src={`${process.env.REACT_APP_IMAGE_PATH}${item.profileImg}`} alt="" />
                                </div>
                                <div className='activity'>
                                    <strong>{item.nickName}</strong>
                                </div>
                            </li>
                        </Link>
                    )
                })}
                {(tags || []).map(item => (
                    <li className="tagList">
                        <Link 
                        to={`/search/tags/${item.words.replace('#', '')}`}
                        >
                            <div className='activity'>
                                <strong>{item.words}</strong>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}