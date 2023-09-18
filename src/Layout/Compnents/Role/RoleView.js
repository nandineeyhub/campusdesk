import { Dialog } from '@mui/material'
import React from 'react'

const RoleView = (props) => {
  const {show, onHide ,data} = props
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
<button type="button" className="close col-md-1 btn border-white" data-dismiss="modal" aria-label="Close" onClick={props.onHide}>
  <span aria-hidden="true">  <i class="fa fa-times"></i></span>
</button>
</div>
      <div class="modal-body user_details">
      <div class="row">
    <div class="col-lg-12 col-md-12 justify-content-center text-center">
      
        <h4 class="my-1">{data.name}</h4>
        
    </div></div>

        <div className='col-lg-12 col-md-12 my-3  px-3'>
        <table className='table' >
            
           <thead>
            <th> Name </th> 
             <th>Get</th>
            <th> Add </th> 
            <th> Edit</th> 
            <th> Delete </th> 
           </thead>

           <tbody>
            
           </tbody>
        </table>
  

      
    </div>
  </div>
</div>
</div>
</Dialog>
   
</div>
  )
}

export default RoleView