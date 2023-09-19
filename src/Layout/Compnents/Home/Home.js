import React, { useState } from 'react'
import Sidebar from './Sidebar'

import { Outlet } from 'react-router-dom'

const Home = () => {
  const [val, setval] = useState(true)
  const n = 5;
  n%2 && console.log("Odd") && setval(false)
  val && console.log("Even")
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