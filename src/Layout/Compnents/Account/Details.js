import React, { useEffect, useState } from 'react'
import { callAPI } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ApiLoader } from '../../../Helper/common'

const Details = () => {

    const [value, setValue] = useState([])
    const [loader, setLoader] = useState(false)
    const getDetails = async () => {
        setLoader(true)
        try{
           const response = await callAPI(apiUrls.detail, {}, 'GET')
           setLoader(false)
           if(response.data.isSuccess){
              setValue(response.data.data)
           }
        } catch (e){
            setLoader(false)
        }
    } 
    
    useEffect(()=>{
        getDetails()
    },[])

    
  return (
        <div className='App'>
     <div className='text-secondary py-2'>
     <h3> Details </h3>
     </div> 
        <div className='   rounded w-75 p-3 m-auto img-thumbnail p-3'>
        {loader && <ApiLoader/>}
       <div className=' p-5'>
       <div className='d-flex   '>
             { value.image && <div className='college-logo'>
                <img src={"https://onlineprojectprogress.com/Campusdesk/public/upload/client/"+value.image} className='img-fluid'/>
              </div>}
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>School Code</div> <div>{value.schoolCode}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Name</div> <div>{value.name}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Email</div> <div>{value.email}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Phone Number</div> <div>{value.phoneNo}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Contact Person</div> <div>{value.contactPerson}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Status</div> <div>{value.status}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Address</div> <div>{value.address}</div>
          </div>
     </div> 
  </div>
</div>
  )
}

export default Details