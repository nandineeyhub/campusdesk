import React, { useEffect, useState } from 'react'

const Pagination = ({ handlepageChange, pages, currentPage, setCurrentPage, totalPages }) => {




  console.log( totalPages == currentPage)

  return (
    <nav aria-label="Page navigation example d-flex">

      <ul class="pagination">
        <li class="page-item">
          <button disabled={ currentPage == 1 }  onClick={()=>{
           currentPage != 1 && setCurrentPage(currentPage-1)
          }} class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </button>
        </li>

        {

           pages.map ((page)=>{ return (<li  class={`page-item `}><div className={`${currentPage == page? "bg-light text-black page-link":"page-link"}`} onClick={()=>{handlepageChange(page)}}  >{page}</div></li>)})

        }

        <li class="page-item">
          <button disabled={ totalPages == currentPage } onClick={()=>{
           totalPages > currentPage && setCurrentPage(currentPage+1)
          }} class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination