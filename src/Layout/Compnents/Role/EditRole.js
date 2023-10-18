import React, { useEffect, useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate, useParams } from 'react-router-dom'
import PermissionCard from './PermissionCard'
import { ApiLoader } from '../../../Helper/common'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'

const EditRole = () => {
  const [value, setvalue] = useState({})
  const [modules, setModules] = useState([])
  const [isCheck, setIsCheck] = useState([]);
  const [loader, setloader] = useState(false)
  const [isSubmitting, setIsSubmitting]= useState(false)
  const [,forceUpdate] = useState()
  const simpleValidator = useRef(new SimpleReactValidator());

  const user = JSON.parse(localStorage.getItem("user"))

  const navigate = useNavigate()
  const {id} = useParams()

  const handleSelectAll = ( e, mname, isCheckAll) => {
   
    var allPermission = value.permission
    modules.permissions.map((permission)=>{
      allPermission.push(permission.slug+"_"+mname)
    })
     
    setIsCheck( allPermission);

    if (isCheckAll) {
      modules.permissions.map((permission)=>{
        
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


 const handleSubmit = (e) => {
   e.preventDefault()
   const formValid = simpleValidator.current.allValid() 
   if(!formValid){
    simpleValidator.current.showMessages();
    forceUpdate(1);
   }
   else {
    updateRole()
    setIsSubmitting(true)
  }
 } 
 

 useEffect(()=>{
   setvalue((val)=>{return {...val,["permission"]:isCheck}})
 },[isCheck])


const updateRole = async () => {
try{
  const response = await callAPI(apiUrls.updaterole, {id:id}, 'PUT', value)
  setIsSubmitting(false)
  if(response.data.isSuccess){
    SuccessMsg(response.data.message)
    navigate('/desk/role')
  } else {
    ErrorMsg(response.data.message)
  }
} catch(e){
   ErrorMsg(e.message)
   setIsSubmitting(false)
}
}




  const getRole = async () => {
    setloader(true)
  try{
   const response = await callAPI(apiUrls.getrolebyid,{id:id}, 'GET')
   setloader(false)
   if( response.data.isSuccess){
      setvalue(response.data.data.roles)
      var newarray = []
      response.data.data.roles.permissions.map((p)=>(
        newarray.push(p.permissions)
      ))
      setIsCheck(newarray)
   } else{
      ErrorMsg(response.data.message)
   }
   }catch(e){
      ErrorMsg(e.message)
      setloader(false)
   }
  }


 useEffect(()=>{
   getRole()
 },[])

 const getModule = async () => {
   try{
      const response = await callAPI(apiUrls.getpermission, {} ,'GET')
      if(response.data.isSuccess){
       setModules(response.data.data)
      }
   } catch(e){
        
   }
 }

 useEffect(()=>{
   getModule()
   
 },[])



  return (
    <div className='container-lg w-100 '>
    <div className='text-secondary py-2 App'>
      <h3>Edit Role</h3>
    </div> 
<form onSubmit={handleSubmit}>
<div className='row'>
<div className="col-md-12 d-flex  ">
<div className='col-md-4 m-2 '>
   <label for="phone" className="required">Role Name</label>
   <input onChange={handleChange} value={value.name}  className='form-control' name='name' type="text" placeholder='Role name'></input>
   <span className="requireds"> {simpleValidator.current.message('name', value.name, 'required')}</span>
   </div>
  
</div>
{loader && <ApiLoader/>}
<label className='my-1'>Permission</label>
  {
      modules.modules !=undefined && modules.modules.length>0 &&  modules.modules.map((module)=>{
      return (
        user.type == "admin" ? <div className='col-md-6 my-1 '>
         <PermissionCard id={module.id} 
        module={module}
        permissions={modules.permissions} 
        handleSelectAll={handleSelectAll}
        handleClick ={handleClick}
        isCheckone={isCheckone}
        isCheck={isCheck}
        />
       </div>  :  user.type == "client" && module.name != "Client"  && <div className='col-md-6 my-1 '>
       <PermissionCard id={module.id} 
        module={module}
        permissions={modules.permissions} 
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
     <button disabled={isSubmitting} type="submit"  className="btn btn-info text-white mx-3">Update Details</button>
      <button type="button" onClick={()=>{navigate("/desk/role")}}  className="btn btn-secondary ">Cancel</button>
       </div>
   </div>
</div>
</form>
</div>
  )
}

export default EditRole