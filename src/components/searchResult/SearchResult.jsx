import '../../assets/styles/_searchResult.scss';
import { useEffect, useState } from 'react';

export default function _searchResult() {
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
                        <div className='courseList'>
                            <h2>
                                <div>인기 게시물</div>
                            </h2>
                            <article>
                                <a href='#1'>
                                    <img src="https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTVfMjA0/MDAxNjgxNTMxOTUwNjY5.3aFBdZfQySJSo2TH5mUuRGg8riRIxNMY3P_W9vLHo0Qg.T_gDjf-V2-PyCmm0zklwtcOihGTBR-pA1bCbi6KEBGwg.JPEG.johtaa27/resized_img_3347(1).jpg?type=w800" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                                <a href='#1'>
                                    <img src="https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTVfMjA0/MDAxNjgxNTMxOTUwNjY5.3aFBdZfQySJSo2TH5mUuRGg8riRIxNMY3P_W9vLHo0Qg.T_gDjf-V2-PyCmm0zklwtcOihGTBR-pA1bCbi6KEBGwg.JPEG.johtaa27/resized_img_3347(1).jpg?type=w800" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                                <a href='#1'>
                                    <img src="https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTVfMjA0/MDAxNjgxNTMxOTUwNjY5.3aFBdZfQySJSo2TH5mUuRGg8riRIxNMY3P_W9vLHo0Qg.T_gDjf-V2-PyCmm0zklwtcOihGTBR-pA1bCbi6KEBGwg.JPEG.johtaa27/resized_img_3347(1).jpg?type=w800" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                            </article>
                            <article>
                                <a href='#1'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpA7Ei_T3tgcOgdKGGRSTJftDKfKRLy_q9sg&usqp=CAU" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                                <a href='#1'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpA7Ei_T3tgcOgdKGGRSTJftDKfKRLy_q9sg&usqp=CAU" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                                <a href='#1'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpA7Ei_T3tgcOgdKGGRSTJftDKfKRLy_q9sg&usqp=CAU" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                            </article>
                            <article>
                                <a href='#1'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DUd0CnKIWb4BZjZfw6vcfflkZZfuWgnvnw&usqp=CAU" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                                <a href='#1'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DUd0CnKIWb4BZjZfw6vcfflkZZfuWgnvnw&usqp=CAU" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                                <a href='#1'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DUd0CnKIWb4BZjZfw6vcfflkZZfuWgnvnw&usqp=CAU" alt="" />
                                    <div className='feedHover'>
                                        <ul className='prevInfo'>
                                            <li>1000</li>
                                            <li>500</li>
                                        </ul>
                                    </div>
                                </a>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}