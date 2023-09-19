import React, { useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import moment from 'moment';
import { useNavigate } from 'react-router';

const EnquiryForm = () => {
  const [value, setValue] = useState({enquiryDate:moment().format('YYYY-MM-DD')})

  const navigate = useNavigate()
  
  const user = JSON.parse(localStorage.getItem("user"))

  const today = new Date()
  console.log(moment().format('MM/DD/YYYY'))
  const handleChange = (e) => {
      setValue((val)=>{return {...val, [e.target.name]:e.target.value}})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    addenquiry()
  }

  const addenquiry = async () => {
    try{
      const response = await callAPI(apiUrls.addenquiry, {clientID:user.id}, 'POST', value)
      if(response.data.isSuccess){
         SuccessMsg(response.data.message)
      } else {
        ErrorMsg(response.data.message)
      }
     } catch(e){
        ErrorMsg(e.errors)
     }
  }
  console.log(value)
  return (
      <div className='container-lg w-100 '>
          <div className='text-secondary py-2 App'>
            <h3> Enquiry Form </h3>
          </div> 
           <form onSubmit={handleSubmit} className='img-thumbnail p-4'>
            <div className='row'>
              <div className=" col-md-4 mb-3">
                 <label for="enquiryDate" className="required">Enquiry Date</label>
                 <input onChange={handleChange} value={moment().format('YYYY-MM-DD')} placeholder="walkIn Date"  type="date"  className="form-control my-1"  name="enquiryDate" />
              </div>
            <div className=" col-md-4 mb-3">
              <label for="name" className="required">Name</label>
              <input onChange={handleChange}  className='form-control my-1' name='name' type="text" placeholder='Name'></input>
            </div>
            <div className=" col-md-4 mb-3">
              <label for="name" className="required">Phone</label>
              <input onChange={handleChange} className='form-control my-1' name='phone'  type="text" placeholder='Phone number'></input>
            </div>
           
            <div className=" col-md-4 mb-3">
            <label for="email" className="required">Email</label>
              <input onChange={handleChange} className='form-control my-1' name='email' type="text" placeholder='Email'></input>
            </div>
            <div className=" col-md-4 mb-3">
            <label for="name" className="required">Area of Interest</label>
              <input onChange={handleChange} className='form-control my-1' name='course' type="text" placeholder='Area of interest'></input>
            </div>
            <div className=" col-md-4 mb-3">
             <label for="name" className="required">Address</label>
              <input onChange={handleChange} className='form-control my-1' name='address' type="text" placeholder='Postal Address'></input>
            </div>
            <div className=" col-md-12 mb-3">
            <label for="name" className="required">Message</label>
             <textarea onChange={handleChange} name='message' className='form-control my-1'></textarea>
            </div>
            <div className=" mb-3  ">
              <div>
              <button type='submit' className='btn btn-info text-white px-3 '>Confirm details</button>
              <button type='button' onClick={navigate('/desk/enquiry')} className='btn btn-secondary text-white mx-2'>Cancel</button>
              </div> 
            </div>
            </div>
            </form>
         </div>
    
  )
}

export default EnquiryForm