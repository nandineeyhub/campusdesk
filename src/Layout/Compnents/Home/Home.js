import React from 'react'
import Sidebar from './Sidebar'

import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <div className="container-fluid ">
    <div className="row flex-nowrap ">
     <Sidebar/>
     <div class="col py-3 overflow-y-scroll">
            <Outlet/>
     </div>
     </div>
     </div>
 </div>
  )
}

export default Home