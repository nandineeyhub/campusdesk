import React, { useEffect, useState } from 'react'
import PermissionCard from './PermissionCard'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'

const AddRole = () => {

  const [value, setvalue] = useState([])
  const [permission, setPermission] = useState([])

  const handleChange = (e) => {
       setvalue((val)=>{return({...val,[e.target.name]:e.target.value})})
  }

  const handleSubmit = (e) =>{
    e.prevent.default()
    addRole()
  }
  
  const addRole = async () => {
      const response = await callAPI()
  }

  const getPermission = async () => {
    try{
       const response = await callAPI(apiUrls.getpermission, {} ,'GET')
       if(response.data.isSuccess){
        setPermission(response.data.data)
       }
    } catch(e){
         
    }
  }

  useEffect(()=>{
    getPermission()
  },[])

  console.log(permission)
  return (
<div className='container-lg w-100 '>
<div className='text-secondary py-2 App'>
 <h3>Add Role</h3>
</div> 
<form>
<div className='row img-thumbnail p-3'>

<div className='col-md-5 mb-3'>
   <label for="name" className="required my-1">Role Name</label>
   <input onChange={handleChange} className='form-control ' name='roleName' type="text" placeholder='Role name'></input>
   </div>
 
  
 
  <label className='my-1'>Permission</label>

  <div className='col-md-6  '>
   <PermissionCard id={"1"}/>
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

export default AddRole