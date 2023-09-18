
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import { callAPI } from '../../apiutils/apiUtils';
import { ErrorMsg, SuccessMsg } from '../../Notifications';
import { apiUrls } from '../../apiutils/apiUrls';
import { useNavigate } from 'react-router-dom'

const UserDropDown = () => {
     
    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    
    const handleDrop = () => {

            if(show) setShow(false)
            else setShow(true)
    }
    
  const logout = async () => {
    try {
      const response = await callAPI(apiUrls.logout, {}, 'POST')
      SuccessMsg(response.data.message)
    } catch (e) {
      ErrorMsg(e.message)
    }
  }
    return (

      <div className=' mx-5'>
          <div>
              <button onClick={handleDrop} className={`btn btn-primary rounded-circle `}> {JSON.parse(localStorage.getItem("user")).name.charAt(0).toUpperCase()} </button>
          </div>
          <div className={`${show?"":"d-none"} shadow bg-white rounded text-secondary p-4 dropoverlay m-1`} >
             <NavLink to="/desk/details"  onClick={handleDrop} className='my-2 text-decoration-none d-flex text-secondary align-items-center'><i className='mx-2 fa fa-user'></i> General Details</NavLink>
             <NavLink to="/desk/changepassword"  onClick={handleDrop} className='my-2 text-decoration-none d-flex text-secondary align-items-center'><i className='mx-2 fa fa-pencil'></i> Change Password</NavLink>
             <div  onClick={()=>{
                  logout()
                  localStorage.clear()
                  navigate('/')
             }} role='button' className='my-2 text-decoration-none d-flex text-secondary align-items-center'><i className='mx-2 fa fa-sign-out'></i> Logout</div>
          </div>
      </div>
 
    )
}



export default UserDropDown