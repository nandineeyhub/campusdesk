import React from 'react';
import { ThemeContext } from '../../src/theme-context'

import UserDropDown from './Compnents/UserDropDown'


const Header = () => {
  const { theme, toggle } = React.useContext(ThemeContext)
  
  const user = JSON.parse(localStorage.getItem("user")) 

  return (

    <nav  className={`shadow-sm navbar navbar-expand-lg ${theme.backgroundColor == 'black'?"":"bg-body-tertiary"} `}>
      <div className="container-lg align-items-center justify-content-between my-1">

        <div className='d-flex justify-items-center align-items-center'>
          

          <h4 className='text-secondary mx-3'>Campus Desk</h4>
        </div>
       <div className="d-flex-sm">
    
        <div className="collapse d-flex justify-content-end" >
        <button
          type="button"
          onClick={toggle}
          style={{
            backgroundColor: theme.backgroundColor=='black'?theme.backgroundColor:"",
            color: theme.color,
           
          }}
          className='btn btn-light'
          
        >{theme.backgroundColor == 'black'? <i class="fa fa-sun-o"></i>:<i class="fa fa-moon-o"></i>}</button>
          <div className='mx-3'>

              <UserDropDown/>
  
          </div>
          {/* <div className='text-secondary '>
              <p className='my-0'>{user.name}</p>
              <p className='my-0'>{user.email}</p>
          </div> */}

        </div>

       </div>


      </div>

    </nav>

  )
}

export default Header