function Search() {
    return (
        <div className='search'>
            <div className='inner'>
                <input type='text' name='keyword' placeholder='검색' />
                <button type='submit'>검색</button>
            </div>
        </div>
    )
}

export default Search