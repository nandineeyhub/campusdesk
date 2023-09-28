import React, { useEffect, useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiLoader } from '../../../Helper/common'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'

const EditLead = () => {

  const [value, setValue] = useState({})
  const [loader, setloader] = useState(false)
  const [isSubmitting, setIsSubmitting]= useState(false)
  const [,forceUpdate] = useState()
  const {id} = useParams()
  const simpleValidator = useRef(new SimpleReactValidator());

  const navigate = useNavigate()

  const handleChange = (e) => {
    setValue((val)=>{return {...val, [e.target.name]:e.target.value}})
}

const handleSubmit = (e) =>{
  e.preventDefault()
  const formValid = simpleValidator.current.allValid() 
  if(!formValid){
    simpleValidator.current.showMessages();
    forceUpdate(1);
  }
  else { editenquiry() 
  setIsSubmitting(true)}
}

const editenquiry = async () => {
  try{
    const response = await callAPI(apiUrls.updateenquiry+`/${id}`, {} , 'PATCH', value)
    setIsSubmitting(false)
    if(response.data.isSuccess){
       SuccessMsg(response.data.message)
       navigate('/desk/enquiry')
    } else {
      ErrorMsg(response.data.message)
    }
   } catch(e){
      ErrorMsg(e.errors)
   }
}

const getenquiry = async () => {
  setloader(true)
  try{
    const response = await callAPI(apiUrls.getenquirybyid+`/${id}`, {} , 'GET', value)
    setloader(false)
    if(response.data.isSuccess){
      setValue(response.data.data)
    } else {
      ErrorMsg(response.data.message)
    }
   } catch(e){
      ErrorMsg(e.errors)
      setloader(false)
   }
}

useEffect(()=>{getenquiry()},[])

  return (
    <div className='container-lg w-100 '>
    <div className='text-secondary py-3 App'>
 <h3>Update Enquiry</h3>
</div> 
{loader && <ApiLoader/>}
<form onSubmit={handleSubmit}>

    <div className='row img-thumbnail p-3'> <div className=" col-md-4 mb-3">
    <label for="name" className="required">Name</label>
    <input value={value.name} onChange={handleChange} className='form-control' name='name' type="text" placeholder='Name'></input>
    <span className="requireds"> {simpleValidator.current.message('name', value.name, 'required')}</span>
  
  </div>

  <div className=" col-md-4 mb-3">
    <label for="name" className="required">Phone</label>
    <input value={value.phone} onChange={handleChange} className='form-control' name='phone'  type="text" placeholder='Phone number'></input>
    <span className="requireds"> {simpleValidator.current.message('phone number', value.phone, 'required|min:10|max:10')}</span>
  </div>
 
  <div className=" col-md-4 mb-3">
  <label for="name" className="required">Email</label>
    <input value={value.email} onChange={handleChange} className='form-control' name='email' type="text" placeholder='Email'></input>
    <span className="requireds"> {simpleValidator.current.message('email', value.email, 'required|email')}</span>
  </div>

  <div className=" col-md-4 mb-3">
  <label for="name" className="required">Area of Interest</label>
    <input value={value.course} onChange={handleChange} className='form-control' name='course' type="text" placeholder='Area of interest'></input>
    <span className="requireds"> {simpleValidator.current.message('course', value.course, 'required')}</span>
  </div>
  <div className=" col-md-4 mb-3">
   <label for="name" className="required">Address</label>
    <input value={value.address} onChange={handleChange} className='form-control' name='address' type="text" placeholder='Postal Address'></input>
    <span className="requireds"> {simpleValidator.current.message('address', value.address, 'required')}</span>
  </div>
  <div className='col-md-4 my-2'>
   <label for="phone" className="required">Step</label>
   <select value={value.step} onChange={handleChange} className='form-control' name='step' type="text" placeholder=''>
      <option value="" selected>--Choose Step--</option>
      <option value="Lead" selected={value.step=="Lead"}>Lead</option>
      <option value="HotLead" selected={value.step=="HotLead"}>Hot Lead</option>
      <option value="Customer" selected={value.step == "Customer"}>Customer</option>
   </select>
   <span className="requireds"> {simpleValidator.current.message('step', value.step, 'required')}</span>
   </div>
  <div className=" col-md-12 mb-3">
  <label for="name" className="required">Message</label>
   <textarea value={value.message} onChange={handleChange} name='message' className='form-control'></textarea>
   <span className="requireds"> {simpleValidator.current.message('message', value.message, 'required')}</span>
  </div>
  <div className=" mb-3  ">
    <div className='d-flex justify-content-center align-items-center mx-2'>
    <button type='submit' disabled={isSubmitting} className='btn btn-info text-white   '>Update Details</button>
    <button type='button' onClick={()=>{navigate('/desk/enquiry')}} className='btn btn-secondary text-white mx-2'>Cancel</button>
    </div>
       
  </div></div>
  </form>
  </div>

  )
}

export default EditLead