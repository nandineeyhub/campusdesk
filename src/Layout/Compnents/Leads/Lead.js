import React from 'react'
import { NavLink } from 'react-router-dom'

const Lead = () => {
  return (
    <div>
        <div>
    <div className='text-secondary py-2'>
       <h3>Leads</h3>
    </div> 
  <div className='container-lg bg-light border-light rounded w-100 p-5 m-auto  overflow-scroll'>
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
 <NavLink to="/desk/editlead" className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>
 <NavLink className="text-decoration-none">  <i className="fa fa-trash text-dark fs-5 mx-1"></i></NavLink>
 <NavLink to="/desk/viewlead" className="text-decoration-none"> <i className="fa fa-eye fs-4 text-dark mx-1"></i></NavLink>
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
    </div>
  )
}

export default Lead