import React, { useEffect, useState } from 'react'
import PermissionCard from './PermissionCard'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate } from 'react-router-dom'
import { ApiLoader } from '../../../Helper/common'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'

const AddRole = () => {

  const [value, setvalue] = useState({roleName:"", permission:[]})
  const [permission, setPermission] = useState([])
  const [,forceUpdate] = useState() 
  const [isCheck, setIsCheck] = useState([]);
  const [isSubmitting,setIsSubmitting]=useState(false); 
  const [loader, setLoader] = useState(false)
  const simpleValidator = useRef(new SimpleReactValidator());
 
  const navigate = useNavigate()

   const user = JSON.parse(localStorage.getItem("user"))

  const handleSelectAll = ( e, mname, isCheckAll) => {
   
    var allPermission = value.permission
    permission.permissions.map((permission)=>{
      allPermission.push(permission.slug+"_"+mname)
    })
     
    setIsCheck(allPermission);

    if (isCheckAll) {
      permission.permissions.map((permission)=>{
        
        allPermission = allPermission.filter((obj)=>{
          return obj != permission.slug+"_"+mname
        })
       
        setIsCheck(allPermission);
      })
     
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
    const formValid = simpleValidator.current.allValid() 
    if(!formValid){
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
    else {
      addRole()
      setIsSubmitting(true)
    }
  }
 
  const addRole = async () => {
     try{
      const response = await callAPI(apiUrls.addrole, {client_id:user.id}, 'POST', value)
      setIsSubmitting(false)
      if(response.data.isSuccess){
        SuccessMsg(response.data.message)
        navigate("/desk/role")
      }else{
        ErrorMsg(response.data.message)
      }
     } catch(e){
        ErrorMsg(e.message)
        setIsSubmitting(false)
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
    let outputArray = Array.from(new Set(isCheck))
    setvalue((val)=>{return {...val,["permission"]:outputArray}})
  },[isCheck])


  return (
<div className='container-lg w-100 '>
<div className='text-secondary py-2 App'>
 <h3>Add Role</h3>
</div> 
{loader && <ApiLoader/>}
<form onSubmit={handleSubmit}>
<div className='row '>

<div className='col-md-5 mb-3'>
   <label for="name" className="required my-1">Role Name</label>
   <input onChange={handleChange} className='form-control ' name='roleName' type="text" placeholder='Role name'></input>
   <span className="requireds"> {simpleValidator.current.message('name', value.roleName, 'required')}</span>
   </div>
  <label className='my-1'>Permission</label>
  {
      permission?.modules !=undefined && permission?.modules.length>0 &&  permission?.modules.map((module)=>{
        return (
        user.type == "admin" ? <div className='col-md-6 my-1 '>
        <PermissionCard id={module.id} 
        module={module}
        permissions={permission.permissions} 
        handleSelectAll={handleSelectAll}
        handleClick ={handleClick}
        isCheckone={isCheckone}
        isCheck={isCheck}
        />
       </div>  :  user.type == "client" && module.name != "Client"  && <div className='col-md-6 my-1 '>
        <PermissionCard id={module.id} 
        module={module}
        permissions={permission.permissions} 
        handleSelectAll={handleSelectAll}
        handleClick ={handleClick}
        isCheckone={isCheckone}
        isCheck={isCheck}
        />
       </div> 
      )
    })      
  }
 
   <div className="col-md-12 ">
     <div className="d-flex  mt-3">
      <button disabled={isSubmitting}  type="submit"  className="btn btn-info text-white mx-3">Add Details</button>
      <button type="button" onClick={()=>{navigate("/desk/role")}} className="btn btn-secondary ">Cancel</button>
       </div>
   </div>
</div>
</form>
</div>
  )
}

export default AddRole