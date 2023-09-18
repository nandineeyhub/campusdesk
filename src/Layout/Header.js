import React from 'react'

import UserDropDown from './Compnents/UserDropDown'


const Header = ({ handleOpen }) => {

  


  return (

    <nav className="shadow-sm navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-lg align-items-center justify-content-between my-1">

        <div className='d-flex justify-items-center align-items-center'>
          <button className=" btn btn-muted navbar-toggler-icon border-light  " onClick={() => { handleOpen() }}></button>

          <h4 className='text-secondary mx-3'>Campus Desk</h4>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <div className='mx-2'>
         
              <UserDropDown/>
     
                
          </div>
        

        </div>



      </div>

    </nav>

  )
}

export default Header