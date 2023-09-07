import Modal from '../../../popups/DeletePopup'
import React, { useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import ClientView from './ClientView'

const ClientList = () => {
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
    <div className=' overflow-scroll'>
          <div className='text-secondary py-2 App'>
             
             <h3>Client List</h3>
          </div> 
         
        <div className='container-lg bg-light border-light rounded w-100 p-3 '>
        <div className='px-3 m-2 d-flex justify-content-end'><button className='btn btn-info text-white' onClick={()=>{navigate("/desk/client/addclient")}}>Add New Client</button></div>
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
   <tr>
      <th scope="row">2</th>
      <td>Jasmine College</td>
      <td>Jacob</td>
      <td>jacob@gmail.com</td>
      <td>9547863217</td>
      <td><p className='bg-success text-white'>Active</p></td>
      <td><div classname='d-flex justify-content-center align-items-center '>
       <NavLink to="/desk/client/editclient" className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1 "></i> </NavLink>
       <NavLink className="text-decoration-none">   <i className="fa fa-trash text-dark fs-5 mx-1"  onClick={() => handleSelect('del')}></i></NavLink>
 <NavLink  className="text-decoration-none"  onClick={() => handleSelect('view')}> <i className="fa fa-eye fs-4 text-dark mx-1" ></i></NavLink>
 
        </div></td>
    </tr>
    <tr >
      <th scope="row">1</th>
      <td>Marker College</td>
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
      <td>Larry International</td>
      <td>Mala</td>
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
      <td>Mala Intermediate School</td>
      <td>Mala</td>
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
      <td>Jaya ben College</td>
      <td>Mala</td>
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
    <Modal show={open}
        onHide={() => setOpen(false)}/>
        <ClientView show={viewopen}
        onHide={() => setViewOpen(false)}/>
    </div>
  )
}

export default ClientList