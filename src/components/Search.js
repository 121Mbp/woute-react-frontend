import { useNavigate } from "react-router";
import { wouteAPI } from "../api"
import { useRef, useState } from "react";
import SearchList from "./SearchList";

function Search() {
    const [keyword, setKeyword] = useState('')
    const [searchList, setSearchList] = useState([])
    const [showList, setShowList] = useState(false)
    const searchInput = useRef()
    
    
    const search = async() => {
        if(searchInput.current.selectionStart == 0) {
            setShowList(false)
        } else {
            setShowList(true)
            try {
                const response = await wouteAPI('/search', 'POST', {keyword:searchInput.current.value})
                console.log(response.data);
                setSearchList(response.data)
                console.log('검색성공');
            } catch (error) {
                console.log('검색실패');
                
            }
        }
    }
    

    
  const sendEnter = (e) => {
    if(e.key === 'Enter') {
        search()
    }
  }
    
    return (
        <>
        <div className='search'>
            <div className='inner'>
                <input type='text'
                name='keyword' 
                placeholder='검색' 
                onChange={search}
                ref={searchInput}
                onKeyDown={sendEnter}
                />
                <button 
                type='submit' 
                onClick={search}
                >검색</button>
            </div>
            <SearchList showList={showList} searchList={searchList}/>
        </div>
        </>
    )
}

export default Search