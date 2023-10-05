import React, { useState } from 'react'
import { callAPI, callAPIWithoutAuth } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const RecoverPassword = () => {
  
    const [email, setEmail] = useState({})
    const [,forceUpdate] = useState() 
    const [isSubmitting,setIsSubmitting]=useState(false); 
    const simpleValidator = useRef(new SimpleReactValidator());
    const navigate = useNavigate()
    const sendLink = async () => {
      try{
        const response = await callAPIWithoutAuth(apiUrls.sendemail, {}, 'POST', email)
        setIsSubmitting(false)
        console.log(response)
        if(response.data.isSuccess){
          SuccessMsg(response.data.message)
        } else ErrorMsg(response.data.message)
      } catch(e){
        ErrorMsg(e.message)
      }
    }
 
   const handleSubmit = (e) => {
    e.preventDefault()
    const formValid = simpleValidator.current.allValid() 
    if(!formValid){
      simpleValidator.current.showMessages();
      forceUpdate(1);
    } else {
      sendLink()
      setIsSubmitting(true)
    }
   }
    return (
      <div className='container-lg w-50 '>
      <div className='text-secondary py-3 App'>
       <h3> Recover Password</h3>
      </div> 
      <form onSubmit={handleSubmit}>
      <div className="mb-3 ">
            <div className=''>
            <input className='form-control ' onChange={(e)=>{
              setEmail((val)=>{return {...val, [e.target.name]:e.target.value}})
            }} name='email' placeholder='enter email'></input>
            <span className="requireds"> {simpleValidator.current.message('email', email.email, 'required|email')}</span>
            </div>
            <button disabled={isSubmitting} type='submit' className='my-3 btn btn-info text-white'>Send Link</button>
            <button type='button' onClick={()=>{navigate('/')}} className='my-3 mx-2 btn btn-secondary text-white'>Cancel</button>
              </div>
            
      </form>
        
      </div>)
}

export default RecoverPassword