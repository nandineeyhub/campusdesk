import React from 'react'
import '../App.css'
import Dialog from '@mui/material/Dialog';
function Modal(props) {
 
  return (
<Dialog
open={props.show}

>
<div className="delete-popup " >
<div class="modal-content overflow-hidden">
<div className='d-flex justify-content-end'>
<button type="button" className="close col-md-1 btn border-white" data-dismiss="modal" aria-label="Close" onClick={props.onHide}>
  <span aria-hidden="true">  <i class="fa fa-times"></i></span>
</button>
</div>
<div class="modal-body">
<div class="row">
    <div class="col-lg-12 col-md-12 justify-content-center text-center">
      
        <h3 class="mt-3">Are you sure?</h3>
        <p>Do you really want to delete <strong>{props.data.name}</strong>? This process cannot be undone.</p>
    </div>
    <div class="col-lg-12 col-md-12">
        <div class="d-flex justify-content-center btn_form my-3">
            <button type="button" class="btn btn-danger mx-3" onClick={()=>{
              props.deleteData(props.data.id)
            }}>Delete</button>
            <button type="button" class="btn btn-secondary" onClick={props.onHide}>Cancel</button>
        </div>						
    </div>
</div>
</div>
</div>
</div>
</Dialog>)}

export default Modal