import React from 'react'

const ViewPopup = ({view}) => {
  return (
    <div className='container-lg rounded w-25 p-3 overlay  border'>
    
    
       <div className='my-2'> <h6> Role Name </h6></div>
 
   <div className='container-lg'>
        <div className='d-flex justify-content-around align-items-center'>
            <span> Get <span><i className='fa fa-check'></i></span></span> 
            <span> Add <span><i className='fa fa-check'></i></span></span> 
            <span> Edit <span><i className='fa fa-times'></i></span></span> 
            <span> Delete <span><i className='fa fa-check'></i></span></span> 
        </div>
   </div>
   <div className='d-flex justify-content-center align-items-center p-2'>
          <button onClick={()=>{view()}} className='btn btn-danger'>Close</button>
        
        </div>
    </div>
  )
}

export default ViewPopup