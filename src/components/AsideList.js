import { Link } from 'react-router-dom'

function AsideList() {
    return (
        <li>
            <Link to='/'>
                <div className='upper'>
                    <i style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)'}}></i>mark_ju
                </div>
                <div className='middle'>
                    <img src='https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/294403150_7844086842331965_1581287340140642271_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zhI9ixwvdkAAX-U_LbJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB2CwNh8lAx8cc3tCuDTNc-33IFxcxWdPUfgnfybwMpyA&oe=65808F4D' alt='' />
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