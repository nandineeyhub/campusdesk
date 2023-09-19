import React, { useEffect, useState } from 'react'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { callAPI, API } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiLoader } from '../../../Helper/common'

const EditClient = () => {

  const [value, setValue] = useState({})
  const [role, setRole] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [loader, setLoader] = useState(true);
  const [image, setImage] = useState('');

  const { id } = useParams()

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name == 'stateID') {
      getcity(e.target.value)
    }
    setValue((val) => { return { ...val, [e.target.name]: e.target.value } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateClient()
  }

  const uploadImage = (e) => {
    let file = (e.target.files[0])
    
    let name = e.target.name;
    if (file) {
      setImage(file)
    }

    setValue((val) => ({ ...val, [name]: file }))
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

  const updateClient = async () => {
    try {
      const response = await API(apiUrls.updateclient + `/${id}`, {}, 'POST', formBody)
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

  console.log(value)

  const getclient = async () => {
    setLoader(true)
    try {
      const response = await callAPI(apiUrls.getclientbyid + `/${id}`, {}, 'GET')
      setLoader(false)
      if (response.data.isSuccess) {
        
        setValue(response.data.data)
        getcity(response.data.data.stateID)
      }
    } catch (e) {
      setLoader(false)
      console.log(e.errors)
    }
  }

  useEffect(() => {
    getPermission()
    getState()
    getclient()

  }, [])

  console.log(value)

  return (
    <div className='container-lg w-100 '>
      <div className='text-secondary py-3 App'>
        <h3>Edit Client</h3>
      </div>
      {loader && <ApiLoader />}
      <form onSubmit={handleSubmit}>
        <div className='row img-thumbnail p-3'>
          <div className="col-md-12">

            <div className="my_profile_box ">
           { <img src={image ? URL.createObjectURL(image) : "https://onlineprojectprogress.com/Campusdesk/public/upload/"+value.image } className="  img-fluid" alt="" />}

              <input type="file" className="my-1" name='image' onChange={uploadImage} />

            </div>

          </div>
          <div className='col-md-4 '>
            <label for="phone" className="required">Campus Code</label>
            <input className='form-control' value={value.schoolCode} onChange={handleChange} name='schoolCode' type="text" placeholder='Code'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="name" className="required">Campus Name</label>
            <input className='form-control ' value={value.name} onChange={handleChange} name='name' type="text" placeholder='Name'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="name" className="required">Contact Person</label>
            <input className='form-control ' value={value.contactPerson} onChange={handleChange} name='contactPerson' type="text" placeholder='Name'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="email" className="required">Email</label>
            <input className='form-control' value={value.email} onChange={handleChange} name='email' type="text" placeholder='Email'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Phone</label>
            <input className='form-control' value={value.phoneNo} onChange={handleChange} name='phoneNo' type="text" placeholder='Phone'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Address</label>
            <input className='form-control' value={value.address} onChange={handleChange} name='address' type="text" placeholder='Address'></input>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Country</label>
            <select className='form-control' onChange={handleChange} name='countryID' type="text" placeholder=''>

              <option value="1" selected>US</option>
            </select>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">State</label>
            <select className='form-control' value={value.stateID} onChange={handleChange} name='stateID' type="text" placeholder=''>
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
            <select className='form-control' value={value.cityID} onChange={handleChange} name='cityID' type="text" placeholder=''>
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
            <select className='form-control' value={value.roleID} onChange={handleChange} name='roleID' type="text" placeholder=''>
              <option value="" selected>--Choose Role--</option>
              {
                role.map((role) => {
                  return <option value={role.id}>{role.name}</option>
                })
              }
            </select>
          </div>
          <div className="col-md-12">
            <div className="d-flex  mt-3">
              <button type="submit" className="btn btn-info text-white mx-3">Update Details</button>
              <button type="button" onClick={() => { navigate("/desk/client") }} className="btn btn-secondary ">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditClient