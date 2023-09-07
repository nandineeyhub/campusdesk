import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from '../../../popups/DeletePopup';
import LeadView from './LeadView';

const EnquiryList = () => {
    const [open, setOpen] = useState(false)
    const [viewopen, setViewOpen] = useState(false);
     const handleSelect =(type)=>{
  
      if(type != 'view'){
          setOpen(true)
      }
      else{
        setViewOpen(true)
    }
     
      }
      const navigate = useNavigate()  
  return (
    <div className='App'>
    <div>
<div className='text-secondary py-2'>

   <h3>Enquiry</h3>
</div> 
<div className='container-lg bg-light border-light rounded w-100 p-3 m-auto  overflow-scroll'>
<div className='px-3 m-2 d-flex justify-content-end'><button className='btn btn-info text-white' onClick={()=>{navigate("/desk/enquiry/addenquiry")}}>Add New Enquiry</button></div>
<table className='table table-striped'>
  <thead >
      <th scope='col'>Date</th>
      <th scope='col'>Name</th>
      <th scope='col'>Email</th>
      <th scope='col'>Phone</th>
      <th scope='col'>Interest</th>
      <th scope='col'>Step</th>
      <th scope='col'>Status</th>
      <th scope='col'>Action</th>

  </thead>
  <tbody>
<tr>
<th scope="row">02/03/2023</th>
<td>Jacob</td>
<td>jacob@gmail.com</td>
<td>9547863217</td>
<td>Science</td>
<td><p className='bg-warning text-white'>Hot Lead</p></td>
<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center '>
<NavLink to="/desk/enquiry/editenquiry" className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>
<NavLink className="text-decoration-none"  onClick={() => handleSelect('del')}>  <i className="fa fa-trash text-dark fs-5 mx-1" ></i></NavLink>
<NavLink  className="text-decoration-none"  onClick={() => handleSelect('view')}> <i className="fa fa-eye fs-4 text-dark mx-1"></i></NavLink>
</div></td>
</tr>
<tr >
<th scope="row">01/2/2023</th>
<td>Mark</td>
<td>Mark@gmail.com</td>
<td>9547863217</td>
<td>commerce</td>
<td><p className='bg-warning text-white'>Hot Lead</p></td>
<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
<i className="fa fa-edit fs-5 mx-1"></i>
<i className="fa fa-trash fs-5 mx-1"></i>
<i className="fa fa-eye fs-4 mx-1"></i>
</div></td>
</tr>

<tr>
<th scope="row">3/05/2021</th>
<td>Larry</td>
<td>larry@gmail.com</td>
<td>9547863217</td>
<td>Arts</td>
<td><p className='bg-info text-white'>Customer</p></td>
<td><p className='bg-danger text-white '>Inactive</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
<i className="fa fa-edit fs-5 mx-1"></i>
<i className="fa fa-trash fs-5 mx-1"></i>
<i className="fa fa-eye fs-4 mx-1"></i>
</div></td>
</tr>
<tr >
<th scope="row">04/5/2006</th>
<td>Mark</td>
<td>Mark@gmail.com</td>
<td>9547863217</td>
<td>Science</td>
<td><p className='bg-success text-white'>Lead</p></td>
<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
<i className="fa fa-edit fs-5 mx-1"></i>
<i className="fa fa-trash fs-5 mx-1"></i>
<i className="fa fa-eye fs-4 mx-1"></i>
</div></td>
</tr>
<tr>
<th scope="row">05/9/2023</th>
<td>Jacob</td>
<td>jacob@gmail.com</td>
<td>9547863217</td>
<td>Arts</td>
<td><p className='bg-info text-white'>Customer</p></td>
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
</div>
<Modal show={open}
        onHide={() => setOpen(false)} />
 <LeadView show={viewopen}
        onHide={() => setViewOpen(false)}/>
</div>
  )
}

export default EnquiryList