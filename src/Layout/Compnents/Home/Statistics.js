import React, { useState } from 'react'

const Statistics = () => {
    
  return (
    <div className='container-lg  App'>
        <div className='text-secondary py-3'>
            <h3>Desk Stats</h3>
        </div>
         <div className='d-flex justify-content-center align-items-center'>
         <div className='bg-success text-white px-5 py-3 m-3 border rounded w-25'>
              <h5> 24 Leads </h5>
         </div>
         <div className='bg-warning text-white px-5 py-3 m-3 border rounded w-25'>
              <h5> 10 Hot Leads </h5>
         </div>
         <div className='bg-danger text-white px-5  py-3 m-3 border rounded w-25'>
              <h5> 5 Deadlines </h5>
         </div>
         </div>
         
    </div>
  )
}

export default Statistics