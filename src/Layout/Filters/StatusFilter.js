import React from 'react'
import { ThemeContext } from '../../theme-context'
const StatusFilter = ({handleFilter}) => {
  const { theme, toggle } = React.useContext(ThemeContext)
  return (
    <div>
        <select onChange={(e)=>{handleFilter(e)}} name='status' className={`${theme.backgroundColor == 'black' ? "dark":"" }  p-2 border border-muted`}>
            <option value="">select status</option>
     
              
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
          
       
        </select>
    </div>
  )
}

export default StatusFilter