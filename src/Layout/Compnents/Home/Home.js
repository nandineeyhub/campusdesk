import React from 'react'
import Sidebar from './Sidebar'
import EnquiryForm from './EnquiryForm'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <div className="container-fluid">
    <div className="row flex-nowrap">
     <Sidebar/>
     <div class="col py-3">
            <Outlet/>
        </div>
     </div>
     </div>
 </div>
  )
}

export default Home