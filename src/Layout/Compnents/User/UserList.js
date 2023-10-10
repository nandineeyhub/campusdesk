import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from '../../../popups/DeletePopup'
import UserView from './UserView'
import { callAPI } from '../../../apiutils/apiUtils'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ApiLoader, NoRecordMsg } from '../../../Helper/common'
import SearchBar from '../../Filters/SearchBar'
import StatusFilter from '../../Filters/StatusFilter'
import Pagination from '../../../Pagination'
import ValidatePermission from '../../../Auth/ValidatePermission'

const UserList = () => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState([])
  const [data, setData] = useState({})
  const [loader, setloader] = useState(false)
  const [viewopen, setViewOpen] = useState(false);
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pages, setPages] = useState([1])
  

  const handleLimitChange = (e) => {
    setItemsPerPage(e.target.value)
    setCurrentPage(1)
  }

  const handlepageChange = (page)=>{
    setCurrentPage(page)
  }

  const handleFilter = (e) => {
      if(e.target.name == "search"){
        setSearch(e.target.value)
      } else if(e.target.name == "status"){
        setStatus(e.target.value)
        setCurrentPage(1)
        setItemsPerPage(10)
        getusers(e.target.value,search,itemsPerPage,currentPage)
      }
   }


   const handleSelect =(val, type)=>{
    setData(val)
    if(type != 'view'){
        setOpen(true)
    }
    else{
      setViewOpen(true)
    }
   }

   const deleteData = async (id) => {
    try{
       const response = await callAPI(apiUrls.deleteuser,{id:id},'DELETE')
       if(response.data.isSuccess){
         SuccessMsg(response.data.message)
         setOpen(false)
        const newValue = value.filter((val)=>{return val.id != id})
        setValue(newValue)
       } else{
        ErrorMsg(response.data.message)
       }
    } catch(e){
         ErrorMsg(e.message)
    }
  }

  const handleStatus = async (id, status) => {
    try {
      const query = {status:status=="Active"?"Inactive":"Active", id:id}
      const response = await callAPI(apiUrls.userstatus, query, 'PUT')
      if(response.data.isSuccess){
         SuccessMsg(response.data.message)
         getusers()
      } else{
        ErrorMsg(response.data.message)
      }
    } catch(e){
       ErrorMsg(e.messsage)
    }
  }

  const getusers = async (status,search,itemsPerPage,currentPage) => {
    setloader(true)
    try{
      const query = {search:search, status:status, limit:itemsPerPage, page:currentPage}
      const response =  await callAPI(apiUrls.getusers, query, 'GET')
      setloader(false)
      if(response.data.isSuccess){
        setValue(response.data.data.users.data)
        setTotalPages((response.data.data.users.total%itemsPerPage)?Math.floor(response.data.data.users.total/itemsPerPage)+1:response.data.data.users.total/itemsPerPage)
      }else{
        setValue([])
        //ErrorMsg(response.data.message)
      }
    } catch(e){
         ErrorMsg(e.message)
         setloader(false)
    }
  } 
  
  useEffect(()=>{
    getusers()
   },[ itemsPerPage, totalPages, currentPage ])

  useEffect(()=>{
    setCurrentPage(1)
    setItemsPerPage(10)
    getusers()
  },[ status ] )
    
  useEffect(()=>{
    var newarr = []
    var count = 1
    var val = totalPages
    while(val--){
       newarr.push(count)
       count = count + 1 
    }
    setPages(newarr)
   },[ itemsPerPage, totalPages, currentPage])

  const navigate = useNavigate()
  
  return (
    <div className=''>
    <div className='text-secondary'>
   
       <h4>User List</h4>
    </div> 
    {loader && <ApiLoader/>}
  <div className='container-lg border-light rounded w-100 px-3 m-auto  '>
  <div className='py-2 my-3 d-flex justify-content-between'>
  <div className='d-flex justify-content-around'>
               <SearchBar handleFilter={handleFilter} getdata={getusers}  setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage}/>
               <div className='mx-2'><StatusFilter handleFilter={handleFilter} /></div>
             </div>
    {ValidatePermission("add_user") && <button className='btn btn-info text-white' onClick={()=>{navigate("/desk/user/adduser")}}>Add New User</button>}</div>
  <table className='table table-striped App'>
      <thead >
          <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Phone</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>
      </thead>
      <tbody>

     {
      value.map
     ( (val, key) => { return   <tr>
      <th scope="row">{key+1}</th>
      <td>{val.name}</td>
      <td>{val.email}</td>
      <td>{val.phoneNo}</td>
      <td><p  role="button" onClick={()=>{ ValidatePermission("update_user") && handleStatus(val.id, val.status)}} className={`App text-white ${val.status=="Active"?"bg-success":"bg-danger"}`}>{val.status}</p></td>
      <td><div classname='d-flex justify-content-center align-items-center '>
     { ValidatePermission("edit_user")&&<NavLink to={`/desk/user/edituser/${val.id}`} className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>}
     { ValidatePermission("delete_user") && <NavLink className="text-decoration-none"  onClick={() => handleSelect(val, 'del')}>  <i className="fa fa-trash text-dark fs-5 mx-1" ></i></NavLink>}
       <NavLink  className="text-decoration-none"  onClick={() => handleSelect(val, 'view')}> <i className="fa fa-eye fs-4 text-dark mx-1"></i></NavLink>
        </div></td>
      </tr> } )
     }

</tbody>
  </table>
  {!loader && value.length == 0 &&
                    <NoRecordMsg title={'No Record Found !!'}/>
                    }
</div>
{ value.length != 0 && <div className='d-flex justify-content-end'>
      <div className='mx-2'>
        <select onChange={handleLimitChange} className='form-control text-primary ' name='itemsPerpage'>
        <option selected value="">select limit</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        </select>
        </div>
      <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handlepageChange={handlepageChange}
      pages={pages}
      />
    </div> }
 {<Modal show={open}
        onHide={() => setOpen(false)}
        data={data}
        deleteData={deleteData} />} 

        <UserView show={viewopen} data={data} onHide={()=>setViewOpen(false) }/>
</div>
  )
}

export default UserList