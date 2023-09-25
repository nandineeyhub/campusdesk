import React from 'react'

const DateFilter = ({handleFilter}) => {
  return (
    <div>
        <input onChange={(e)=>{handleFilter(e)}} type='date' name='enquiryDate' className='p-2 border border-muted'></input>
    </div>
  )
}

export default DateFilter