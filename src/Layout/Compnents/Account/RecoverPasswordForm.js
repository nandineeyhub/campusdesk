
import React, { useState } from 'react'
import { callAPI, callAPIWithoutAuth } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate, useParams } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'
import { useEffect } from 'react'

const RecoverPasswordForm = () => {
    const [value, setValue] = useState({})

    const [ctoggleview, setcToggleView] = useState(false)
    const [ptoggleview, setpToggleView] = useState(false)
    const [,forceUpdate] = useState() 
    const [isSubmitting,setIsSubmitting]=useState(false); 
    const simpleValidator = useRef(new SimpleReactValidator());
 
    const navigate = useNavigate()
   const {token} = useParams()

    const ptoggle = () => {
      if (ptoggleview) setpToggleView(false)
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
     
      const formValid = simpleValidator.current.allValid() 
      if(!formValid){
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
      else{
      
        changePassword()
        setIsSubmitting(true)
      }
    }

    const changePassword = async () => {
        try{
         const response = await callAPIWithoutAuth(apiUrls.resetpassword, {}, 'POST', value)
         setIsSubmitting(false)
         if(response.data.isSuccess){
           SuccessMsg(response.data.message)
           navigate('/login')
         }else{
           ErrorMsg(response.data.message)
         }
        }catch(e){
           ErrorMsg(e.message)
        }
     }
     useEffect(()=>{   setValue((val) => { return { ...val, ["token"]: token } })
    },[token])
  return (
   <div className='d-flex justify-content-center p-5 container-lg'> 
     <form  onSubmit={handleSubmit} className={`img-thumbnail p-5 w-50 `} >
     <div className='text-secondary App'>
       <h4> Recover Password</h4>
      </div> 
             
    
              <div >
             <div className='mb-3'>
             <div className=" input-group">
                <input className='form-control ' onChange={handleChange} name='password' type={ptoggleview ? "text" : "password"} placeholder='New password'></input>
                <span className='mx-1' onClick={() => { ptoggle() }}> {ptoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
              </div>
              <span className="requireds"> {simpleValidator.current.message('password', value.password, 'required')}</span>
             </div>
        
  
              <div className='mb-3'>
              <div className=" input-group">
                <input className='form-control ' onChange={handleChange} name='password_confirmation' type={ctoggleview ? "text" : "password"} placeholder='Confirm Password'></input>
                <span className='mx-1' onClick={() => { ctoggle() }}> {ctoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
              </div>
              <span className="requireds"> {simpleValidator.current.message('confirm password', value.password_confirmation, 'required')}</span>
              </div>
             
              </div>
     
         <button disabled={isSubmitting} type='submit' className='btn btn-info text-white px-3 form-control'> Change Password</button>
          
    
      </form></div>
  )
}

export default RecoverPasswordForm