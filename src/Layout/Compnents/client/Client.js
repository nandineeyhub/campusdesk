import React from 'react'
import ClientSidebar from './ClientSidebar'
import { Outlet } from 'react-router-dom'
import ClientList from './ClientList'

const Client = () => {
  return (
 <div>
    <div className="container-fluid">
    <div className="row flex-nowrap h-100">
     <ClientSidebar/>
     <div class="col py-3">
          <Outlet/>
        </div>
     </div>
     </div>
 </div>
  )
}

export default Client