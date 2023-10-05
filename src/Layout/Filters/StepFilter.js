import React from 'react'

const StepFilter = ({handleFilter}) => {
  return (
    <div>
        <select onChange={(e)=>{handleFilter(e)}} name='step' className=' p-2 border border-muted'>
            <option value="">select step</option>

                   <option value="Lead">Lead</option>
                   <option value="HotLead">HotLead</option>
                   <option value="Client">Customer</option>

        </select>
    </div>
  )
}

export default StepFilter