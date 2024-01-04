import { wouteAPI } from '../../api';
import '../../assets/styles/_searchResult.scss';
import { useEffect, useState } from 'react';

export default function _searchResult() {
    const [results, setResults] = useState([
        {
            id:1,
            resultImg :'https://image.blip.kr/v1/file/51e913eef7c7545bffed072eaeda3611'
        },
        {
            id:2,
            resultImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmrDbzeRoOl_Rc_tb0jN1OY-ifCtSflVYbQ&usqp=CAU'
        },
        {
            id:3,
            resultImg :'https://img.sportsworldi.com/content/image/2023/06/08/20230608510214.jpg'
        },
        {
            id:4,
            resultImg :'https://news.nateimg.co.kr/orgImg/iz/2021/11/07/2cdx4f1SaIOm637718401281006314.jpg'
        },
        {
            id:5,
            resultImg :'https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTVfMjA0/MDAxNjgxNTMxOTUwNjY5.3aFBdZfQySJSo2TH5mUuRGg8riRIxNMY3P_W9vLHo0Qg.T_gDjf-V2-PyCmm0zklwtcOihGTBR-pA1bCbi6KEBGwg.JPEG.johtaa27/resized_img_3347(1).jpg?type=w800'
        },
        {
            id:6,
            resultImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpA7Ei_T3tgcOgdKGGRSTJftDKfKRLy_q9sg&usqp=CAU'
        },
        {
            id:7,
            resultImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DUd0CnKIWb4BZjZfw6vcfflkZZfuWgnvnw&usqp=CAU'
        },
        {
            id:8,
            resultImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwhlluLohGUusaZ0RoqQF1CMRxzerX0V3bZfWeFBlD1vWG_qe2zyH3B4u5tAf0KEAF0k&usqp=CAU'
        },
        {
            id:9,
            resultImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2e83jzb8qUMzjKZHralrLTOYhoeOhPmtSFg&usqp=CAU'
        },
        {
            id:10,
            resultImg :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLINDNYhIBBa5PN91341XLTOcXlMRoFO6ZA&usqp=CAU'
        },
    ])

    
    const [scrollY, setScrollY] = useState(0)
    const [scrollActive, setScrollActive] = useState(false)
    
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

    // const getSearch =  async () => {
    //     const response = await wouteAPI('/search/users/nick', 'POST', data)
    //     console.log(response);
    //     setResults(response.data)
    // }

    // useEffect(() => {
    //     getSearch()
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

    return (
        <div className='main'>
            <div className='srMain'>
                <div className='section'>
                    <div className={`search ${ scrollActive ? '__active' : '' }`}>
                        <div className='inner'>
                            <input type='text' name='keyword' placeholder='검색' />
                            <button type='submit'>검색</button>
                        </div>
                    </div>
                    <div className="searchResult">
                        <div className='rsHead'>
                            <div className='rsImg'>
                                <div className='firstImg'>
                                    <img src="https://scontent-ssn1-1.cdninstagram.com/v/t39.30808-6/410947069_377646348012351_137399590208444133_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyIn0&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=VxG2Q5hZmHMAX9gqa4R&edm=AGyKU4gAAAAA&ccb=7-5&ig_cache_key=MzI2MjU2Njk3MjE4ODQwNDY1MA%3D%3D.2-ccb7-5&oh=00_AfCBqQls8cJRERj93E8-qO8eEgIS2Z1PRkpiPClgWRqGBg&oe=658B309B&_nc_sid=2011ad" alt="" />
                                </div>
                            </div>
                            <div className='rsInfoWrap'>
                                <div className='rsInfo'>
                                    <div className='keyword'>
                                        <span>#검색어</span>
                                    </div>
                                    <div className='amount'>
                                        게시물
                                        <span>500만</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='searchList'>
                            <h2>
                                <div>인기 게시물</div>
                            </h2>
                            {devidePosts(results).map((row,index) => (
                                <article key={index}>
                                    {[0,1,2].map((i) => 
                                    row[i] ? (
                                        <a href='#1' key={i}>
                                            <img src={row[i].resultImg} key={row[i].id} />
                                            <div className='feedHover'>
                                                <ul className='prevInfo'>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}