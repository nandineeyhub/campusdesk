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
import ValidatePermission from '../../../Auth/ValidatePermission'
import { ThemeContext } from '../../../theme-context';

const ClientList = () => {

  const [value, setValue] = useState([])
  const [loader,setLoader]=useState(false);
  const [open, setOpen] = useState(false)
  const [viewopen, setViewOpen] = useState(false);
  const [data, setData] = useState({})
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pages, setPages] = useState([1])
  const [columns, setColumns] = useState([
  'Id',	'Campus Name', "Contact Person"	,'Email',	'Phone','Status',	'Action'])
  const { theme, toggle } = React.useContext(ThemeContext)

  const handleLimitChange = (e) => {
    setItemsPerPage(e.target.value)
    setCurrentPage(1)
    getdata(status,search,e.target.value,1)
  }

  const handlepageChange = (page) => {
    setCurrentPage(page)
    getdata(status,search,itemsPerPage,page)
  }

   const handleFilter = (e) => {
      if(e.target.name == "search"){
        setSearch(e.target.value)
      } else if(e.target.name == "status"){
        setCurrentPage(1)
        setItemsPerPage(10)
        setStatus(e.target.value)
        getdata(e.target.value,search,itemsPerPage,currentPage)
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
        
        const query = {status:status=="Active"?"Inactive":"Active", id:id}
        const response = await callAPI(apiUrls.clientstatus, query, 'PUT')
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

   const submitData = () => {
     getdata(status,search,itemsPerPage,currentPage)
   }
    
   const getdata =  async (status,search,itemPerPage,currentPage) => {
    setLoader(true)
    try{
      const query = {search:search, status:status, limit:itemsPerPage, page:currentPage}
      const response =  await callAPI( apiUrls.getclients, query, 'GET')
      if(response.data.isSuccess){
        if(response.data.data != null){
          setValue(response.data.data.clients.data)
          setTotalPages((response.data.data.totalRecord%itemPerPage?itemPerPage:itemsPerPage)?Math.floor(response.data.data.totalRecord/(itemPerPage?itemPerPage:itemsPerPage))+1:response.data.data.totalRecord%itemPerPage?itemPerPage:itemsPerPage)
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
       const response = await callAPI(apiUrls.deleteclient,{id:id},'DELETE')
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

   },[ ])
   

  const manageColumn  = (e) => {
    var newarr = columns
    var check =  columns.filter((column)=>{ return column == e.target.name})
    
     if(check.length == 0 ) {
       newarr.push(e.target.name)
     }else {
       newarr = columns.filter((column)=>{ return column != e.target.name})

     } 
     setColumns(newarr)
  }
  
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

 console.log(columns)
  return (
    <div className='mb-5 '>
        
          <div className='text-secondary '>
             
             <h4>Client List</h4>

          </div> 
        
        <input onClick={manageColumn} name='Id' type='checkbox'></input>
        <div className='container-lg border-light rounded w-100 px-3 overflow-auto '>
        { loader && <ApiLoader/>}
        <div className='py-2 my-3 d-flex justify-content-between'>
             <div className='d-flex justify-content-around'>
               <SearchBar handleFilter={handleFilter} getdata={submitData} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage}/>
               <div className='mx-2'><StatusFilter handleFilter={handleFilter} /></div>
             </div>
        { ValidatePermission("add_client") && <button className='btn btn-info text-white' onClick={()=>{navigate("/desk/client/addclient")}}>Add New Client</button>}</div>
        <table className={`table ${theme.backgroundColor == 'black' ? "table-dark":"" } App`}>
            <thead >
                { <th scope='col'>Id</th>}
                <th scope='col'>Campus Name</th>
                <th scope='col'>ContactPerson</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Status</th>
                <th scope='col'>Action</th>
                {/* {
                  columns.map((column)=>{
                   return <th scope='col'>{column}</th>
                  })
                } */}

            </thead>
            
            <tbody >

   {
    value.map((val, key)=>{
      return    <tr className='bg-dark text-white'>
      <th scope="row">{key+1}</th>
      <td>{val.name}</td>
      <td>{val.contactPerson}</td>
      <td>{val.email}</td>
      <td>{val.phoneNo}</td>
      <td><p  onClick={()=>{ValidatePermission("update_client") && handleStatus(val.id, val.status)}} role="button" className={`App text-white ${val.status=="Active"?"bg-success":"bg-danger"}`}>{val.status}</p></td>
      <td><div classname='d-flex justify-content-center align-items-center '>
    { ValidatePermission("edit_client") && <NavLink to={`/desk/client/editclient/${val.id}`} className="text-decoration-none"> <i className="fa fa-edit text-secondary fs-5 mx-1 "></i> </NavLink>}
    { ValidatePermission("delete_client")  && <NavLink className="text-decoration-none">   <i className="fa fa-trash text-secondary fs-5 mx-1"  onClick={() => handleSelect(val,'del')}></i></NavLink>}
       <NavLink  className="text-decoration-none"  onClick={() => handleSelect(val, 'view')}> <i className="fa fa-eye fs-4 text-secondary mx-1" ></i></NavLink>
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