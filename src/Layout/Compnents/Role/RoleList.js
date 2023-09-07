import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from '../../../popups/DeletePopup'
import RoleView from './RoleView'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'


const RoleList = () => {

  const [open, setOpen] = useState(false)
  const [viewopen, setViewOpen] = useState(false);
  const [value, setValue] = useState([])


    const handleList = async () => {
      try{
        const response = await callAPI(apiUrls.getroles, {}, "GET")
        console.log(response)
      } catch(e){
         console.log(e)
      }
    }
  
    const handleSelect =(type)=>{

    if(type != 'view'){
        setOpen(true)
    }
    else{
      setViewOpen(true)
  }
   
    }

    const navigate = useNavigate()

    useEffect(
      ()=>{
        handleList()
      },[]
    )
  return ( 
    <div className='App'>
    <div className='text-secondary py-2 '>

     
       <h3>Role List</h3>
    </div> 
   
  <div className='container-lg bg-light border-light rounded w-100 p-3 m-auto  overflow-scroll'>
  <div className='px-3 m-2 d-flex justify-content-end'><button className='btn btn-info text-white' onClick={()=>{navigate("/desk/role/addrole")}}>Add New Role</button></div>
  <table className='table table-striped'>
      <thead >
          <th scope='col'>Id</th>
          <th scope='col'> Name</th>
          <th scope='col'>Created By</th>
          <th scope='col'>Created Date</th>
          <th scope='col'>Modified By</th>
          <th scope='col'>Modified Date</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>

      </thead>
      
      <tbody>
<tr>
<th scope="row">2</th>
<td> Role name </td>
<td>Jacob</td>
<td>02/03/2023</td>
<td>Jacob</td>
<td>02/03/2023</td>

<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center '>
 <NavLink to="/desk/role/editrole" className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>
 <NavLink className="text-decoration-none">   <i className="fa fa-trash text-dark fs-5 mx-1"  onClick={() => handleSelect('del')}></i></NavLink>
 <NavLink  className="text-decoration-none"  onClick={() => handleSelect('view')}> <i className="fa fa-eye fs-4 text-dark mx-1" ></i></NavLink>
 
  </div></td>
</tr>
<tr >
<th scope="row">1</th>
<td> Role name </td>
<td>Mark</td>
<td>02/03/2023</td>
<td>Jacob</td>
<td>02/03/2023</td>

<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
  <i className="fa fa-edit fs-5 mx-1"></i>
  <i className="fa fa-trash fs-5 mx-1"></i>
  <i className="fa fa-eye fs-4 mx-1"></i>
  </div></td>
</tr>

<tr>
<th scope="row">3</th>
<td> Role name </td>
<td>Mala</td>
<td>02/03/2023</td>
<td>Jacob</td>
<td>02/03/2023</td>

<td><p className='bg-danger text-white '>Inactive</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
  <i className="fa fa-edit fs-5 mx-1"></i>
  <i className="fa fa-trash fs-5 mx-1"></i>
  <i className="fa fa-eye fs-4 mx-1"></i>
  </div></td>
</tr>
<tr >
<th scope="row">4</th>
<td> Role name </td>
<td>Mala</td>
<td>02/03/2023</td>
<td>Jacob</td>
<td>02/03/2023</td>

<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
  <i className="fa fa-edit fs-5 mx-1"></i>
  <i className="fa fa-trash fs-5 mx-1"></i>
  <i className="fa fa-eye fs-4 mx-1"></i>
  </div></td>
</tr>
<tr>
<th scope="row">5</th>
<td> Role name </td>
<td>Mala</td>
<td>02/03/2023</td>
<td>Jacob</td>
<td>02/03/2023</td>

<td><p className='bg-danger text-white'>Inactive</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
  <i className="fa fa-edit fs-5 mx-1"></i>
  <i className="fa fa-trash fs-5 mx-1"></i>
  <i className="fa fa-eye fs-4 mx-1"></i>
  </div></td>
</tr>

</tbody>
  </table>
</div>

<Modal show={open}
        onHide={() => setOpen(false)}/>
        <RoleView show={viewopen}
        onHide={() => setViewOpen(false)} />
</div>
  )
}

export default RoleList