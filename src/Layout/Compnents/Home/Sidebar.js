import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
  
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light overflow-hidden">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 ">
               <NavLink className=" text-decoration-none d-flex align-items-center pb-3 mb-md-0 me-md-auto text-secondary text-decoration-none">
                    <span className="fs-5 d-sm-inline">Menu</span>
                    </NavLink>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                       <NavLink to="/desk/home/enquiryform" className="my-2 text-decoration-none align-middle px-0 d-flex text-secondary">
                            <i className="fa fa-home "></i> <span className=" mx-2  "><h6>Enquiry from</h6></span>
                        </NavLink>
                    </li>
                    <li >
                       <NavLink to="/desk/home"   className="my-2 text-secondary text-decoration-none px-0 align-middle d-flex">
                            <i className="fa fa-line-chart"></i> <span className="mx-2 "><h6>Follow ups</h6></span> </NavLink>
                       
                    </li>
                    <li >
                       <NavLink to="/desk/home/statistics" className="my-2 d-flex text-decoration-none px-0 align-middle text-secondary my-2 d-flex">
                            <i className="fa fa-address-book"></i> <span className="mx-2"><h6>Statistics</h6></span></NavLink>
                    </li>
                    <li>
                       <NavLink href="#submenu2" data-bs-toggle="collapse" className="my-2 d-flex text-secondary text-decoration-none px-0 align-middle ">
                            <i className="	fa fa-bolt"></i> <span className="mx-2"><h6>Help & Support</h6></span></NavLink>
                    </li>
                   
                    <li >
                       <NavLink  className=" my-2 d-flex text-secondary text-decoration-none px-0 align-middle">
                            <i className="fa fa-gear"></i> <span className="mx-2"><h6>Settings</h6></span> </NavLink>
                    </li>
                </ul>
                <hr/>
                
            </div>
        </div>
      
  )
}

export default Sidebar