import React from 'react'

const EditRole = () => {
  return (
    <div className='container-lg w-100 '>
    <div className='text-secondary py-2 App'>
 <h3>Edit Role</h3>
</div> 
<form>
<div className='row img-thumbnail p-3'>
<div className="col-md-12 d-flex  ">
<div className='col-md-4 m-2 '>
   <label for="phone" className="required">Role Name</label>
   <input className='form-control' name='code' type="text" placeholder='Role name'></input>
   </div>
   <div className='col-md-4 m-2'>
    <label for="name" className="required">Client</label>
   <select className='form-control' name='client'  placeholder=''>
      <option value="" selected>--Choose Client--</option>
   </select>
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

export default EditRole