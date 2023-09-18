import React from 'react'

const StepFilter = ({handleFilter}) => {
  return (
    <div>
        <select onChange={(e)=>{handleFilter(e)}} name='step' className='form-control'>
            <option value="">select step</option>

                   <option value="Lead">Lead</option>
                   <option value="HotLead">HotLead</option>
                   <option value="Customer">Customer</option>

        </select>
    </div>
  )
}

export default StepFilter