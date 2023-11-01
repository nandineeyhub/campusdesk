import React from 'react'
import { ThemeContext } from '../../theme-context'
const SearchBar = ({handleFilter, getdata, setCurrentPage, setItemsPerPage}) => {
  const { theme, toggle } = React.useContext(ThemeContext)
  return (
    <div>
        <div className='d-flex'>
          <input type='search' onChange={(e)=>{handleFilter(e)}} name='search' className={`${theme.backgroundColor == 'black' ? "dark":"" } form-control`} ></input>
          <button onClick={()=>{
            setCurrentPage(1)
            setItemsPerPage(10)
            getdata()}} type='button' className='btn btn-info mx-1 text-white'>Search</button>
        </div>
    </div>
  )
}

export default SearchBar