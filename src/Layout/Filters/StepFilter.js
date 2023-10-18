import React from 'react'

const StepFilter = ({handleFilter, step}) => {

  return (
    <div>
        <select onChange={(e)=>{handleFilter(e)}} name='step' className=' p-2 border border-muted'>
            <option  value="">select step</option>

                   <option selected={step == "Lead"?true:false} value="Lead">Lead</option>
                   <option selected={step == "HotLead"?true:false} value="HotLead">HotLead</option>
                   <option selected={step == "Client"?true:false} value="Client">Customer</option>

        </select>
    </div>
  )
}

export default StepFilter