import React, { useEffect, useState } from 'react'
import { callAPI, API } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'

const AddClient = () => {

  const [toggleview, setToggleView] = useState(false)
  const [ctoggleview, setcToggleView] = useState(false)
  const [value, setValue] = useState({ countryID: 1 , image:{}})
  const [role, setRole] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [image, setImage] = useState('');
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [,forceUpdate] = useState()
  const simpleValidator = useRef(new SimpleReactValidator());

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name == 'stateID') {
      getcity(e.target.value)
    }
    setValue((val) => { return { ...val, [e.target.name]: e.target.value } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formValid = simpleValidator.current.allValid() 
    if(!formValid){
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
    else { addClient() 
    setIsSubmitting(true)}
  }

  const toggle = () => {
    if (toggleview) setToggleView(false)
    else setToggleView(true)
  }
  const ctoggle = () => {
    if (ctoggleview) setcToggleView(false)
    else setcToggleView(true)
  }

  const getcity = async (id) => {
    try {
      const response = await callAPI(apiUrls.getcity + `/${id}`, {}, 'GET')
      if (response.data.isSuccess) {
        setCity(response.data.data[0].city)
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
    }
  }

  const getState = async () => {
    try {
      const response = await callAPI(apiUrls.getstate, {}, 'GET')
      if (response.data.isSuccess) {
        setState(response.data.data)
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
    }
  }

  const getPermission = async () => {
    try {
      const response = await callAPI(apiUrls.getpermission, {}, 'GET')
      if (response.data.isSuccess) {
        setRole(response.data.data.role)
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
    }
  }
  
  let formBody = new FormData();
  for (var i in value) {
      formBody.append(i, value[i]);
  }

  const addClient = async () => {
    try {
      const response = await API(apiUrls.addclient, {}, 'POST', formBody)
      setIsSubmitting(false)
      if (response.data.isSuccess) {
        SuccessMsg(response.data.message)
        navigate('/desk/client')
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
      setIsSubmitting(false)
    }
  }

  const uploadImage = (e) => {
    let file = (e.target.files[0])
    
    let name = e.target.name;
    if (file) {
      setImage(file)
    }

    setValue((val) => ({ ...val, [name]: file }))
  }

  console.log(value)

  useEffect(() => {
    getPermission()
    getState()
  }, [])


  return (
    <div className='container-lg w-100 '>
      <div className='text-secondary py-2 '>
        <h3>Add Client</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='row img-thumbnail p-3'>

          <div className="col-md-12">

            <div className="my_profile_box ">
              <img src={image ? URL.createObjectURL(image) : "../../../../public/images/upload-icon.png"} className="  img-fluid" alt="" />
 
              <input type="file" className="my-1" name='image' onChange={uploadImage} />
              <span className="requireds"> {simpleValidator.current.message('image', value.image, 'required')}</span>
            </div>

          </div>
          <div className='col-md-4 '>
            <label for="phone" className="required">Campus Code</label>
            <input className='form-control' onChange={handleChange} name='schoolCode' type="text" placeholder='Code'></input>
            <span className="requireds"> {simpleValidator.current.message('code', value.schoolCode, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="name" className="required">Campus Name</label>
            <input className='form-control ' onChange={handleChange} name='name' type="text" placeholder='Name'></input>
            <span className="requireds"> {simpleValidator.current.message('name', value.name, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="name" className="required">Contact Person</label>
            <input className='form-control ' onChange={handleChange} name='contactPerson' type="text" placeholder='Name'></input>
            <span className="requireds"> {simpleValidator.current.message('contact person', value.contactPerson, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="email" className="required">Email</label>
            <input className='form-control' onChange={handleChange} name='email' type="text" placeholder='Email'></input>
            <span className="requireds"> {simpleValidator.current.message('email', value.email, 'required|email')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Phone</label>
            <input className='form-control' onChange={handleChange} name='phoneNo' type="text" placeholder='Phone'></input>
            <span className="requireds"> {simpleValidator.current.message('phone number', value.phoneNo, 'required|min:10|max:10')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Address</label>
            <input className='form-control' onChange={handleChange} name='address' type="text" placeholder='Address'></input>
            <span className="requireds"> {simpleValidator.current.message('address', value.address, 'required')}</span>
          </div>

          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Country</label>
            <select className='form-control' onChange={handleChange} name='countryID' type="text" placeholder=''>

              <option value="1" selected>US</option>
            </select>
            <span className="requireds"> {simpleValidator.current.message('country ID', value.countryID, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">State</label>
            <select className='form-control' onChange={handleChange} name='stateID' type="text" placeholder=''>
              <option value="" selected>--Choose State--</option>
              {
                state != undefined && state.length > 0 && state.map((state) => {
                  return <option value={state.stateID}>{state.stateName}</option>
                })
              }
            </select>
            <span className="requireds"> {simpleValidator.current.message('state ID', value.stateID, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">City</label>
            <select className='form-control' onChange={handleChange} name='cityID' type="text" placeholder=''>
              <option value="" selected>--Choose City--</option>
              {
                city.map((city) => {
                  return <option value={city.cityID}>{city.cityName}</option>
                })
              }
            </select>
            <span className="requireds"> {simpleValidator.current.message('city ID', value.cityID, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="role_id" className="required">Role</label>
            <select className='form-control' onChange={handleChange} name='role_id' type="text" placeholder=''>
              <option value="" selected>--Choose Role--</option>
              {
                role.map((role) => {
                  return <option value={role.id}>{role.name}</option>
                })
              }
            </select>
            <span className="requireds"> {simpleValidator.current.message('role ID', value.role_id, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Password</label>
            <div className=" input-group">
              <input className='form-control ' onChange={handleChange} name='password' type={toggleview ? "text" : "password"} placeholder='password'></input>
              <span className='mx-1' onClick={() => { toggle() }}> {toggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
            </div>
            <span className="requireds"> {simpleValidator.current.message('password', value.password, 'required')}</span>
          </div>
          <div className='col-md-4 my-2 '>
            <label for="phone" className="required">Confirm Password</label>
            <div className=" input-group">
              <input className='form-control ' onChange={handleChange} name='password_confirmation' type={ctoggleview ? "text" : "password"} placeholder='Confirm Password'></input>
              <span className='mx-1' onClick={() => { ctoggle() }}> {ctoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
            </div>
            <span className="requireds"> {simpleValidator.current.message('password', value.password_confirmation, 'required')}</span>
          </div>
          <div className="col-md-12 ">
            <div className="d-flex  mt-3">
              <button disabled={isSubmitting} type="submit" className="btn btn-info text-white mx-3">Add Details</button>
              <button type="button" onClick={()=>{navigate('/desk/client')}} className="btn btn-secondary ">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddClient