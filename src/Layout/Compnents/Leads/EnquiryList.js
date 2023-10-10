import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from '../../../popups/DeletePopup';
import LeadView from './LeadView';
import { callAPI } from '../../../apiutils/apiUtils';
import { apiUrls } from '../../../apiutils/apiUrls';
import { ErrorMsg, SuccessMsg } from '../../../Notifications';
import { ApiLoader, NoRecordMsg } from '../../../Helper/common';
import SearchBar from '../../Filters/SearchBar';
import StatusFilter from '../../Filters/StatusFilter';
import DateFilter from '../../Filters/DateFilter';
import StepFilter from '../../Filters/StepFilter';
import Pagination from '../../../Pagination';
import ValidatePermission from '../../../Auth/ValidatePermission';

const EnquiryList = () => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState([])
  const [data, setData] = useState({})
  const [loader, setloader] = useState(false)
  const [viewopen, setViewOpen] = useState(false);
  const [step, setStep] = useState("")
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const [date, setDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pages, setPages] = useState([1])


  const handleLimitChange = (e) => {
    setItemsPerPage(e.target.value)
    setCurrentPage(1)
  }

  const handlepageChange = (page) => {
    setCurrentPage(page)
  }

  const navigate = useNavigate()

  const handleFilter = (e) => {
    if (e.target.name == "search") {
      setSearch(e.target.value)
    } else if (e.target.name == "status") {
      setStatus(e.target.value)
      getEnquiry(e.target.value,search,step,date,itemsPerPage,currentPage)
    } else if (e.target.name == "step") {
      setStep(e.target.value)
      getEnquiry(status,search,e.target.value,date,itemsPerPage,currentPage)
    } else if (e.target.name == "enquiryDate") {
      setDate(e.target.value)
      getEnquiry(status,search,step,e.target.value,itemsPerPage,currentPage)
    }
  }

  const handleSelect =(val, type)=>{
    setData(val)
    if(type != 'view'){
        setOpen(true)
    }
    else{
      setViewOpen(true)
  }
   
    }
  const handleStep = async (id, value) => {
    try {
      const query = { step: value, id:id }
      const response = await callAPI(apiUrls.updatestep, query, 'PUT', value)
      if (response.data.isSuccess) {
        SuccessMsg(response.data.message)
      } else {
        ErrorMsg(response.data.message)
      }

    } catch (e) {
      ErrorMsg(e.message)
    }
  }


  const handleChange = (e, id, key) => {
    const enquiry = value.filter((val) => { return val.id == id })
    enquiry[0].step = e.target.value
    const newArray = value
    newArray[key] = enquiry[0]
    setValue(newArray)
  }



  const handleStatus = async (id, status) => {
    try {

      const query = { status: status == "Active" ? "Inactive" : "Active", id:id }
      const response = await callAPI(apiUrls.updateenquiryStatus , query, 'PUT')
      if (response.data.isSuccess) {
        SuccessMsg(response.data.message)
        getEnquiry()
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.messsage)
    }
  }

const submitData = ()=>{
  getEnquiry(status,search,step,date,itemsPerPage,currentPage)
}


  const getEnquiry = async (status,search,step,date,itemsPerPage,currentPage) => {
    setloader(true)
    try {
      const query = { status: status, limit: "", search: search, step: step, enquiryDate: date , limit: itemsPerPage, page: currentPage }
      const response = await callAPI(apiUrls.getenquiry, query, 'GET')
      setloader(false)
      if (response.data.isSuccess) {
       if( response.data.data != null) {
         setValue(response.data.data.enquiries.data)
         setTotalPages((response.data.data.enquiries.total%itemsPerPage)?Math.floor(response.data.data.enquiries.total/itemsPerPage)+1:response.data.data.enquiries.total%itemsPerPage)
         }
       else setValue([])
        
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
      setloader(false)
    }
  }


  const deleteData = async (id) => {
    try {
      const response = await callAPI(apiUrls.deleteenquiry, {id:id}, 'DELETE')
      if (response.data.isSuccess) {
        SuccessMsg(response.data.message)
        setOpen(false)
        const newValue = value.filter((val) => { return val.id != id })
        setValue(newValue)
      } else {
        ErrorMsg(response.data.message)
      }
    } catch (e) {
      ErrorMsg(e.message)
    }
  }




  useEffect(() => {
    getEnquiry()
  }, [])

  useEffect(()=>{
    var newarr = []
    var count = 1
    var val = totalPages
    while(val--){
       newarr.push(count)
       count = count + 1 
    }
    setPages(newarr)
   },[ itemsPerPage, totalPages, currentPage])


 
  return (
    <div className=''>
      <div>
        <div className='text-secondary '>
          <h4>Enquiry</h4>
        </div>
        {loader && <ApiLoader />}
        <div className='container-lg border-light rounded w-100 px-3 m-auto '>
          <div className='py-2 my-4 d-flex justify-content-between'>
            <div className='d-flex justify-content-around'>
              <SearchBar handleFilter={handleFilter} getdata={submitData} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />
              <div className='mx-2'><StatusFilter handleFilter={handleFilter} /></div>
              <div className='mx-2'><StepFilter handleFilter={handleFilter} /></div>
              <div className='mx-2'><DateFilter handleFilter={handleFilter} /></div>
            </div>
         {  ValidatePermission('add_enquiry') && <button className='btn btn-info text-white' onClick={() => { navigate("/desk/enquiry/addenquiry") }}>Add New Enquiry</button>}</div>
          <table className='table table-striped App'>
            <thead>

              <th scope='col'>Date</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Interest</th>
              <th scope='col'>Step</th>
              <th scope='col'>Status</th>
              <th scope='col'>Action</th>

            </thead>
            <tbody>

              {
                value != undefined && value.length > 0 && value.map((val, key) => {
                  return <tr>
                    <th scope="row">{new Date(val.enquiryDate).toLocaleDateString("en-US")}</th>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.phone}</td>
                    <td>{val.course}</td>
                    <td><select onChange={(e) => {
                      handleChange(e, val.id, key)
                      handleStep(val.id, e.target.value)
                    }} name='step'>
                      <option value="Lead" selected={val.step == "Lead"}>Lead</option>
                      <option value="HotLead" selected={val.step == "HotLead"}>HotLead</option>
                      <option value="Client" selected={val.step == "Client"}>Customer</option>
                    </select></td>
                    <td><p onClick={() => {ValidatePermission('update_enquiry') &&  handleStatus(val.id, val.status) }} role="button" className={`App text-white text-center ${val.status == "Active" ? "bg-success" : "bg-danger"}`}>{val.status}</p></td>
                    <td><div classname='d-flex justify-content-center align-items-center '>
                    {ValidatePermission("edit_enquiry") && <NavLink to={`/desk/enquiry/editenquiry/${val.id}`} className="text-decoration-none"> <i className="fa fa-edit text-dark fs-5 mx-1"></i> </NavLink>}
                    {ValidatePermission("delete_enquiry") && <NavLink className="text-decoration-none" onClick={() => handleSelect(val, 'del')}>  <i className="fa fa-trash text-dark fs-5 mx-1" ></i></NavLink>}
                    { <NavLink className="text-decoration-none" onClick={() => handleSelect(val, 'view')}> <i className="fa fa-eye fs-4 text-dark mx-1"></i></NavLink>}
                    </div></td>
                  </tr>
                })
              }

            </tbody>
          </table>
          {!loader && value.length == 0 &&
            <NoRecordMsg title={'No Record Found !!'} />
          }   { value.length != 0 && <div className='d-flex justify-content-end'>

          <div className='mx-2'>

            <select onChange={handleLimitChange} className='form-control text-primary ' name='itemsPerpage'>
            <option selected value="">select limit</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
              
          </div>
          <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handlepageChange={handlepageChange}
          pages={pages}
          />
        </div> }
        </div>
      </div>
      {<Modal show={open}
        onHide={() => setOpen(false)}
        deleteData={deleteData}
        data={data} />
      }
      <LeadView show={viewopen}
        onHide={() => setViewOpen(false)}
        data = {data} />
    </div>
  )
}

export default EnquiryList