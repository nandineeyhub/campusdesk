import React from 'react'
import UserSidebar from './UserSidebar'
import { Outlet } from 'react-router-dom'

const User = () => {
  return (
    <div>
    <div className="container-fluid">
    <div className="row flex-nowrap h-100">
     <UserSidebar/>
     <div class="col py-3">
          <Outlet/>
        </div>
     </div>
     </div>
 </div>
  )
}

export default User