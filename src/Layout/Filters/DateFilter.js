import React from 'react'

const DateFilter = ({handleFilter}) => {
  return (
    <div>
        <input onChange={(e)=>{handleFilter(e)}} type='date' name='enquiryDate' className='form-control'></input>
    </div>
  )
}

export default DateFilter