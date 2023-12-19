import { useEffect, useState } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'

const { kakao } = window
function CourseView() {
    const [markers, setMarkers] = useState([])
    const positions = [
        {
            title: '카카오',
            latlng: { lat: 33.450705, lng: 126.570677 },
            src: 'https://cdn.icon-icons.com/icons2/2249/PNG/512/numeric_box_outline_icon_139017.png',
        },
        {
            
            title: '생태연못',
            latlng: { lat: 33.450936, lng: 126.569477 },
            src: 'https://cdn.icon-icons.com/icons2/2249/PNG/512/numeric_box_outline_icon_139333.png',
        },
        {
            
            title: '텃밭',
            latlng: { lat: 33.450879, lng: 126.56994 },
            src: 'https://cdn.icon-icons.com/icons2/2249/PNG/512/numeric_box_outline_icon_139330.png',
        },
        {
            
            title: '근린공원',
            latlng: { lat: 33.451393, lng: 126.570738 },
            src: 'https://cdn.icon-icons.com/icons2/2249/PNG/512/numeric_box_outline_icon_139327.png',
        },
    ]

    useEffect(() => {
        let markers = []

        for (let i = 0; i < positions.length; i++) {
            console.log(positions)
            markers.push({ lat: positions[i].latlng.lat, lng: positions[i].latlng.lng })
        }
        setMarkers(markers)
    }, [])

    return (
        <>
            <Map 
                center={{
                // 지도의 중심좌표
                    lat: 33.450701,
                    lng: 126.570667,
                }}
                style={{
                // 지도의 크기
                    width: '100%',
                    height: '450px',
                }}
                level={3} // 지도의 확대 레벨
            >
                <Polyline
                    path={ markers }
                    strokeWeight={ 2 }
                    strokeColor={ '#595757' } 
                    strokeOpacity={ 0.7 } 
                    strokeStyle={ 'longdash' } 
                />
                { 
                    positions.map((item, index) => (
                        <MapMarker
                            key={`${item.title}-${item.latlng}`}
                            position={ item.latlng } // 마커를 표시할 위치
                            image={{
                                src: `${ item.src }`,
                                size: {
                                    width: 36,
                                    height: 36
                                },
                            }}
                            title={ item.title }
                        />
                    ))
                }
            </Map>
        </>
    )
}

export default CourseView