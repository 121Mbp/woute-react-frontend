import { Link, NavLink } from 'react-router-dom'
import '../../assets/styles/_modal.scss'

function Modal() {
    return (
        <div className='modal'>
            <div className='inner'>
                <div>

                </div>
                <div>

                </div>
                <Link to='/' className='close'>닫기</Link>
            </div>
        </div>
    )
}

export default Modal