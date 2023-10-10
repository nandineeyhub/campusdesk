import React, { useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'

const ChangePassword = () => {
  const [value, setValue] = useState({})
  const [toggleview, setToggleView] = useState(false)
  const [ctoggleview, setcToggleView] = useState(false)
  const [ptoggleview, setpToggleView] = useState(false)

  const toggle = () => {
    if (toggleview) setToggleView(false)
    else setToggleView(true)
  }

  const ptoggle = () => {
    if (ptoggleview) setToggleView(false)
    else setpToggleView(true)
  }
  const ctoggle = () => {
    if (ctoggleview) setcToggleView(false)
    else setcToggleView(true)
  }

  const handleChange = (e) => {
  
    setValue((val) => { return { ...val, [e.target.name]: e.target.value } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    changePassword()
  }

  const changePassword = async () => {
     try{
      const response = await callAPI(apiUrls.changepassword, {}, 'POST', value)
      if(response.data.isSuccess){
        SuccessMsg(response.data.message)
      }else{
        ErrorMsg(response.data.message)
      }
     }catch(e){
        ErrorMsg(e.message)
     }
  }
  return (
    <div className='container-lg w-50 '>
    <div className='text-secondary py-3 App'>
     <h3> Change Password</h3>
    </div> 
   
    <form onSubmit={handleSubmit} className=''>
    <div className="mb-3 input-group">
              <input className='form-control ' onChange={handleChange} name='currentPassword' type={toggleview ? "text" : "password"} placeholder='Current password'></input>
              <span className='mx-1' onClick={() => { toggle() }}> {toggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
            </div>
  
            <div className="mb-3 input-group">
              <input className='form-control ' onChange={handleChange} name='password' type={toggleview ? "text" : "password"} placeholder='New password'></input>
              <span className='mx-1' onClick={() => { ptoggle() }}> {ptoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
            </div>
      

            <div className="mb-3 input-group">
              <input className='form-control ' onChange={handleChange} name='password_confirmation' type={ctoggleview ? "text" : "password"} placeholder='Confirm Password'></input>
              <span className='mx-1' onClick={() => { ctoggle() }}> {ctoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
            </div>
   
       <button type='submit' className='btn btn-info text-white px-3 form-control'> Change Password</button>
        
  
    </form>
    </div>
  )
}

export default ChangePassword