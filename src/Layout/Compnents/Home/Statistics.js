import React, { useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { useEffect } from 'react'
import { ApiLoader } from '../../../Helper/common'
import { NavLink, useNavigate } from 'react-router-dom'
import { ErrorMsg } from '../../../Notifications'
import { BarChart, LineChart } from './Charts'
import { green, yellow } from '@mui/material/colors'



const Statistics = () => {
  const [value, setValue] = useState([])
  const [loader,setLoader]=useState(false);
  const [graphData, setGraphData]=useState({
    labels:["lead","hotlead","customer"],
    datasets: [{
      label:"",
      data:[],
      backgroundColor:['#66bb6a'], 
    }],
    
  })

  const navigate = useNavigate()

  const getDetails = async () => {
     setLoader(true)
     try{
       const response = await callAPI(apiUrls.dashboard, {} , 'GET')
       setLoader(false)
       if(response.data.isSuccess){
          setValue(response.data.data)
          setGraphData({
            labels:["lead","hotlead","customer"],
            datasets: [{
              label:"count",
              data:[response.data.data.totalLead,response.data.data.totalHotLead,response.data.data.totalClient],
              backgroundColor:['#66bb6a']
            }]
          })
       } else{
          ErrorMsg(response.data.message)
       }
     } catch(e){
          setLoader(false)
          ErrorMsg(e.message)
     }
  }
   

  useEffect(()=>{getDetails()},[])

  console.log(value)
  return (
    <div  className='container-lg '>
     {loader && <ApiLoader/>}
        <div className='text-secondary '>
            <h4>Desk Stats</h4>
        </div>
        
         <div className='d-flex justify-content-center align-items-center App'>
         <div  onClick={()=>{
         navigate("/desk/enquiry/Lead")}} className=" text-decoration-none w-50">
          <div className='bg-success text-white px-5 py-3 m-3 border rounded '>
              <h5> Leads {value.totalLead} </h5>
         </div></div>
         <div  onClick={()=>{
         navigate("/desk/enquiry/HotLead")}} className=" text-decoration-none w-50 ">
          <div className='bg-warning text-white px-5 py-3 m-3 border rounded '>
           <h5> Hot Leads {value.totalHotLead} </h5>
         </div></div>
         <div   onClick={()=>{
         navigate("/desk/enquiry/Client")}} className=" text-decoration-none  w-50 "> <div className='bg-danger text-white px-5  py-3 m-3 border rounded '>
           <h5> Customers {value.totalClient} </h5>
         </div></div>
         </div>
      <div className='row my-4'>
        <div className='col-md-6'>
          <BarChart chartData={graphData}/>
        </div>
        <div className='col-md-6'>
          <LineChart chartData={graphData}/>
        </div>
      </div>    
    </div>
  )
}

export default Statistics