import React, { useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { useEffect } from 'react'
import { ApiLoader } from '../../../Helper/common'
import { NavLink } from 'react-router-dom'

const Statistics = () => {
  const [value, setValue] = useState([])
  const [loader,setLoader]=useState(false);

  const getDetails = async () => {
     setLoader(true)
     try{
       const response = await callAPI(apiUrls.dashboard, {} , 'GET')
       setLoader(false)
       if(response.data.isSuccess){
          setValue(response.data.data)
       } else{
          
       }
     } catch(e){
          setLoader(false)
     }
  }
  useEffect(()=>{getDetails()},[])
  console.log(value)
  return (
   
    <div className='container-lg '>
     {loader && <ApiLoader/>}
        <div className='text-secondary '>
            <h4>Desk Stats</h4>
        </div>
         <div className='d-flex justify-content-center align-items-center App'>
         <NavLink to="/desk/enquiry" className=" text-decoration-none w-50">
          <div className='bg-success text-white px-5 py-3 m-3 border rounded '>
              <h5> Leads { value.totalLead }</h5>
         </div></NavLink>
         <NavLink  to="/desk/enquiry" className=" text-decoration-none w-50 ">
          <div className='bg-warning text-white px-5 py-3 m-3 border rounded '>
           <h5> Hot Leads {value.totalHotLead} </h5>
         </div></NavLink>
         <NavLink  to="/desk/enquiry" className=" text-decoration-none  w-50 "> <div className='bg-danger text-white px-5  py-3 m-3 border rounded '>
           <h5>Customers {value.client} </h5>
         </div></NavLink>
         </div>
         
    </div>
  )
}

export default Statistics