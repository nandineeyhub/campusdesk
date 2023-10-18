import React, { useState } from 'react'
import { useEffect } from 'react';


const PermissionCard = ({ id, module, permissions, handleSelectAll, handleClick, isCheckone,  isCheck }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);

  const [array, setArray] = useState([])

const checkOnEdit = () => {
    var ar =[]
    permissions.map((per)=>{
      const val  =  isCheck.filter((check)=>{return check == per.slug+"_"+module.slug})
      if(val[0] != undefined)  ar.push(val[0])
      
    })
    if(ar.length == 5){
      setIsCheckAll(true) 
    }
    setArray(ar)
}

  const handleParentCheck = (e, val) => {
    const { checked } = e.target
    var temparray = array

    if (checked == true) {
      if (e.target.name == "allcheck") {
        temparray = []
        permissions.map((permission) => {

          temparray.push(permission.slug + "_" + val)
        })
      }
      else temparray.push(val)
    } else {
      if(e.target.name  == "allcheck"){
        permissions.map((permission) => {
          
          temparray = temparray.filter((obj)=>{
            return obj != permission.slug+"_"+val
          })
         
        })
      }
      else{ temparray = array.filter((t) => {
        return t != val
      })}
    }
    setArray(temparray)
    if (temparray.length == 5) {
      setIsCheckAll(true)
    } else setIsCheckAll(false)
  }

 useEffect(()=>{
   checkOnEdit()
  },[isCheck])

  
  return (
    <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          {<button className="accordion-button   accordian-height" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="true" aria-controls={`#${id}`} >
            <div className='d-flex '>
              <input type='checkbox' onClick={(e) => {
                setIsCheckAll(!isCheckAll);
                handleSelectAll(e, module.slug, isCheckAll)
                handleParentCheck(e, module.slug)
              }} checked={isCheckAll} className='mx-2' name='allcheck' ></input>
              <label>{module.name}</label>


            </div>
          </button>}
        </h2>
        <div id={id} className="accordion-collapse show"  >
          <div class="accordion-body d-flex justify-content-around ">
            {
              permissions != undefined && permissions.length > 0 && permissions?.map((permission) => {
                 return (<div>

                  <input onChange={(e) => {
                    handleClick(e, permission.slug, module.slug)
                    handleParentCheck(e, permission.slug + "_" + module.slug)
                  }} checked={isCheckone(permission.slug + "_" + module.slug)} type='checkbox'></input>
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