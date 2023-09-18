import React, { useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {

  const [toggleview, setToggleView] = useState(false)
  const [ctoggleview, setcToggleView] = useState(false) 
  const [value, setValue] = useState({})

  const navigate = useNavigate()
  
  const toggle = () => {
    if (toggleview) setToggleView(false)
    else setToggleView(true)
  }
  const ctoggle = () => {
    if (ctoggleview) setcToggleView(false)
    else setcToggleView(true)
  } 
  
  const handleChange = (e) => {
    setValue((val)=>{ return {...val, [e.target.name]:e.target.value}})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addUser()
  }

  const addUser = async () => {
   try{
    const response =  await callAPI(apiUrls.adduser, {}, 'POST', value)
    if(response.data.isSuccess){
      SuccessMsg(response.data.message)
      navigate('/desk/user')
    }else{
      ErrorMsg(response.data.message)
    }
   }catch(e){
      ErrorMsg(e.message)
   }
  }


  return (
    <div className='container-lg w-100 '>
        <div className='text-secondary py-2 App'>
     <h3>Add User</h3>
    </div> 
    <form onSubmit={handleSubmit}>
    <div className='row img-thumbnail p-3'>
    <div className='col-md-4 my-2'>
       <label for="userCode" className="required">User Code</label>
       <input onChange={handleChange} className='form-control' name='userCode' type="text" placeholder='Code'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="schoolCode" className="required">School Code</label>
       <input onChange={handleChange} className='form-control' name='schoolCode' type="text" placeholder='Code'></input>
       </div>
       <div className='col-md-4 my-2'>
        <label for="name" className="required"> Name </label>
        <input onChange={handleChange} className='form-control' name='name' type="text" placeholder='Name'></input>
       </div>
      
       <div className='col-md-4 my-2'>
       <label for="email" className="required">Email</label>
       <input onChange={handleChange} className='form-control' name='email' type="text" placeholder='Email'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">Phone</label>
       <input onChange={handleChange} className='form-control' name='phoneNo' type="text" placeholder='Phone'></input>
       </div>
       
       <div className='col-md-4 my-2'>
       <label for="address" className="required">Address</label>
       <input onChange={handleChange} className='form-control' name='address' type="text" placeholder='Address'></input>
       </div>
   
       <div className='col-md-4 my-2'>
       <label for="password" className="required">Password</label>
       <div className=" input-group">
              <input onChange={handleChange} className='form-control ' name='password'  type={toggleview?"text":"password"} placeholder='password'></input>
              <span className='mx-1'  onClick={()=>{toggle()}}> {toggleview ? <i className="fa fa-eye form-control"/>:<i className="fa fa-eye-slash form-control"/> }</span>
            </div>
      
       </div>
       <div className='col-md-4 my-2 '>
       <label for="confirmPassword" className="required">Confirm Password</label>
       <div className=" input-group">
              <input onChange={handleChange} className='form-control ' name='password_confirmation' type={ctoggleview?"text":"password"} placeholder='Confirm Password'></input>
              <span className='mx-1'  onClick={()=>{ctoggle()}}> {ctoggleview ? <i className="fa fa-eye form-control"/>:<i className="fa fa-eye-slash form-control"/> }</span>
            </div>
      
       </div>
       <div className="col-md-12 ">
         <div className="d-flex  mt-3">
         <button type="submit"  className="btn btn-info text-white mx-3">Add Details</button>
          <button type="button"  className="btn btn-secondary ">Cancel</button>
           </div>
       </div>
    </div>
    </form>
    </div>
  )
}

export default AddUser