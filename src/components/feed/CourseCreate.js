import { useEffect, useState, useRef, createRef } from 'react'
import { Link } from 'react-router-dom'
import { Map, MapMarker, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk'
import '../../assets/styles/_trip.scss'
import Loader from '../Loader'
import pin from './../../assets/images/marker.png'
import one from './../../assets/images/one.png'
import two from './../../assets/images/two.png'
import three from './../../assets/images/three.png'
import four from './../../assets/images/four.png'
import five from './../../assets/images/five.png'

const { kakao } = window
function CourseCreate() {
    const mapRef = useRef()
    const placesListRef = useRef()
    const scrollRef = useRef()
    const courseListRef = createRef()
    const dragItem = useRef()
    const dropItem = useRef()
    const searchFocusInput = useRef()
    const [active, setActive] = useState(false)
    const [idCode, setIdCode] = useState('')
    const [init, setInit] =useState(false)
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [path, setPath] = useState([])
    const [keyword, setKeword] = useState('')
    const [store, setStore] = useState([])
    const [map, setMap] = useState()
    const [page, setPage] = useState()
    const [spot, setSpot] = useState([])
    const [style, setStyle] = useState({ width: '100%', height: '100%'})
    const [location, setLocation] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true
    })
    
    const ps = new kakao.maps.services.Places()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setTimeout(() => {
                        setLocation((prev) => ({
                            ...prev,
                            center: {
                                lat: position.coords.latitude, 
                                lng: position.coords.longitude,
                            },
                            isLoading: false,
                        }))
                    }, 1600)
                    setPath([{ 
                        lat: position.coords.latitude, 
                        lng: position.coords.longitude
                    }])
                },
                (err) => {
                    setLocation((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }))
                }
            )
        } else {
            setLocation((prev) => ({
                ...prev,
                errMsg: 'geolocation을 사용할수 없어요..',
                isLoading: false,
            }))
        }
    }, [])

    const searchPlaces = () => {
        if(!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요.')
            return false
        } 
        ps.keywordSearch(keyword, placesSearchCB)
    }

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds()
            setStore(data)
            // console.log(data)
            setPage(pagination)
            let markers = []

            for (let i = 0; i < data.length; i++) {
                markers.push({
                    place_name: data[i].place_name,
                    position: { lat: data[i].y, lng: data[i].x },
                    category_group_name: data[i].category_group_name,
                    phone: data[i].phone,
                    road_address_name: data[i].road_address_name,
                    place_url: data[i].place_url,
                    src: `${ pin }`,
                    size: { width: 24, height: 35 }

                })
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }
            setMarkers(markers)
            map.setBounds(bounds)
            setTimeout(()=>{
                setActive(true)
                placesListRef.current.scrollTo({ top: 0, hefavior: 'smooth' })
            }, 10)
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.')
            return
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.')
            return
        }
    }

    const searchInit = () => {
        setKeword('')
        setInit(false)
        setActive(false)
        setMarkers([])
        setStore([])
        if(spot.length === 0) {
            return
        }
        spotMarker()
    }   

    const handleSearch = e => {
        setKeword(e.target.value)
        if(e.target.value.length === 0) {
            setMarkers([])
            setStore([])
            setActive(false)
            setInit(false)
            spotMarker()
            return;
        } 
        setInit(true)
    }

    const handleHover = item => {
        setInfo(true)
        setIdCode(item.id)
        const bounds = new kakao.maps.LatLngBounds()
        const marker = new kakao.maps.LatLng(item.y, item.x)
        const position = bounds.extend(marker)
        map.setBounds(position)
    }

    const handleKeyEvent = (e) => {
        if(e.key === 'Enter') {
            searchPlaces()
        }
    }

    const handleSave = item => {
        if(spot.filter((e) => { return e.id === item.id }).length > 0) {
            alert('이미 등록된 장소 입니다.')
            return 
        } 
        if(spot.length === 0) {
            setStyle({ width: '100%', height: '50%'})
            setTimeout(()=>{ handleHover(item) }, 100)
        }
        if(spot.length > 4) {
            alert('장소는 최대 5개 까지 등록이 가능합니다.')
            return
        }
        setSpot((prevSpot) => [
            ...prevSpot,
            {
                id: item.id,
                place_name: item.place_name,
                phone: item.phone,
                category_group_name: item.category_group_name,
                category_name: item.category_name,
                road_address_name: item.road_address_name,
                place_url: item.place_url,
                x: item.x,
                y: item.y,
            },
        ])
    }

    const handleDelete = item => {
        setSpot((prevSpot) => {
            const updatedSpot = prevSpot.filter((s) => s.id !== item.id)            
            spotMarker(updatedSpot)
            return updatedSpot
        })
    }

    useEffect(()=>{
        const map = mapRef.current
        if(map) map.relayout()
        if(active) {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        } else {
            courseListRef.current?.scrollTo({ top: 0, hefavior: 'smooth' })
        }
    }, [ style, spot, path ])

    const dragStart = (e, position) => {
        dragItem.current = position
    }

    const dragEnter = (e, position) => {
        dropItem.current = position
    }

    const drop = e => {
        const arr = [...spot];
        const dragItemList = arr[dragItem.current]
        arr.splice(dragItem.current, 1)
        arr.splice(dropItem.current, 0, dragItemList)
        dragItem.current = null
        dropItem.current = null
        setSpot(arr)
        spotMarker(arr)
    }

    const spotMarker = us => {
        if(us === undefined) us = spot
        if(us.length === 0) {
            setStyle({ width: '100%', height: '100%'})
            setInfo(false)
            searchInit()
            return
        }
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []
        
        for (let i = 0; i < us.length; i++) {
            let orders = null
            if(i === 0) orders = `${ one }`
            if(i === 1) orders = `${ two }`
            if(i === 2) orders = `${ three }`
            if(i === 3) orders = `${ four }`
            if(i === 4) orders = `${ five }`
            markers.push({
                place_name: us[i].place_name,
                position: { lat: us[i].y, lng: us[i].x },
                category_group_name: us[i].category_group_name,
                phone: us[i].phone,
                place_url: us[i].place_url,
                src: orders,
                size: { width: 24, height: 24 }
            })
            bounds.extend(new kakao.maps.LatLng(us[i].y, us[i].x))
        }

        let path = []

        for (let i = 0; i < us.length; i++) {
            path.push({ lat: us[i].y, lng: us[i].x })
        }
        
        setPath(path)
        setMarkers(markers)
        setTimeout(()=>{ map.setBounds(bounds) }, 10)
    }

    const postSubmit = e => {
        e.preventDefault()
        console.log(spot)
    }

    return (
        <>
            {
                !location.isLoading ? (
                    <div className='trip'>
                        <Map 
                            center={ location.center }
                            style={ style }
                            level={ 4 }
                            onCreate={ setMap }
                            ref={ mapRef }
                        >
                            <div className={`placesSearch ${active ? 'active' : ''}`}>
                                <input type='text' id='keyword' ref={ searchFocusInput } onChange={ handleSearch } onKeyPress={ handleKeyEvent } value={ keyword } placeholder='장소 검색' />
                                <button type='submit' onClick={ searchPlaces }>버튼</button>
                                { init && <button type='button' onClick={ searchInit }>삭제</button> }
                                
                            </div>
                            <div className='placesList' ref={ placesListRef }>
                                <ul>
                                    {
                                        store.map((item, i) => (
                                            <li key={ item.id } className={ idCode === item.id ? 'on' : '' }>
                                                <p onClick={()=>handleHover(item)} onMouseLeave={()=>setInfo(false)}>
                                                    <strong>{ item.place_name }</strong>
                                                    <span> { item.category_name } </span>
                                                    <span> { item.road_address_name } </span>
                                                </p>
                                                <button onClick={()=>handleSave(item) }>선택</button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <ul className='placePage'>
                                {
                                    Array(page?.last).fill(0).map((_, i) => (
                                        <li key={ i } onClick={()=>page?.gotoPage(i + 1)} className={ (i + 1) === page?.current ? 'on' : ''}>
                                            { i + 1 }
                                        </li>
                                    ))
                                }
                            </ul>
                            {
                                markers.map((marker, i) => (
                                    <>
                                    <MapMarker
                                    key={`marker-${marker.place_name}-${marker.position.lat},${marker.position.lng}`}
                                    position={ marker.position }
                                    image={{
                                        src: marker.src,//`${ pin }`,
                                        size: marker.size//{ width: 24, height: 35 },
                                    }}
                                    />
                                    {info && (
                                    <CustomOverlayMap 
                                        key={ `${marker.position.lat},${marker.position.lng}` }
                                        position={ marker.position }
                                        yAnchor={ 1 }
                                        >
                                        <div className='overlay'>
                                            <strong>{ marker.place_name }</strong>
                                            <span>{ marker.category_group_name }</span>
                                            <span>{ marker.phone }</span>
                                            <Link to={ marker.place_url } target='_blank'>홈페이지</Link>
                                        </div>
                                    </CustomOverlayMap>
                                    )}
                                    </>
                                ))
                            }
                            <Polyline
                                path={ path }
                                strokeWeight={ 3 }
                                strokeColor={ '#595757' }
                                strokeOpacity={ 0.7 }
                                strokeStyle={ 'dash' }  
                            />
                        </Map>
                        {
                            spot.length > 0 ? (
                                <div className='write'>
                                    <div className='courseList'>
                                        <ul ref={ courseListRef }>
                                            {
                                                spot?.map((item, i) => (
                                                    <li 
                                                        key={ item.id }
                                                        draggable
                                                        onDragStart={(e)=>dragStart(e, i)}
                                                        onDragEnter={(e)=>dragEnter(e, i)}
                                                        onDragEnd={ drop }
                                                        onDragOver={(e)=>e.preventDefault()}
                                                        onClick={()=>handleHover(item)} 
                                                        onMouseLeave={()=>setInfo(false)}
                                                        ref={ scrollRef }
                                                    >
                                                        <strong>{ item.place_name }</strong>
                                                        <span>{ item.category_group_name }</span>
                                                        <span>{ item.road_address_name }</span>
                                                        <button onClick={()=>handleDelete(item)}>삭제</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className='publish'>
                                        <input type='text' name='title' placeholder='타이틀을 입력하세요.' />
                                        <textarea name='content' placeholder='#을 이용하여 태그를 사용해 보세요.'></textarea>
                                        <ul className='attach'>
                                            <li style={{ backgroundImage: 'url(https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/294403150_7844086842331965_1581287340140642271_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zhI9ixwvdkAAX-U_LbJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB2CwNh8lAx8cc3tCuDTNc-33IFxcxWdPUfgnfybwMpyA&oe=65808F4D)'}}>
                                                <button>삭제</button>
                                            </li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                        </ul>
                                        <button type='submit' onClick={ postSubmit }>코스 기록하기</button>
                                    </div>
                                </div>
                            ) : ''
                        }                        
                    </div>
                ) : <Loader />
            }
            
        </>
    )
}

export default CourseCreate