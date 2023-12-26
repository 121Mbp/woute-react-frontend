import '../../assets/styles/_courseList.scss';
import { useEffect, useState } from 'react';

export default function CourseLlist() {
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
            <div className='clMain'>
                <div className='section'>
                    <div className={`search ${ scrollActive ? '__active' : '' }`}>
                        <div className='inner'>
                            <input type='text' name='keyword' placeholder='검색' />
                            <button type='submit'>검색</button>
                        </div>
                    </div>
                    <div className='courseList'>
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
    )
}