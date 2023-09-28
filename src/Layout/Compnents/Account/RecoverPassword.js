import React, { useState } from 'react'
import { callAPI, callAPIWithoutAuth } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
const RecoverPassword = () => {
    const [value, setValue] = useState({})
    const [email, setEmail] = useState({})
    const [showform, setShowForm] = useState(false)
    const [toggleview, setToggleView] = useState(false)
    const [ctoggleview, setcToggleView] = useState(false)
    const [ptoggleview, setpToggleView] = useState(false)
  
 
  
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
    const sendLink = async () => {
      try{
        const response = await callAPIWithoutAuth(apiUrls.sendemail, {}, 'POST', email)
        console.log(response)
        if(response.data.isSuccess){
          setShowForm(true)
        }
      }catch(e){

      }
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
       <h3> Recover Password</h3>
      </div> 
      <div className="mb-3 input-group ">
            <input className='form-control ' onChange={(e)=>{
              setEmail(e.target.value)
            }} name='email' placeholder='enter email'></input>
            <button onClick={()=>{
              sendLink()
            }} className='btn btn-info text-white'>Send Link</button>
              </div>
         <form  onSubmit={handleSubmit} className={`img-thumbnail p-5 ${showform?"":"d-none"}`} >
              
             
    
              <div >
              <div className="mb-3 input-group">
                <input className='form-control ' onChange={handleChange} name='password' type={toggleview ? "text" : "password"} placeholder='New password'></input>
                <span className='mx-1' onClick={() => { ptoggle() }}> {ptoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
              </div>
        
  
              <div className="mb-3 input-group">
                <input className='form-control ' onChange={handleChange} name='password_confirmation' type={ctoggleview ? "text" : "password"} placeholder='Confirm Password'></input>
                <span className='mx-1' onClick={() => { ctoggle() }}> {ctoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
              </div>
              </div>
     
         <button type='submit' className='btn btn-info text-white px-3 form-control'> Change Password</button>
          
    
      </form>
      </div>)
}

export default RecoverPassword