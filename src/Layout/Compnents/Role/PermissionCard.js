import React, { useState } from 'react'

const PermissionCard = ({id, module, permissions, handleSelectAll, handleClick,  isCheckone}) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  return (
    <div className='accordion '>
    <div class="accordion-item">
    <h2 class="accordion-header" >
      {<button  className="accordion-button collapsed  accordian-height" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`}  aria-expanded="false" >
        <div className='d-flex '>
            <input type='checkbox' onClick={(e)=>{
              setIsCheckAll(!isCheckAll);
              handleSelectAll(e, module.slug, isCheckAll)
            }} checked={isCheckAll} className='mx-2' ></input>
            <label>{module.name}</label>
         

        </div>
      </button>}
    </h2>
    <div id={id} className="accordion-collapse collapse"  >
      <div class="accordion-body d-flex justify-content-around ">
         {
       permissions !=undefined && permissions.length>0 &&   permissions?.map((permission)=>{
            return( <div>
             
              <input onChange={(e)=>{handleClick(e,permission.slug, module.slug)}}  checked={isCheckone(permission.slug+"_"+module.slug)} type='checkbox'></input>
              <label className='mx-2'>{permission.name}</label>
            </div>)
          })
         }
        </div>
    </div>
  </div>
  </div>
  )
}

export default PermissionCard