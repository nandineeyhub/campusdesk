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
import Pagination from '../../../Pagination'
import ValidatePermission from '../../../Auth/ValidatePermission'
import { ThemeContext } from '../../../theme-context';

const RoleList = () => {

  const [open, setOpen] = useState(false)
  const [viewopen, setViewOpen] = useState(false);
  const [value, setValue] = useState([])
  const [data, setData] = useState({})
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pages, setPages] = useState([1])
  const [modules, setModules] = useState([])

  const { theme, toggle } = React.useContext(ThemeContext)

  const handleLimitChange = (e) => {
    setItemsPerPage(e.target.value)
    setCurrentPage(1)
  }

  const handlepageChange = (page)=>{
    setCurrentPage(page)
   
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
    const handleFilter = (e) => {
      if(e.target.name == "search"){
        setSearch(e.target.value)
        if(e.target.value == ""){
          getPermission(e.target.value,status, itemsPerPage, currentPage)
        }
      } else if(e.target.name == "status"){
        setCurrentPage(1)
        setItemsPerPage(10)
        setStatus(e.target.value)
        getPermission(search,e.target.value, itemsPerPage, currentPage)
      }
   }
    const navigate = useNavigate()

    const deleteData = async (id) => {
      try{
         const response = await callAPI(apiUrls.deleterole,{id:id},'DELETE')
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

    const handleStatus = async (id, newstatus) =>{
      try{
        const query = {status:newstatus == "Active" ? "Inactive": "Active", id:id}
        const response = await callAPI(apiUrls.rolestatus,query,'PUT');
        if(response.data.isSuccess){
          SuccessMsg(response.data.message);
          getPermission(search, status, itemsPerPage, currentPage);
        }
        else{
          ErrorMsg(response.data.message);
        }
      }
      catch(Exception ){
        ErrorMsg(Exception.message);
      }
    }
    
    const submitData = () => {
      getPermission(search, status, itemsPerPage, currentPage)
    }

    const getPermission = async (search, status, itemPerPage, currentPage) => {
      setLoader(true)
      try{
         const query = {search:search, status:status, limit:itemPerPage, page:currentPage}
         const response = await callAPI(apiUrls.getpermission, query ,'GET')
         setLoader(false)
         if(response.data.isSuccess){
          setValue(response.data.data.roles.data)
          setModules(response.data.data.modules)
          setTotalPages((response.data.data.totalRole%itemPerPage?itemPerPage:itemsPerPage)?Math.floor(response.data.data.totalRole/(itemPerPage?itemPerPage:itemsPerPage))+1:response.data.data.totalRole/itemPerPage?itemPerPage:itemsPerPage)
         }
      } catch(e){
        setLoader(false)
        ErrorMsg(e.message)
        // console.log(e)
      }
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
     }, [itemsPerPage, totalPages, currentPage])
  


    useEffect(()=>{
    
      getPermission()
     },[])


  return ( 
    <div className=''>
    <div className='text-secondary '>

     
       <h4>Role List</h4>
    </div> 
   {loader && <ApiLoader/>}
  <div className='container-lg  border-light rounded w-100 px-3 m-auto box-height '>
  <div className='py-2 my-3 d-flex justify-content-between'>
  <div className='d-flex justify-content-around'>
               <SearchBar handleFilter={handleFilter} getdata={submitData} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage}/>
               <div className='mx-2'><StatusFilter handleFilter={handleFilter}/></div>
             </div>
{ValidatePermission("add_role") &&   <button className='btn btn-info text-white' onClick={()=>{navigate("/desk/role/addrole")}}>Add New Role</button>}</div>
  <table className={`table ${theme.backgroundColor == 'black' ? "table-dark":"table-striped" } App`}>
      <thead>
          <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Created By</th>
          <th scope='col'>Account Type</th>
          <th scope='col'>Created Date</th>
          <th scope='col'>Modified Date</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>
      </thead>
      <tbody>

      {
        
        value.map((val, key)=>{
          return(
            <tr>
<th scope="row">{key+1}</th>
<td> {val.name} </td>
<td> {val.created_by} </td>
<td> {val.created_by_type} </td>
<td>{new Date(val.created_at).toLocaleDateString("en-US")}</td>

<td>{new Date(val.updated_at).toLocaleDateString("en-US")}</td>

<td><p role="button" onClick={()=>{
 ValidatePermission("update_role") && handleStatus(val.id,val.status)
}} className={`App text-white ${val.status=="Active"?"bg-success":"bg-danger"}`}>{val.status}</p></td>
<td><div classname='d-flex justify-content-center align-items-center '>
 {ValidatePermission("edit_role") &&  <NavLink to={`/desk/role/editrole/${val.id}`} className="text-decoration-none"> <i className="fa fa-edit text-secondary fs-5 mx-1 "></i> </NavLink>}
 {ValidatePermission("delete_role") && <NavLink className="text-decoration-none">   <i className="fa fa-trash text-secondary fs-5 mx-1"  onClick={() =>handleSelect(val,'del')}></i></NavLink>}
 <NavLink  className="text-decoration-none"  onClick={() => handleSelect(val,'view')}> <i className="fa fa-eye fs-4 text-secondary mx-1" ></i></NavLink>
 
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
    </div>}
</div>

<Modal show={open}
        onHide={() => setOpen(false)}
        deleteData = {deleteData}
        data= {data}/>

        <RoleView show={viewopen}
        onHide={() => setViewOpen(false)} 
        modules={modules}
        data= {data}
        permissions = {data.permissions}
       />
</div>
  )
}

export default RoleList