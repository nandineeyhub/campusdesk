import React, { useState } from 'react'

const AddUser = () => {
  const [toggleview, setToggleView] = useState(false)
  const [ctoggleview, setcToggleView] = useState(false) 
  const toggle = () => {
    if (toggleview) setToggleView(false)
    else setToggleView(true)
  }
  const ctoggle = () => {
    if (ctoggleview) setcToggleView(false)
    else setcToggleView(true)
  } 

  return (
    <div className='container-lg w-100 '>
        <div className='text-secondary py-2 App'>
     <h3>Add User</h3>
    </div> 
    <form>
    <div className='row img-thumbnail p-3'>
    <div className='col-md-4 my-2'>
       <label for="phone" className="required">User Code</label>
       <input className='form-control' name='code' type="text" placeholder='Code'></input>
       </div>
       <div className='col-md-4 my-2'>
        <label for="name" className="required"> Name</label>
        <input className='form-control' name='name' type="text" placeholder='Name'></input>
       </div>
      
       <div className='col-md-4 my-2'>
       <label for="email" className="required">Email</label>
       <input className='form-control' name='email' type="text" placeholder='Email'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">Phone</label>
       <input className='form-control' name='phone' type="text" placeholder='Phone'></input>
       </div>
   
       <div className='col-md-4 my-3'>
       <div className="mb-3 input-group">
              <input className='form-control ' name='password'  type={toggleview?"text":"password"} placeholder='password'></input>
              <span className='mx-1'  onClick={()=>{toggle()}}> {toggleview ? <i className="fa fa-eye form-control"/>:<i className="fa fa-eye-slash form-control"/> }</span>
            </div>
      
       </div>
       <div className='col-md-4 my-3 '>
       <div className="mb-3 input-group">
              <input className='form-control ' name='confirmPassword' type={ctoggleview?"text":"password"} placeholder='Confirm Password'></input>
              <span className='mx-1'  onClick={()=>{ctoggle()}}> {ctoggleview ? <i className="fa fa-eye form-control"/>:<i className="fa fa-eye-slash form-control"/> }</span>
            </div>
      
       </div>
       <div className="col-md-12 ">
         <div className="d-flex  mt-3">
         <button type="submit"  className="btn btn-info text-white mx-3">Add Details</button>
          <button type="button"  className="btn btn-secondary ">Cancel</button>
           </div>
       </div>
    </div>
    </form>
    </div>
  )
}

export default AddUser