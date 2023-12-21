import Search from './Search'
import Aside from './Aside'
import Post from './Post'

function Main() {
    return (
        <div className='main'>
            <div className='section'>
                <Search />
                <div className='feeds'>
                    <Post id={ 1 } type={ 'course' } />
                    <Post id={ 2 } type={ 'feed' } />
                    <Post id={ 3 } type={ 'course' } />
                </div>
            </div>
            <Aside />
        </div>
    )
}

export default Main