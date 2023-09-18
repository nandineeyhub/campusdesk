import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from '../../../popups/DeletePopup'
import RoleView from './RoleView'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { ApiLoader, NoRecordMsg } from '../../../Helper/common'
import SearchBar from '../../Filters/SearchBar'
import StatusFilter from '../../Filters/StatusFilter'


const RoleList = () => {

  const [open, setOpen] = useState(false)
  const [viewopen, setViewOpen] = useState(false);
  const [value, setValue] = useState([])
  const [data, setData] = useState({})
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

    const handleSelect =(val, type)=>{
     setData(val)
    if(type != 'view'){
        setOpen(true)
    }
    else{
      setViewOpen(true)
  }
   
    }
    const handleFilter = (e) => {
      if(e.target.name == "search"){
        setSearch(e.target.value)
      } else if(e.target.name == "status"){
        setStatus(e.target.value)
      }
   }
    const navigate = useNavigate()

    const deleteData = async (id) => {
      try{
         const response = await callAPI(apiUrls.deleterole+`/${id}`,{},'DELETE')
         if(response.data.isSuccess){
           SuccessMsg(response.data.message)
           setOpen(false)
          const newValue = value.filter((val)=>{return val.id != id})
          setValue(newValue)
         }else{
          ErrorMsg(response.data.message)
         }
      } catch(e){
           ErrorMsg(e.message)
      }
    }
    const handleStatus = async (id,status) =>{
      try{
        const query = {status:status == "Active" ? "Inactive": "Active"}
        const response = await callAPI(apiUrls.rolestatus+`/${id}`,query,'PATCH');
        if(response.data.isSuccess){
          SuccessMsg(response.data.message);
          getPermission();
        }
        else{
          ErrorMsg(response.data.message);
        }
      }
      catch(Exception ){
        ErrorMsg(Exception.message);
      }
    }
    const getPermission = async () => {
      setLoader(true)
      try{
         const response = await callAPI(apiUrls.getpermission, {search:search, status:status} ,'GET')
         setLoader(false)
         if(response.data.isSuccess){
          setValue(response.data.data.role)
         }
      } catch(e){
        setLoader(false)
        ErrorMsg(e.message)
      }
    }
  
    useEffect(()=>{
      getPermission()
    },[])

 

  return ( 
    <div className='App'>
    <div className='text-secondary '>

     
       <h3>Role List</h3>
    </div> 
   {loader && <ApiLoader/>}
  <div className='container-lg bg-light border-light rounded w-100 p-3 m-auto box-height '>
  <div className='p-3 my-3 d-flex justify-content-between'>
  <div className='d-flex justify-content-around'>
               <SearchBar handleFilter={handleFilter} getdata={getPermission}/>
               <div className='mx-2'><StatusFilter handleFilter={handleFilter}/></div>
             </div>
    <button className='btn btn-info text-white' onClick={()=>{navigate("/desk/role/addrole")}}>Add New Role</button></div>
  <table className='table table-striped'>
      <thead >
          <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Created By</th>
          <th scope='col'>Created Date</th>
          <th scope='col'>Modified By</th>
          <th scope='col'>Modified Date</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>

      </thead>
      
      <tbody>

      {
        
        value.map((val)=>{
          return(
            <tr>
<th scope="row">{val.id}</th>
<td> {val.name} </td>
<td>-</td>
<td>{new Date(val.created_at).toLocaleDateString("en-US")}</td>
<td>-</td>
<td>{new Date(val.updated_at).toLocaleDateString("en-US")}</td>

<td><p role="button" onClick={()=>{
  handleStatus(val.id,val.status)
}} className={` text-white ${val.status=="Active"?"bg-success":"bg-danger"}`}>{val.status}</p></td>
<td><div classname='d-flex justify-content-center align-items-center '>
 <NavLink to={`/desk/role/editrole/${val.id}`} className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>
 <NavLink className="text-decoration-none">   <i className="fa fa-trash text-dark fs-5 mx-1"  onClick={() => handleSelect(val,'del')}></i></NavLink>
 <NavLink  className="text-decoration-none"  onClick={() => handleSelect(val,'view')}> <i className="fa fa-eye fs-4 text-dark mx-1" ></i></NavLink>
 
  </div></td>
</tr>
          )
        })

      }

</tbody>
  </table>
  {!loader && value.length == 0 &&
                    <NoRecordMsg title={'No Record Found !!'}/>
                    }
</div>

<Modal show={open}
        onHide={() => setOpen(false)}
        deleteData = {deleteData}
        data= {data}/>

        <RoleView show={viewopen}
        onHide={() => setViewOpen(false)} 
        data= {data}
       />
</div>
  )
}

export default RoleList