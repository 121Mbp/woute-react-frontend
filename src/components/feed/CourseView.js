import { useEffect, useState } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import './../../assets/styles/_trip.scss'
import one from './../../assets/images/one.png'
import two from './../../assets/images/two.png'
import three from './../../assets/images/three.png'
import four from './../../assets/images/four.png'
import five from './../../assets/images/five.png'

const spot = [
    {
        "id": "18133518",
        "place_name": "CGV 여의도",
        "phone": "1544-1122",
        "category_group_name": "문화시설",
        "category_name": "문화,예술 > 영화,영상 > 영화관 > CGV",
        "road_address_name": "서울 영등포구 국제금융로 10",
        "place_url": "http://place.map.kakao.com/18133518",
        "x": "126.92558188499092",
        "y": "37.5256928036018",
        "position": {
            "lat": "37.5256928036018",
            "lng": "126.92558188499092"
        } 
    },
    {
        "id": "8000376",
        "place_name": "CGV 영등포",
        "phone": "1544-1122",
        "category_group_name": "문화시설",
        "category_name": "문화,예술 > 영화,영상 > 영화관 > CGV",
        "road_address_name": "서울 영등포구 영중로 15",
        "place_url": "http://place.map.kakao.com/8000376",
        "x": "126.902756404631",
        "y": "37.5175176380239",
        "position": {
            "lat": "37.5175176380239",
            "lng": "126.902756404631"
        } 
    },
    {
        "id": "8000548",
        "place_name": "CGV 인천",
        "phone": "1544-1122",
        "category_group_name": "문화시설",
        "category_name": "문화,예술 > 영화,영상 > 영화관 > CGV",
        "road_address_name": "인천 남동구 예술로 198",
        "place_url": "http://place.map.kakao.com/8000548",
        "x": "126.702048352406",
        "y": "37.4514120781238",
        "position": {
            "lat": "37.4514120781238",
            "lng": "126.702048352406"
        } 
    },
    {
        "id": "27307026",
        "place_name": "CGV 피카디리1958",
        "phone": "1544-1122",
        "category_group_name": "문화시설",
        "category_name": "문화,예술 > 영화,영상 > 영화관 > CGV",
        "road_address_name": "서울 종로구 돈화문로5가길 1",
        "place_url": "http://place.map.kakao.com/27307026",
        "x": "126.99131327152529",
        "y": "37.570993818720254",
        "position": {
            "lat": "37.570993818720254",
            "lng": "126.99131327152529"
        } 
    },
    {
        "id": "7973004",
        "place_name": "CGV씨네드쉐프 압구정",
        "phone": "02-3446-0541",
        "category_group_name": "문화시설",
        "category_name": "문화,예술 > 영화,영상 > 영화관 > CGV",
        "road_address_name": "서울 강남구 압구정로30길 45",
        "place_url": "http://place.map.kakao.com/7973004",
        "x": "127.02927482937886",
        "y": "37.5243205724172",
        "position": {
            "lat": "37.5243205724172",
            "lng": "127.02927482937886"
        } 
    }
]

const { kakao } = window
function CourseView() {
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        if (!map) return
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (let i = 0; i < spot.length; i++) {
            let orders = null
            if(i === 0) orders = `${ one }`
            if(i === 1) orders = `${ two }`
            if(i === 2) orders = `${ three }`
            if(i === 3) orders = `${ four }`
            if(i === 4) orders = `${ five }`
            markers.push({ lat: spot[i].y, lng: spot[i].x })
            spot[i].position = { lat: spot[i].y, lng: spot[i].x } 
            spot[i].src = orders
            bounds.extend(new kakao.maps.LatLng(spot[i].y, spot[i].x))
        }

        setData(spot)
        setMarkers(markers)
        setTimeout(()=>{ map.setBounds(bounds) }, 10)
    }, [ map ])

    return (
        <>
        <div className='trip'>
            <div className='view'>
                <div className='service'>
                    <div className='courseRoot'>
                        <div className='maps'>
                            <Map 
                                center={{ lat: 33.450701, lng: 126.570667 }}
                                style={{ width: '100%', height: '100%' }}
                                level={ 4 }
                                onCreate={ setMap }
                            >
                                <Polyline
                                    path={ markers }
                                    strokeWeight={ 3 }
                                    strokeColor={ '#595757' } 
                                    strokeOpacity={ 0.7 } 
                                    strokeStyle={ 'dash' } 
                                />
                                { 
                                    data?.map((item, i) => (
                                        <MapMarker
                                            key={`${item.id}-${item.position}`}
                                            position={ item.position }
                                            image={{
                                                src: `${ item.src }`,
                                                size: { width: 22, height: 22 },
                                            }}
                                            title={ item.place_name }
                                        />
                                    ))
                                }
                            </Map>
                        </div>
                        <div className='orderList'>
                            <ul>
                                {
                                    data?.map((item, i) => (
                                        <li key={ item.id }>
                                            <strong>{ item.place_name }</strong>
                                            <span>{ item.category_group_name }</span>
                                            <span>{ item.road_address_name }</span>
                                            
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className=''>

                    </div>
                </div>
                <div className='inform'>

                </div>
            </div>
        </div>
            
        </>
    )
}

export default CourseView