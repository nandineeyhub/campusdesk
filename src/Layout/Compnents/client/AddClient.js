import React, { useState } from 'react'

const AddClient = () => {

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
     <h3>Add Client</h3>
    </div> 
    <form>
    <div className='row img-thumbnail p-3'>
    <div className='col-md-4 '>
       <label for="phone" className="required">Campus Code</label>
       <input className='form-control' name='code' type="text" placeholder='Code'></input>
       </div>
       <div className='col-md-4 my-2'>
        <label for="name" className="required">Campus Name</label>
        <input className='form-control ' name='name' type="text" placeholder='Name'></input>
       </div>
       <div className='col-md-4 my-2'>
        <label for="name" className="required">Contact Person</label>
        <input className='form-control ' name='name' type="text" placeholder='Name'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="email" className="required">Email</label>
       <input className='form-control' name='email' type="text" placeholder='Email'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">Phone</label>
       <input className='form-control' name='phone' type="text" placeholder='Phone'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">Address</label>
       <input className='form-control' name='address' type="text" placeholder='Phone'></input>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">Country</label>
       <select className='form-control' name='country' type="text" placeholder=''>
          <option value="" selected>--Choose Country--</option>
          <option value="1" selected>India</option>
       </select>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">State</label>
       <select className='form-control' name='state' type="text" placeholder=''>
          <option value="" selected>--Choose State--</option>
       </select>
       </div>
       <div className='col-md-4 my-2'>
       <label for="phone" className="required">City</label>
       <select className='form-control' name='city' type="text" placeholder=''>
          <option value="" selected>--Choose City--</option>
       </select>
       </div>
       <div className='col-md-4 my-3'>
       <label for="phone" className="required">Password</label>
       <div className="mb-3 input-group">
              <input className='form-control ' name='password'  type={toggleview?"text":"password"} placeholder='password'></input>
              <span className='mx-1'  onClick={()=>{toggle()}}> {toggleview ? <i className="fa fa-eye form-control"/>:<i className="fa fa-eye-slash form-control"/> }</span>
            </div>
       </div>
       <div className='col-md-4 my-3 '>
       <label for="phone" className="required">Confirm Password</label>
       <div className="mb-3 input-group">
              <input className='form-control ' name='confirmPassword'  type={ctoggleview?"text":"password"} placeholder='Confirm Password'></input>
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

export default AddClient