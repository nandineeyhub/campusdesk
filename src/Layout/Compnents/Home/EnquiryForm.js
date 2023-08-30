import React from 'react'

const EnquiryForm = () => {
  return (
    <div className='container-lg w-50 '>
           <div className='text-secondary py-3'>
            <h3> Enquiry Form</h3>
        </div> 
           <form className='img-thumbnail p-5'>
            <div className="mb-3">
              <input className='form-control' name='name' type="text" placeholder='Name'></input>
            </div>
            <div className="mb-3">
              <input className='form-control' name='phone'  type="text" placeholder='Phone number'></input>
            </div>
            <div className="mb-3">
              <input className='form-control' name='altphone'  type="text" placeholder='Alternate phone number'></input>
            </div>
            <div className="mb-3">
              <input className='form-control' name='email' type="text" placeholder='Email'></input>
            </div>
            <div className="mb-3">
              <input className='form-control' name='interest' type="text" placeholder='Area of interest'></input>
            </div>
            <div className="mb-3">
              <input className='form-control' name='address' type="text" placeholder='Postal Address'></input>
            </div>
            <div className="mb-3  ">
               <button type='submit' className='btn btn-info text-white px-3 form-control'>Confirm details</button>
                 
            </div>
            </form>
    </div>
  )
}

export default EnquiryForm