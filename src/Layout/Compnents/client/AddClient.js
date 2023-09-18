import React, { useEffect, useState } from 'react'
import { callAPI, API } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate } from 'react-router-dom'

const AddClient = () => {

  const [toggleview, setToggleView] = useState(false)
  const [ctoggleview, setcToggleView] = useState(false)
  const [value, setValue] = useState({ countryID: 1 , image:{}})
  const [role, setRole] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [image, setImage] = useState('');

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name == 'stateID') {
      getcity(e.target.value)
    }
    setValue((val) => { return { ...val, [e.target.name]: e.target.value } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addClient()
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
      if (response.data.isSuccess) {
        SuccessMsg(response.data.message)
        navigate('/desk/client')
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
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
             
            </div>

          </div>
          <div className='col-md-4 '>
            <label for="phone" className="required">Campus Code</label>
            <input className='form-control' onChange={handleChange} name='schoolCode' type="text" placeholder='Code'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="name" className="required">Campus Name</label>
            <input className='form-control ' onChange={handleChange} name='name' type="text" placeholder='Name'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="name" className="required">Contact Person</label>
            <input className='form-control ' onChange={handleChange} name='contactPerson' type="text" placeholder='Name'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="email" className="required">Email</label>
            <input className='form-control' onChange={handleChange} name='email' type="text" placeholder='Email'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Phone</label>
            <input className='form-control' onChange={handleChange} name='phoneNo' type="text" placeholder='Phone'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Address</label>
            <input className='form-control' onChange={handleChange} name='address' type="text" placeholder='Address'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Country</label>
            <select className='form-control' onChange={handleChange} name='countryID' type="text" placeholder=''>

              <option value="1" selected>US</option>
            </select>
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
          </div>
          <div className='col-md-4 my-2'>
            <label for="role" className="required">Role</label>
            <select className='form-control' onChange={handleChange} name='roleID' type="text" placeholder=''>
              <option value="" selected>--Choose Role--</option>
              {
                role.map((role) => {
                  return <option value={role.id}>{role.name}</option>
                })
              }
            </select>
          </div>
          <div className='col-md-4 my-3'>
            <label for="phone" className="required">Password</label>
            <div className="mb-3 input-group">
              <input className='form-control ' onChange={handleChange} name='password' type={toggleview ? "text" : "password"} placeholder='password'></input>
              <span className='mx-1' onClick={() => { toggle() }}> {toggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
            </div>
          </div>
          <div className='col-md-4 my-3 '>
            <label for="phone" className="required">Confirm Password</label>
            <div className="mb-3 input-group">
              <input className='form-control ' onChange={handleChange} name='password_confirmation' type={ctoggleview ? "text" : "password"} placeholder='Confirm Password'></input>
              <span className='mx-1' onClick={() => { ctoggle() }}> {ctoggleview ? <i className="fa fa-eye form-control" /> : <i className="fa fa-eye-slash form-control" />}</span>
            </div>
          </div>
          <div className="col-md-12 ">
            <div className="d-flex  mt-3">
              <button type="submit" className="btn btn-info text-white mx-3">Add Details</button>
              <button type="button" className="btn btn-secondary ">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddClient