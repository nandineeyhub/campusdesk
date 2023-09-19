
import {useEffect, useState} from 'react'
import { callAPI, API } from '../../../apiutils/apiUtils'
import { apiUrls } from '../../../apiutils/apiUrls'
import { ErrorMsg, SuccessMsg } from '../../../Notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiLoader } from '../../../Helper/common'

const EditUser = () => {

  const [value, setValue] = useState({})
  const [loader, setLoader] = useState(false)
  const [image, setImage] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()

  const handleChange = (e) => {
    setValue((val)=>{ return {...val, [e.target.name]:e.target.value}})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editUser()
  }

  const uploadImage = (e) => {
    let file = (e.target.files[0])
    
    let name = e.target.name;
    if (file) {
      setImage(file)
    }

    setValue((val) => ({ ...val, [name]: file }))
  }
  
  let formBody = new FormData();
  for (var i in value) {
      formBody.append(i, value[i]);
  }

  const editUser = async () => {
   try{
    const response =  await API(apiUrls.updateuser+`/${id}`, {}, 'POST', formBody)
    if(response.data.isSuccess){
      SuccessMsg(response.data.message)
      navigate('/desk/user')
    }else{
      ErrorMsg(response.data.message)
    }
   }catch(e){
      ErrorMsg(e.message)
   }
  }
 
  const getuser = async () => {
    setLoader(true)
    try{
       const response = await callAPI(apiUrls.getuser+`/${id}`, {}, 'GET')
       setLoader(false)
       if(response.data.isSuccess){
        setValue(response.data.data)
        
      }else{
        ErrorMsg(response.data.message)
        setLoader(false)
      }
    } catch(e){

    }
  }

  useEffect(()=>{getuser()},[])

  return (
    <div className='container-lg w-100 '>
    <div className='text-secondary py-2 App'>
 <h3>Edit User</h3>
</div> 
{loader && <ApiLoader/>}
<form onSubmit={handleSubmit}> 
<div className='row img-thumbnail p-3'>
<div className="col-md-12">

<div className="my_profile_box ">
{ <img src={image ? URL.createObjectURL(image) : "https://onlineprojectprogress.com/Campusdesk/public/upload/"+value.image } className="  img-fluid" alt="" />}

  <input type="file" className="my-1" name='image' onChange={uploadImage} />

</div>

</div>
   <div className='col-md-4 my-2'>
    <label for="userCode" className="required">User Code</label>
    <input onChange={handleChange} value={value.userCode} className='form-control' name='userCode' type="text" placeholder='User Code'></input>
   </div>
   <div className='col-md-4 my-2'>
    <label for="schoolCode" className="required">School Code</label>
    <input onChange={handleChange} value={value.schoolCode} className='form-control' name='schoolCode' type="text" placeholder='School Code'></input>
   </div>
   <div className='col-md-4 my-2'>
    <label for="name" className="required"> Name </label>
    <input onChange={handleChange} value={value.name} className='form-control' name='name' type="text" placeholder='Name'></input>
   </div>
  
   <div className='col-md-4 my-2'>
   <label for="email" className="required">Email</label>
   <input onChange={handleChange} value={value.email} className='form-control' name='email' type="text" placeholder='Email'></input>
   </div>
   <div className='col-md-4 my-2'>
   <label for="phone" className="required">Phone</label>
   <input onChange={handleChange} value={value.phoneNo} className='form-control' name='phoneNo' type="text" placeholder='Phone'></input>
   </div>
   <div className='col-md-4 my-2'>
   <label for="address" className="required">Address</label>
   <input onChange={handleChange} value={value.address} className='form-control' name='address' type="text" placeholder='address'></input>
   </div>


   <div className="col-md-12 ">
     <div className="d-flex  mt-3">
     <button type="submit"  className="btn btn-info text-white mx-3">Update Details</button>
      <button type="button"  className="btn btn-secondary ">Cancel</button>
       </div>
   </div>
</div>
</form>
</div>
  )
}

export default EditUser