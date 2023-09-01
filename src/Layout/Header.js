import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Header = () => {
   const navigate = useNavigate()
  return (
    
      <nav className="navbar navbar-expand-lg  bg-body-tertiary ">
      <div className="container-lg">
     
       {/* <button  className=" btn btn-muted navbar-toggler-icon "></button> */} 
     
           
           <h4 className='text-secondary mx-5'>Campus Desk</h4>
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className='d-md-flex d-lg-flex list-unstyled'>
           <NavLink to="/desk/home" className="text-decoration-none"> <li className='mx-3 mt-3 text-secondary'> Home </li> </NavLink> 
           <NavLink to="/desk/account" className="text-decoration-none"> <li className='mx-3 mt-3 text-secondary'> Account </li> </NavLink> 
           <NavLink to="/desk/client"  className="text-decoration-none">  <li className='mx-3 mt-3 text-secondary'> Clients </li></NavLink>
           <NavLink to="/desk/user" className="text-decoration-none">  <li className='mx-3 mt-3 text-secondary'> Users </li></NavLink>
           <NavLink className="text-decoration-none">   <li className='mx-3 mt-3 text-secondary'> Leads </li></NavLink>
              <button className='btn btn-info text-white mx-3 mt-2' onClick={()=>{navigate('/')}}>Logout</button> 
            </ul>
         </div>
         

        
        </div>
           
        </nav>
  
  )
}

export default Header