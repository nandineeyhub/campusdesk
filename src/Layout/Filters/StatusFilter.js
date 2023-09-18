import React from 'react'

const StatusFilter = ({handleFilter}) => {
  return (
    <div>
        <select onChange={(e)=>{handleFilter(e)}} name='status' className='form-control'>
            <option value="">select status</option>
     
              
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
          
       
        </select>
    </div>
  )
}

export default StatusFilter