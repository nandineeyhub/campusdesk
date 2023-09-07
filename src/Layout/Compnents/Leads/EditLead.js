import React from 'react'

const EditLead = () => {
  return (
    <div className='container-lg w-100 '>
    <div className='text-secondary py-3 App'>
 <h3>Update Enquiry</h3>
</div> 
<form>
    <div className='row img-thumbnail p-3'> <div className=" col-md-4 mb-3">
    <label for="name" className="required">Name</label>
    <input className='form-control' name='name' type="text" placeholder='Name'></input>
  </div>
  <div className=" col-md-4 mb-3">
    <label for="name" className="required">Phone</label>
    <input className='form-control' name='phone'  type="text" placeholder='Phone number'></input>
  </div>
 
  <div className=" col-md-4 mb-3">
  <label for="name" className="required">Email</label>
    <input className='form-control' name='email' type="text" placeholder='Email'></input>
  </div>
  <div className=" col-md-4 mb-3">
  <label for="name" className="required">Area of Interest</label>
    <input className='form-control' name='interest' type="text" placeholder='Area of interest'></input>
  </div>
  <div className=" col-md-4 mb-3">
   <label for="name" className="required">Address</label>
    <input className='form-control' name='address' type="text" placeholder='Postal Address'></input>
  </div>
  <div className='col-md-4 my-2'>
   <label for="phone" className="required">Step</label>
   <select className='form-control' name='country' type="text" placeholder=''>
      <option value="" selected>--Choose Step--</option>
      <option value="1" selected>Lead</option>
      <option value="2" selected>Hot Lead</option>
      <option value="3" selected>Customer</option>
   </select>
   </div>
  <div className=" col-md-12 mb-3">
  <label for="name" className="required">Message</label>
   <textarea name='message' className='form-control'></textarea>
  </div>
  <div className=" mb-3  ">
    <div className='d-flex justify-content-center align-items-center mx-2'>
    <button type='submit' className='btn btn-info text-white   '>Update Details</button>
    <button type='submit' className='btn btn-secondary text-white mx-2'>Cancel</button>
    </div>
       
  </div></div>
  </form>
  </div>

  )
}

export default EditLead