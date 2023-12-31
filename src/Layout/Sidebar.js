import React from 'react'
import { NavLink } from 'react-router-dom'
import ValidatePermission from '../Auth/ValidatePermission'
import { ThemeContext } from '../theme-context';

const Sidebar = ({show}) => {
  const { theme} = React.useContext(ThemeContext)
  return (
    <div  className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 overflow-y-hidden ${theme.backgroundColor == 'black'?"":"bg-light"} `}  style={{ backgroundColor: theme.backgroundColor, color: theme.color,}}> 
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
       <NavLink  className=" text-decoration-none d-flex align-items-center pb-3 mb-md-0 me-md-auto text-secondary text-decoration-none">
            <span className="">Menu</span>
            </NavLink>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className="nav-item">
               <NavLink to="/desk" className="my-2 text-decoration-none align-middle px-0 d-flex text-secondary">
                    <i className="fa fa-line-chart"></i> <span className=" mx-2  "><h6>Dashboard</h6></span>
               </NavLink>
            </li>
          { ValidatePermission("view_client") && <li>
               <NavLink to="/desk/client"  className="my-2  text-secondary text-decoration-none px-0 align-middle d-flex">
                    <i className="fa fa-address-card-o"></i> <span className="mx-2 "><h6>Client</h6></span> </NavLink>
               
            </li>}
           { ValidatePermission("view_role") && <li>
               <NavLink to="/desk/role"  className="my-2 text-secondary text-decoration-none px-0 align-middle d-flex">
                    <i className="fa fa-key"></i> <span className="mx-2 "><h6>Role</h6></span> </NavLink>
               
            </li>}
            
           { ValidatePermission("view_user") && <li >
               <NavLink to="/desk/user" className="my-2 text-secondary text-decoration-none px-0 align-middle d-flex ">
                    <i className="	fa fa-user"></i> <span className="mx-2"><h6>User</h6></span></NavLink>
               
            </li>}
           
         { ValidatePermission("view_enquiry") && <li >
               <NavLink to="/desk/enquiry/list" className="my-2 text-secondary text-decoration-none px-0 align-middle d-flex">
                    <i className="fa fa-archive"></i> <span className="mx-2"><h6>Enquiries</h6></span> </NavLink>
            </li>}
        </ul>
        <hr/>
        
    </div>
</div>
  )
}

export default Sidebar