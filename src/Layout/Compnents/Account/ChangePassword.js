import React from 'react'

const ChangePassword = () => {
  return (
    <div className='container-lg w-50 '>
    <div className='text-secondary py-3'>
     <h3> Change Password</h3>
    </div> 
    <form className='img-thumbnail p-5'>
    <div className="mb-3">
      <input className='form-control' name='username' type="text" placeholder='current password'></input>
    </div>
    <div className="mb-3">
      <input className='form-control' name='password' type="password" placeholder='new password'></input>
    </div>
   
       <button type='submit' className='btn btn-info text-white px-3 form-control'> Change Password</button>
        
  
    </form>
    </div>
  )
}

export default ChangePassword