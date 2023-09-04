import React from 'react'

const EnquiryForm = () => {
  return (
    
      <div className='container-lg w-100 '>
           <div className='text-secondary py-2'>
            <h3> Enquiry Form</h3>
        </div> 
           <form className='img-thumbnail p-4'>
            <div className='row'>
              <div className=" col-md-4 mb-3">
                 <label for="name" className="required">Enquiry Date</label>
                 <input placeholder="walkIn Date"  type="date"  className="form-control"  name="walkInDate" />
              </div>
            <div className=" col-md-4 mb-3">
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
            <div className=" col-md-12 mb-3">
            <label for="name" className="required">Message</label>
             <textarea name='message' className='form-control'></textarea>
            </div>
            <div className=" mb-3  ">
              <div>
              <button type='submit' className='btn btn-info text-white px-3 w-25'>Confirm details</button>
              </div>
                 
            </div>
            </div>
            </form>
    </div>
    
  )
}

export default EnquiryForm