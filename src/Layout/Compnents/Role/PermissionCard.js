import React, { useState } from 'react'

const PermissionCard = ({id}) => {

    
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    

     
    
  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(["a","b","c","d"]);
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
          setIsCheck(isCheck.filter(item => item !== id));
        }
      };

  return (
    <div className='accordion '>
    <div class="accordion-item">
    <h2 class="accordion-header" >
      {<button  className="accordion-button collapsed  accordian-height" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`}  aria-expanded="false" >
        <div className='d-flex '>
            <input type='checkbox' onClick={handleSelectAll} className='mx-2' ></input>
            <label>Role Name</label>
         

        </div>
      </button>}
    </h2>
    <div id={id} className="accordion-collapse collapse"  >
      <div class="accordion-body d-flex justify-content-around ">
        <div>
           <input id='a' onClick={handleClick} checked={isCheck.includes("a")} type='checkbox'></input>
           <label  className='mx-2'>Get</label>
         </div>
         <div>
           <input id='b' onClick={handleClick} checked={isCheck.includes("b")} type='checkbox'></input>
           <label  className='mx-2'>Add</label>
         </div>
         <div>
           <input id='c' onClick={handleClick} checked={isCheck.includes("c")} type='checkbox'></input>
           <label  className='mx-2'>Edit</label>
         </div>
         <div>
           <input id='d' onClick={handleClick} checked={isCheck.includes("d")} type='checkbox'></input>
           <label  className='mx-2'>Delete</label>
         </div>
        </div>
    </div>
  </div>
  </div>
  )
}

export default PermissionCard