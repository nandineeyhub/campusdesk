import React, { useState } from 'react'
import { API, callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'
import { useEffect } from 'react'

const AddUser = () => {

  const [toggleview, setToggleView] = useState(false)
  const [ctoggleview, setcToggleView] = useState(false) 
  const [image, setImage] = useState('');
  const [value, setValue] = useState({})
  const [,forceUpdate] = useState()
  const [isSubmitting, setIsSubmitting]= useState(false)
  const [clientlist, setClientList] = useState([])
  const [role, setRole] = useState([])
  const simpleValidator = useRef(new SimpleReactValidator());

  const navigate = useNavigate()
  
  const toggle = () => {
    if (toggleview) setToggleView(false)
    else setToggleView(true)
  }
  const ctoggle = () => {
    if (ctoggleview) setcToggleView(false)
    else setcToggleView(true)
  } 

  const uploadImage = (e) => {
    let file = (e.target.files[0])
    
    let name = e.target.name;
    if (file) {
      setImage(file)
    }

    setValue((val) => ({ ...val, [name]: file }))
  }

  
  const handleChange = (e) => {
    setValue((val)=>{ return {...val, [e.target.name]:e.target.value}})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formValid = simpleValidator.current.allValid() 
    if(!formValid){
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
    else {
    addUser()
    setIsSubmitting(true)
    }
  }

   
  let formBody = new FormData();
  for (var i in value) {
      formBody.append(i, value[i]);
  }

  const addUser = async () => {
   try{
    const response =  await API(apiUrls.adduser, {}, 'POST', formBody)
    setIsSubmitting(false)
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


  const getdata =  async () => {
   
    try{
      
      const response =  await callAPI( apiUrls.getclients, {}, 'GET')
      if(response.data.isSuccess){
        if(response.data.data != null){
          setClientList(response.data.data.clients.data)
           
        } else{
          setValue([])
        }
       
      } else {
        ErrorMsg(response.data.message)
      }
    } catch(e){
       ErrorMsg(e.message)
       
    }

   }
   const getPermission = async () => {
    try {
      const response = await callAPI(apiUrls.getpermission, {}, 'GET')
      if (response.data.isSuccess) {
        setRole(response.data.data.role)
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
    }
  }
  useEffect(()=>{getdata()
  getPermission()},[])
  console.log(value)

  return (
    <div className='container-lg w-100 '>
        <div className='text-secondary py-2 App'>
     <h3>Add User</h3>
    </div> 
    <form onSubmit={handleSubmit}>
    <div className='row img-thumbnail p-3'>
    <div className="col-md-12">

<div className="my_profile_box ">
  <img src={image ? URL.createObjectURL(image) : "../../../../public/images/upload-icon.png"} className="img-fluid" alt="" />

  <input type="file" className="my-1" name='image' onChange={uploadImage} />
{/* <span className="requireds"> {simpleValidator.current.message('image', value.image, 'required')}</span> */}
</div>

</div>
    {/* <div className='col-md-4 my-2'>
       <label for="userCode" className="required">User Code</label>
       <input onChange={handleChange} className='form-control' name='userCode' type="text" placeholder='Code'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="schoolCode" className="required">School Code</label>
       <input onChange={handleChange} className='form-control' name='schoolCode' type="text" placeholder='Code'></input>
       </div> */}
       <div className='col-md-4 my-2'>
        <label for="name" className="required"> Name </label>
        <input onChange={handleChange} className='form-control' name='name' type="text" placeholder='Name'></input>
        <span className="requireds"> {simpleValidator.current.message('name', value.name, 'required')}</span>
       </div>
      
       <div className='col-md-4 my-2'>
       <label for="email" className="required">Email</label>
       <input onChange={handleChange} className='form-control' name='email' type="text" placeholder='Email'></input>
       <span className="requireds"> {simpleValidator.current.message('email', value.email, 'required|email')}</span>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">Phone</label>
       <input onChange={handleChange} className='form-control' name='phoneNo' type="text" placeholder='Phone'></input>
       <span className="requireds"> {simpleValidator.current.message('phone number', value.phoneNo, 'required|min:10|max:10')}</span>
       </div>
       
       <div className='col-md-4 my-2'>
       <label for="address" className="required">Address</label>
       <input onChange={handleChange} className='form-control' name='address' type="text" placeholder='Address'></input>
       <span className="requireds"> {simpleValidator.current.message('address', value.address, 'required')}</span>
       </div>

       <div className='col-md-4 my-2'>
            <label for="client_id" className="required">Client</label>
            <select className='form-control' onChange={handleChange} name='client_id' type="text" placeholder=''>
              <option value="" selected>--Choose Client--</option>
              {
                clientlist.map((client) => {
                  return <option value={client.id}>{client.name}</option>
                })
              }
            </select>
            <span className="requireds"> {simpleValidator.current.message('client id', value.client_id, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="role" className="required">Role</label>
            <select className='form-control' onChange={handleChange} name='role_id' type="text" placeholder=''>
              <option value="" selected>--Choose Role--</option>
              {
                role.map((role) => {
                  return <option value={role.id}>{role.name}</option>
                })
              }
            </select>
            <span className="requireds"> {simpleValidator.current.message('role ID', value.role_id, 'required')}</span>
          </div>
   
       <div className='col-md-4 my-2'>
       <label for="password" className="required">Password</label>
       <div className=" input-group">
              <input onChange={handleChange} className='form-control ' name='password'  type={toggleview?"text":"password"} placeholder='password'></input>
              <span className='mx-1'  onClick={()=>{toggle()}}> {toggleview ? <i className="fa fa-eye form-control"/>:<i className="fa fa-eye-slash form-control"/> }</span>
            </div>
            <span className="requireds"> {simpleValidator.current.message('password', value.password, 'required')}</span>
       </div>
       <div className='col-md-4 my-2 '>
       <label for="confirmPassword" className="required">Confirm Password</label>
       <div className=" input-group">
              <input onChange={handleChange} className='form-control ' name='password_confirmation' type={ctoggleview?"text":"password"} placeholder='Confirm Password'></input>
              <span className='mx-1'  onClick={()=>{ctoggle()}}> {ctoggleview ? <i className="fa fa-eye form-control"/>:<i className="fa fa-eye-slash form-control"/> }</span>
            </div>
            <span className="requireds"> {simpleValidator.current.message('password', value.password_confirmation, 'required')}</span>
       </div>
       <div className="col-md-12 ">
         <div className="d-flex  mt-3">
         <button type="submit" disabled={isSubmitting} className="btn btn-info text-white mx-3">Add Details</button>
          <button type="button" onClick={()=>{navigate("/desk/user")}} className="btn btn-secondary ">Cancel</button>
           </div>
       </div>
    </div>
    </form>
    </div>
  )
}

export default AddUser