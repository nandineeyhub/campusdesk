import { Dialog } from '@mui/material'
import React from 'react'

const RoleView = (props) => {
  const { show, onHide, data, modules, permissions } = props
  console.log(permissions)
  console.log(modules)


  return (
    <div >
      <Dialog
        open={show}
        fullWidth={true}
        maxWidth="sm"
      >
        <div id="view_client" className='overflow-hidden'>

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
                    <th>Add</th>
                    <th> Edit </th>
                    <th> Update</th>
                    <th> Delete </th>
                  </thead>

                  <tbody>





                    {modules != undefined && modules.length > 0 && modules.map((module) => {
                      return <tr>

                        <td>{module.name}</td> <td>{data.permissions != undefined && data.permissions.length > 0 && data.permissions.find((permission) => (permission.permissions == "add_"+ module.slug)) ? <i className='fa fa-check text-success'></i> : <i className='fa fa-times text-danger'></i>}</td>
                        <td>{data.permissions != undefined && data.permissions.length > 0 && data.permissions.find((permission) => (permission.permissions == "edit_"+ module.slug)) ? <i className='fa fa-check text-success'></i> : <i className='fa fa-times text-danger'></i>}</td>
                        <td>{data.permissions != undefined && data.permissions.length > 0 && data.permissions.find((permission) => (permission.permissions == "update_"+ module.slug)) ? <i className='fa fa-check text-success'></i> : <i className='fa fa-times text-danger'></i>}</td>
                        <td>{data.permissions != undefined && data.permissions.length > 0 && data.permissions.find((permission) => (permission.permissions == "delete_"+ module.slug)) ? <i className='fa fa-check text-success'></i> : <i className='fa fa-times  text-danger'></i>}</td>

                      </tr>
                    })}




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