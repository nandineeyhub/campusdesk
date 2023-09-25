import React from 'react'

const SearchBar = ({handleFilter, getdata, setCurrentPage, setItemsPerPage}) => {
  return (
    <div>
        <div className='d-flex'>
          <input onChange={(e)=>{handleFilter(e)}} name='search' className='form-control'></input>
          <button onClick={()=>{
            setCurrentPage(1)
            setItemsPerPage(10)
            getdata()}} type='button' className='btn btn-info mx-1 text-white'>Search</button>
        </div>
    </div>
  )
}

export default SearchBar