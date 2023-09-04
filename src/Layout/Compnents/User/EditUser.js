import React from 'react'

const EditUser = () => {
  return (
    <div className='container-lg w-100 '>
    <div className='text-secondary py-3'>
 <h3>Add Client</h3>
</div> 
<form>
<div className='row img-thumbnail p-3'>

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


   <div className="col-md-12 ">
     <div className="d-flex  mt-3">
     <button type="submit"  className="btn btn-info text-white mx-3">Update Details</button>
      <button type="button"  className="btn btn-secondary ">Cancel</button>
       </div>
   </div>
</div>
</form>
</div>
  )
}

export default EditUser