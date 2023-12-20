import Search from './Search'
import Aside from './Aside'
import Post from './Post'

function Main() {
    return (
        <div className='main'>
            <div className='section'>
                <Search />
                <div className='feeds'>
                    <Post type={ 'course' } />
                    <Post type={ 'feed' } />
                    <Post type={ 'course' } />
                </div>
            </div>
            <Aside />
        </div>
    )
}

export default Main