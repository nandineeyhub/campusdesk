import React, { useEffect, useState } from 'react'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { callAPI, API } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiLoader } from '../../../Helper/common'
import SimpleReactValidator from 'simple-react-validator'
import { useRef } from 'react'

const EditClient = () => {

  const [value, setValue] = useState({})
  const [role, setRole] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [loader, setLoader] = useState(true);
  const [image, setImage] = useState('');
  const [,forceUpdate] = useState()
  const [isSubmitting,setIsSubmitting]=useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());


  const { id } = useParams()

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name == 'stateID') {
      getcity(e.target.value)
      setCity([])
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
    else { updateClient() 
      setIsSubmitting(true) }
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
      const response = await callAPI(apiUrls.getcity, {stateID:id}, 'GET')
     
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
      const response = await API(apiUrls.updateclient, {id:id}, 'POST', formBody)
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

  console.log(value)

  const getclient = async () => {
    setLoader(true)
    try {
      const response = await callAPI(apiUrls.getclientbyid, {id:id}, 'GET')
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

  const handleKeyDown = event => {
    const regex =  /^[.a-zA-Z0-9_-]*$/;
    const isValid = regex.test(event.key)
    if(event.key != "Backspace"){
      if(isValid == false){
        event.preventDefault()
      } 
    }
  }



  const PhonehandlekeyDown = e => {
    if(value.phoneNo){
      if(value.phoneNo.length > 9){
        if(e.key != "Backspace"){
          e.preventDefault()
        }
      } 
    } else if(Number(e.key) == 0) {
      e.preventDefault()
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
        <div className='row '>
          <div className="col-md-12">

            <div className="my_profile_box ">
           { <img src={image ? URL.createObjectURL(image) :value.image_path+value.image } className="  img-fluid" alt="" />}

              <input type="file" className="my-1" name='image' onChange={uploadImage} />
    
            </div>
         
          </div>
          <div className='col-md-4 '>
            <label for="phone" className="required">Campus Code</label>
            <input className='form-control' maxLength={5}  onKeyDown={handleKeyDown} value={value.schoolCode} onChange={handleChange} name='schoolCode' type="text" placeholder='Code'></input>
            <span className="requireds"> {simpleValidator.current.message('code', value.schoolCode, 'required')}</span>
          </div>

          <div className='col-md-4 my-2'>
            <label for="name" className="required">Campus Name</label>
            <input className='form-control '  maxLength={20}  onKeyDown={handleKeyDown} value={value.name} onChange={handleChange} name='name' type="text" placeholder='Name'></input>
            <span className="requireds"> {simpleValidator.current.message('name', value.name, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="name" className="required">Contact Person</label>
            <input className='form-control '  maxLength={20} onKeyDown={handleKeyDown} value={value.contactPerson} onChange={handleChange} name='contactPerson' type="text" placeholder='Name'></input>
            <span className="requireds"> {simpleValidator.current.message('contact person', value.contactPerson, 'required')}</span>
         </div>
          <div className='col-md-4 my-2'>
            <label for="email" className="required">Email</label>
            <input className='form-control' value={value.email} onChange={handleChange} name='email' type="text" placeholder='Email'></input>
            <span className="requireds"> {simpleValidator.current.message('email', value.email, 'required|email')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Phone</label>
            <input className='form-control'  onKeyDown={PhonehandlekeyDown} value={value.phoneNo} onChange={handleChange} name='phoneNo' type="text" placeholder='Phone'></input>
            <span className="requireds"> {simpleValidator.current.message('phone number', value.phoneNo, 'required|numeric|min:10|max:10')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Address</label>
            <input className='form-control'  maxLength={100} onKeyDown={handleKeyDown} value={value.address} onChange={handleChange} name='address' type="text" placeholder='Address'></input>
            <span className="requireds"> {simpleValidator.current.message('address', value.address, 'required')}</span>
          </div>
          <div className='col-md-4 my-2'>
            <label for="phone" className="required">Country</label>
            <select className='form-control'  onChange={handleChange} name='countryID' type="text" placeholder=''>

              <option value="1" selected>US</option>
            </select>
            <span className="requireds"> {simpleValidator.current.message('country ID', value.countryID, 'required')}</span>
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
            <span className="requireds"> {simpleValidator.current.message('state ID', value.stateID, 'required')}</span>
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
            <span className="requireds"> {simpleValidator.current.message('city ID', value.cityID, 'required')}</span>
          </div>
          {/* <div className='col-md-4 my-2'>
            <label for="role" className="required">Role</label>
            <select value={value.role_id} className='form-control'  onChange={handleChange} name='roleID' type="text" placeholder=''>
              <option value="" selected>--Choose Role--</option>
              {
                role.map((role) => {
                  return <option value={role.id}>{role.name}</option>
                })
              }
            </select>
            <span className="requireds"> {simpleValidator.current.message('role ID', value.role_id, 'required')}</span>
          </div> */}
          <div className="col-md-12">
            <div className="d-flex  mt-3">
              <button disabled={isSubmitting}  type="submit" className="btn btn-info text-white mx-3">Update Details</button>
              <button type="button" onClick={() => { navigate("/desk/client") }} className="btn btn-secondary ">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditClient