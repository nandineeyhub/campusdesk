import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from './AccountSidebar'

const Account = () => {
  return (
    <div>
    <div className="container-fluid">
    <div className="row flex-nowrap">
      <AccountSidebar/>
     <div class="col py-3">
            <Outlet/>
        </div>
     </div>
     </div>
 </div>
  )
}

export default Account