import { Link } from 'react-router-dom'

function AsideList() {
    return (
        <li>
            <Link to='/'>
                <div className='upper'>
                    <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>mark_ju
                </div>
                <div className='middle'>
                    <img src='https://cdn.ksilbo.co.kr/news/photo/202312/986830_573500_2236.jpg' alt='' />
                    <div className='description'>
                        <p>제목제목제목제목제목제목제목제목제목</p>
                        <span>#맛집</span><span>#홍대</span><span>#해시태그</span>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default AsideList