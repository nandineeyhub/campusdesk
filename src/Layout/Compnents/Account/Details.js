import React from 'react'

const Details = () => {
  return (
        <div className='App'>
     <div className='text-secondary py-2'>
     <h3> Details</h3>
    </div> 
        <div className='   rounded w-75 p-3 m-auto img-thumbnail p-3'>
        
        {/* <div className=''>
            <img className='mx-auto rounded-circle img-fluid' style={{height:"200px", width:"200px"}} src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'></img>
        </div> */}
        <div className='container-lg '>
            <div className='my-2'> <h6> Mark Wheeler </h6></div>
        </div>
        <div className='container-lg '>
            <div className='my-2'> <h6> Username : markwheeler234 </h6></div>
        </div>
        <div className='container-lg '>
            <div className='my-2'> <h6> Designation : User 765 </h6></div>
        </div>
        <div className='container-lg '>
            <div className='my-2'> <h6> Phone Number : 9654781275</h6></div>
        </div>
        <div className='container-lg '>
            <div className='my-2'> <h6>Institution : Ajay Kumar Garg Engineering College</h6></div>
        </div>
        <div className='container-lg '>
            <div className='my-2'> <h6> Joined on : 26/03/2023</h6></div>
        </div>
      
  </div>
</div>
  )
}

export default Details