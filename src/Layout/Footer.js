import React from 'react'
import { ThemeContext } from '../theme-context';
const Footer = () => {
  const { theme} = React.useContext(ThemeContext)
  return (
    <div className={`border App ${theme.backgroundColor=='black'?"":"bg-light"}`}>
        <div className='text-secondary pt-3'>
          <p>Copyright © 2023 Campus Desk. All Rights Reserved</p>
        </div>
        
    </div>
  )
}

export default Footer