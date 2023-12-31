import { Dialog } from '@mui/material'
import React from 'react'

const ClientView = (props) => {
    const {show, onHide, data} = props
   
    return (
      <div >
        <Dialog
    open={show}
    fullWidth={true}
    maxWidth="sm"
  >
  <div  id="view_client" className='overflow-hidden'>
  
  <div class="modal-content">
  <div className='d-flex justify-content-end'>
  <button type="button"  className="close col-md-1 btn border-white" data-dismiss="modal" aria-label="Close" onClick={onHide}>
    <span aria-hidden="true">  <i class="fa fa-times"></i></span>
  </button>
  </div>
        <div class="modal-body user_details">
        <div class="row">
      <div class="col-lg-12 col-md-12 justify-content-center text-center">
        
          <h4 class="my-1">Client View</h4>
          
      </div>

       <div className=' p-5'>
       <div className='d-flex   '>
             { data.image !=null && <div className='college-logo'>
                <img src={data.image_path} className='img-fluid'/>
              </div>}
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>School Code</div> <div>{data.schoolCode}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Name</div> <div>{data.name}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Email</div> <div>{data.email}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Phone Number</div> <div>{data.phoneNo}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Contact Person</div> <div>{data.contactPerson}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Status</div> <div>{data.status}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-start'>
             <div>Address</div> <div>{data.address}</div>
          </div>
          {/* <div className='d-flex justify-content-between  align-items-between'>
             <div>State</div> <div>{data.state.stateName}</div>
          </div>
          <div className='d-flex justify-content-between  align-items-between'>
             <div>City</div> <div>{data.city.cityName}</div>
          </div> */}
       </div>
      
      </div>
  
          <div className='col-lg-12 col-md-12 my-3  px-3'>
       
    
  
        
          </div>
    </div>
  </div>
  </div>
  </Dialog>
     
  </div>)
}

export default ClientView