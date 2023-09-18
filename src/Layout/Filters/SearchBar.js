import React from 'react'

const SearchBar = ({handleFilter, getdata}) => {
  return (
    <div>
        <form className='d-flex'>
          <input onChange={(e)=>{handleFilter(e)}} name='search' className='form-control'></input>
          <button onClick={()=>{getdata()}} type='button' className='btn btn-info mx-1 text-white'>Search</button>
        </form>
    </div>
  )
}

export default SearchBar