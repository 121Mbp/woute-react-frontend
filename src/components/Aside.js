import AsideList from './AsideList'

function Aside() {
    return (
        <div className='aside'>
            <div className='inner'>
                <h4>좋아요 순위</h4>
                <ul>
                    <AsideList />
                    <AsideList />
                    <AsideList />
                </ul>
            </div>
        </div>
    )
}

export default Aside