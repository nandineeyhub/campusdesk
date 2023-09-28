import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';
import { callAPIWithoutAuth } from '../apiutils/apiUtils';
import { apiUrls } from '../apiutils/apiUrls';
import { ErrorMsg, SuccessMsg } from '../Notifications';
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'

const Login = () => {
  const texts = ["Built for", "Care for", "Desk for"]
  const [head, setHead] = useState([]);
  const [value, setValue] = useState({})
  const [toggleview, setToggleView] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, forceUpdate] = useState()

  const simpleValidator = useRef(new SimpleReactValidator());

  const navigate = useNavigate()
  let point = 0

  const changeText = () => {
    if (point < texts.length) {
      setHead(texts[point]);
      point++;
    }
    else {
      point = 0;
    }

  }

  const toggle = () => {
    if (toggleview) setToggleView(false)
    else setToggleView(true)
  }

  const handleChange = (e) => {
    setValue((val) => { return { ...val, [e.target.name]: e.target.value } })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
    else {
      login()
      setIsSubmitting(true)
    }
  }

  const login = async () => {
    try {
      const response = await callAPIWithoutAuth(apiUrls.clientlogin, {}, 'POST', value)
      setIsSubmitting(false)
      if (response.data.isSuccess) {
        localStorage.setItem("user", JSON.stringify(response.data.data))
        localStorage.setItem("token", JSON.stringify(response.data.data.token))
        navigate('/desk')
        SuccessMsg(response.data.message)

      }
      else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
    }
  }



  useEffect(() => {
    changeText()
    const t = setInterval(changeText, 3000)
    return () => { clearInterval(t) }
  }, [])


  return (

    <div className="bg-light vh-100 ">
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
                <input className='form-control' name='email' onChange={handleChange} type="text" placeholder='email'></input>
                <span className="requireds"> {simpleValidator.current.message('email', value.email, 'required|email')}</span>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <input className='form-control ' name='password' onChange={handleChange} type={toggleview ? "text" : "password"} placeholder='password'></input>
                  <span className='mx-1' onClick={() => { toggle() }}> {toggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
                </div>
                <span className="requireds"> {simpleValidator.current.message('email', value.password, 'required')}</span>
              </div>
              <div className="mb-3 d-flex ">
                <button disabled={isSubmitting} type='submit' className='btn btn-info text-white px-3'> Log in</button>
                {<NavLink to="/recoverpassword"><p className='text-primary m-3'> Recover Password </p></NavLink>}
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>


  )
}

export default Login