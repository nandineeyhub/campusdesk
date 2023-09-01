import React from 'react'
import { NavLink } from 'react-router-dom'

const UserList = () => {
  return (
    <div>
    <div className='text-secondary py-2'>
       <h3>User List</h3>
    </div> 
  <div className='container-lg bg-light border-light rounded w-100 p-5 m-auto  overflow-scroll'>
  <table className='table table-striped'>
      <thead >
          <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Phone</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>

      </thead>
      <tbody>
<tr>
<th scope="row">2</th>
<td>Jacob</td>
<td>jacob@gmail.com</td>
<td>9547863217</td>
<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center '>
 <NavLink to="/desk/client/editclient" className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>
 <NavLink className="text-decoration-none">  <i className="fa fa-trash text-dark fs-5 mx-1"></i></NavLink>
 <NavLink className="text-decoration-none"> <i className="fa fa-eye fs-4 text-dark mx-1"></i></NavLink>
  </div></td>
</tr>
<tr >
<th scope="row">1</th>
<td>Mark</td>
<td>Mark@gmail.com</td>
<td>9547863217</td>
<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
  <i className="fa fa-edit fs-5 mx-1"></i>
  <i className="fa fa-trash fs-5 mx-1"></i>
  <i className="fa fa-eye fs-4 mx-1"></i>
  </div></td>
</tr>

<tr>
<th scope="row">3</th>
<td>Larry</td>
<td>larry@gmail.com</td>
<td>9547863217</td>
<td><p className='bg-danger text-white '>Inactive</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
  <i className="fa fa-edit fs-5 mx-1"></i>
  <i className="fa fa-trash fs-5 mx-1"></i>
  <i className="fa fa-eye fs-4 mx-1"></i>
  </div></td>
</tr>
<tr >
<th scope="row">4</th>
<td>Mark</td>
<td>Mark@gmail.com</td>
<td>9547863217</td>
<td><p className='bg-success text-white'>Active</p></td>
<td><div classname='d-flex justify-content-center align-items-center'>
  <i className="fa fa-edit fs-5 mx-1"></i>
  <i className="fa fa-trash fs-5 mx-1"></i>
  <i className="fa fa-eye fs-4 mx-1"></i>
  </div></td>
</tr>
<tr>
<th scope="row">5</th>
<td>Jacob</td>
<td>jacob@gmail.com</td>
<td>9547863217</td>
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
  )
}

export default UserList