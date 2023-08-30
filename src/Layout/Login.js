import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../App.css';
const Login = () => {
    const texts = ["Built for", "Care for","Desk for"]
    const [head, setHead] = useState([]);
    const [value, setValue] = useState()
    const navigate = useNavigate()
    let point = 0

   const changeText = () => {
        if(point < texts.length){
          setHead(texts[point]);
          point ++;
        }
        else{
          point = 0;
        }

      }

  const handleChange = (e) => {
    setValue((val)=>{return {...val,[e.target.name]:e.target.value}})
  }   
  const handleSubmit = (e) => {
    e.preventDefault()
 
    navigate('/desk/home')
  }
     useEffect(()=>{
       changeText()
       const t =  setInterval(changeText, 3000)
       return () => {clearInterval(t)}
     },[])

  
  return (
   
    <div  className="bg-light vh-100 App">
    <div className="container py-3 ">
    <h1 className='text-secondary my-3'>Campus Desk</h1>
    <div className="row justify-content-center align-items-center mt-5">
       
        <div className="col-md-5 text-center text-md-center m-5 ">
            
             <h1>
                <div className="display-3 text-primary">{head}</div>
                <div className="display-3 ">Everyone.</div>
                <div className=" text-info ">Find your next customer with us.</div>
             </h1>
        </div>
        <div className="col-md-5 img-thumbnail p-5 ">
            
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input className='form-control' name='username' onChange={handleChange} type="text" placeholder='username'></input>
            </div>
            <div className="mb-3">
              <input className='form-control' name='password' onChange={handleChange} type="password" placeholder='password'></input>
            </div>
            <div className="mb-3 d-flex ">
               <button type='submit' className='btn btn-info text-white px-3'> Log in</button>
                 <p className='text-primary m-3'> Recover Password </p>
            </div>
            </form>
           
        </div>
    </div>
</div>
</div>


  )
}

export default Login