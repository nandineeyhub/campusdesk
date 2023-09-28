import React, { useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { useEffect } from 'react'
import { ApiLoader } from '../../../Helper/common'

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
   
    <div className='container-lg  App'>
     {loader && <ApiLoader/>}
        <div className='text-secondary py-3'>
            <h3>Desk Stats</h3>
        </div>
         <div className='d-flex justify-content-center align-items-center'>
         <div className='bg-success text-white px-5 py-3 m-3 border rounded w-25'>
              <h5> { value.totalLead }  Leads </h5>
         </div>
         <div className='bg-warning text-white px-5 py-3 m-3 border rounded w-25'>
              <h5>{value.totalHotLead} Hot Leads </h5>
         </div>
         <div className='bg-danger text-white px-5  py-3 m-3 border rounded w-25'>
              <h5> {value.client} Customers </h5>
         </div>
         </div>
         
    </div>
  )
}

export default Statistics