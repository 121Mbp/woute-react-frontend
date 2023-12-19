import './../../assets/styles/_modalAddFeed.scss'

function ModalAddFeed() {
    return (
        <div className='addFeed'>
            <div className='feedImg'>
                <img src='https://mblogthumb-phinf.pstatic.net/MjAyMjEyMDJfMTAw/MDAxNjY5OTU3MjcwNjEy.QoEE0nDGXuXvNiHaouDC1n77DqXoqXSyiiBiu1fCQbgg.gOTLKvlfynfliHXYjkOfFFSC_OZ9m6yMPEsMrFcDFlYg.JPEG.neweunha/SE-79b660f6-d36d-4cc1-82f7-00f15911e49f.jpg?type=w800' alt='' />
            </div>
            <div className='feedRecord'>
                <div className='feedRecordinner'>
                    <div className='recordImg'>
                        <img src='https://mblogthumb-phinf.pstatic.net/MjAyMjEyMDJfMTI1/MDAxNjY5OTU3MjcyMzI4.epC1KUIijRNriuTqh5T5GrpC-scvglmnQQTFP3_ruGwg.4y_QKRfrC6MkegXwfBlyr-c9sQsOPBHMPHCf4CrL7t4g.JPEG.neweunha/SE-f1763170-ee15-4033-b588-58a8ccb15643.jpg?type=w800' alt='' />
                        <img src='https://mblogthumb-phinf.pstatic.net/MjAyMjEyMDJfMTI1/MDAxNjY5OTU3MjcyMzI4.epC1KUIijRNriuTqh5T5GrpC-scvglmnQQTFP3_ruGwg.4y_QKRfrC6MkegXwfBlyr-c9sQsOPBHMPHCf4CrL7t4g.JPEG.neweunha/SE-f1763170-ee15-4033-b588-58a8ccb15643.jpg?type=w800' alt='' />
                        <img src='https://mblogthumb-phinf.pstatic.net/MjAyMjEyMDJfMTI1/MDAxNjY5OTU3MjcyMzI4.epC1KUIijRNriuTqh5T5GrpC-scvglmnQQTFP3_ruGwg.4y_QKRfrC6MkegXwfBlyr-c9sQsOPBHMPHCf4CrL7t4g.JPEG.neweunha/SE-f1763170-ee15-4033-b588-58a8ccb15643.jpg?type=w800' alt='' />
                        <div className='addIcon'></div>
                        <div className='feedTitle'>
                            <textarea aria-label='타이틀을입력하세요' placeholder='타이틀을입력하세요' ></textarea>
                        </div>
                        <p>#을 이용하여 태그를 사용해보세요 </p>
                    </div>
                    <div className='feedBtn'>
                        <button>피드기록하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAddFeed