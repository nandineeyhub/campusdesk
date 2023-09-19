import Modal from '../../../popups/DeletePopup'
import React, { useEffect, useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import ClientView from './ClientView'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import {ApiLoader, NoRecordMsg} from '../../../Helper/common'
import SearchBar from '../../Filters/SearchBar'
import StatusFilter from '../../Filters/StatusFilter'
import Pagination from '../../../Pagination'

const ClientList = () => {
  const [value, setValue] = useState([])
  const [loader,setLoader]=useState(false);
  const [open, setOpen] = useState(false)
  const [viewopen, setViewOpen] = useState(false);
  const [data, setData] = useState({})
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  }

   const handleFilter = (e) => {
      if(e.target.name == "search"){
        setSearch(e.target.value)
      } else if(e.target.name == "status"){
        setStatus(e.target.value)
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
  
    const handleStatus = async (id, status) => {
      try {
        
        const query = {status:status=="Active"?"Inactive":"Active"}
        const response = await callAPI(apiUrls.clientstatus+`/${id}`, query, 'PATCH')
        if(response.data.isSuccess){
           SuccessMsg(response.data.message)
           getdata()
        } else{
          ErrorMsg(response.data.message)
        }
      } catch(e){
         ErrorMsg(e.messsage)
      }
    }
   const navigate = useNavigate()
    
   const getdata =  async () => {
    setLoader(true)
    try{
      const query = {search:search, status:status}
      const response =  await callAPI( apiUrls.getclients, query, 'GET')
      if(response.data.isSuccess){
        if( response.data.data != null){
          setValue(response.data.data.clients.data)
          setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
        } else{
          setValue([])
        }
        setLoader(false)
      } else {
        ErrorMsg(response.data.message)
        setLoader(false)
      }
    } catch(e){
       ErrorMsg(e.message)
       setLoader(false)
    }

   }
   
   const deleteData = async (id) => {
    try{
       const response = await callAPI(apiUrls.deleteclient+`/${id}`,{},'DELETE')
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

   useEffect(()=>{
    getdata()
   },[status])

   console.log(value)

  return (
    <div className='mb-5 '>
        
          <div className='text-secondary  App'>
             
             <h3>Client List</h3>
          </div> 
         
        <div className='container-lg bg-light border-light rounded w-100 p-3 overflow-auto '>
        { loader && <ApiLoader/>}
        <div className='p-3 my-3 d-flex justify-content-between'>
             <div className='d-flex justify-content-around'>
               <SearchBar handleFilter={handleFilter} getdata={getdata}/>
               <div className='mx-2'><StatusFilter handleFilter={handleFilter} /></div>
             </div>
          <button className='btn btn-info text-white' onClick={()=>{navigate("/desk/client/addclient")}}>Add New Client</button></div>
        <table className='table table-striped App'>
            <thead >
                <th scope='col'>Id</th>
                <th scope='col'>Campus Name</th>
                <th scope='col'>ContactPerson</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Status</th>
                <th scope='col'>Action</th>

            </thead>
            
            <tbody>

   {
    value.map((val)=>{
      return    <tr>
      <th scope="row">{val.id}</th>
      <td>{val.name}</td>
      <td>{val.contactPerson}</td>
      <td>{val.email}</td>
      <td>{val.phoneNo}</td>
      <td><p  onClick={()=>{handleStatus(val.id, val.status)}} role="button" className={` text-white ${val.status=="Active"?"bg-success":"bg-danger"}`}>{val.status}</p></td>
      <td><div classname='d-flex justify-content-center align-items-center '>
       <NavLink to={`/desk/client/editclient/${val.id}`} className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>
       <NavLink className="text-decoration-none">   <i className="fa fa-trash text-dark fs-5 mx-1"  onClick={() => handleSelect(val,'del')}></i></NavLink>
       <NavLink  className="text-decoration-none"  onClick={() => handleSelect(val, 'view')}> <i className="fa fa-eye fs-4 text-dark mx-1" ></i></NavLink>
 
        </div></td>
    </tr>
    })
   }
    
  </tbody>
        </table>
        {!loader && value.length == 0 &&
                    <NoRecordMsg title={'No Record Found !!'}/>
                    }
   { value.length != 0 && <div className='d-flex justify-content-end'>
      <Pagination/>
    </div>}
    </div>
    { <Modal show={open}
        onHide={() => setOpen(false)}
          deleteData = {deleteData}
          data= {data}/>
        }
        <ClientView show={viewopen}
        onHide={() => setViewOpen(false)}
        data = {data}/>
    </div>
  )
}

export default ClientList