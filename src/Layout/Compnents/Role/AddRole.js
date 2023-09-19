import React, { useEffect, useState } from 'react'
import PermissionCard from './PermissionCard'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate } from 'react-router-dom'
import { ApiLoader } from '../../../Helper/common'

const AddRole = () => {

  const [value, setvalue] = useState({roleName:"", permission:[]})
  const [permission, setPermission] = useState([])
  
  const [isCheck, setIsCheck] = useState([]);
  const [loader, setLoader] = useState(false)
 
  const navigate = useNavigate()
   
    
  const handleSelectAll = (e, mname, isCheckAll) => {
    
    var allPermission = []
    permission.permissions.map((permission)=>{
      allPermission.push(permission.slug+"_"+mname)
    })

    setIsCheck(allPermission);
    if (isCheckAll) {
      setIsCheck([]);
    }
   // setvalue((val)=>{return {...val,["permission"]:isCheck}})
  };

    const handleClick = (e, name, mname) => {
        const { checked } = e.target;
       
        setIsCheck([...isCheck, name+"_"+mname]);
      
       
        if (!checked) {
          setIsCheck(isCheck.filter(item => { return item !== name+"_"+mname}));
        
       
        }
       
      };

    const isCheckone = (id) => {
  
      return (isCheck.includes(id))
    }

  const handleChange = (e) => {
       setvalue((val)=>{return({...val,[e.target.name]:e.target.value})})
  }


  const handleSubmit = (e) =>{
    e.preventDefault()
    addRole()
  }
  
  const addRole = async () => {
     try{
      const response = await callAPI(apiUrls.addrole, {}, 'POST', value)
      if(response.data.isSuccess){
        SuccessMsg(response.data.message)
        navigate("/desk/role")
      }else{
        ErrorMsg(response.data.message)
      }
     } catch(e){
        ErrorMsg(e.message)
     }
  }

  const getPermission = async () => {
    setLoader(true)
    try{
       const response = await callAPI(apiUrls.getpermission, {} ,'GET')
       setLoader(false)
       if(response.data.isSuccess){
        setPermission(response.data.data)
       } else{
        ErrorMsg(response.data.message)
       }
    } catch(e){
         setLoader(false)
         ErrorMsg(e.message)
    }
  }

  useEffect(()=>{
    getPermission()
  },[])

  useEffect(()=>{
    setvalue((val)=>{return {...val,["permission"]:isCheck}})
  },[isCheck])

  console.log(value)

  return (
<div className='container-lg w-100 '>
<div className='text-secondary py-2 App'>
 <h3>Add Role</h3>
</div> 
{loader && <ApiLoader/>}
<form onSubmit={handleSubmit}>
<div className='row img-thumbnail p-3'>

<div className='col-md-5 mb-3'>
   <label for="name" className="required my-1">Role Name</label>
   <input onChange={handleChange} className='form-control ' name='roleName' type="text" placeholder='Role name'></input>
   </div>
 
  
 
  <label className='my-1'>Permission</label>
  {
      permission?.modules !=undefined && permission?.modules.length>0 &&  permission?.modules.map((module)=>{
      return (
        <div className='col-md-6 my-1 '>
        <PermissionCard id={module.id} 
        module={module}
        permissions={permission.permissions} 
        handleSelectAll={handleSelectAll}
        handleClick ={handleClick}
        isCheckone={isCheckone}
       
        />
     </div>
      )
    })
  }
 
   
   <div className="col-md-12 ">
     <div className="d-flex  mt-3">
     <button type="submit"  className="btn btn-info text-white mx-3">Add Details</button>
      <button type="button" onClick={()=>{navigate("/desk/role")}} className="btn btn-secondary ">Cancel</button>
       </div>
   </div>
</div>
</form>
</div>
  )
}

export default AddRole