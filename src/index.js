import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './Layout/Login';
import EnquiryForm from './Layout/Compnents/Leads/EnquiryForm';
import Statistics from './Layout/Compnents/Home/Statistics';
import Client from './Layout/Compnents/client/Client';
import ClientList from './Layout/Compnents/client/ClientList';
import AddClient from './Layout/Compnents/client/AddClient';
import EditClient from './Layout/Compnents/client/EditClient';
import User from './Layout/Compnents/User/User';
import UserList from './Layout/Compnents/User/UserList';
import AddUser from './Layout/Compnents/User/AddUser';
import EditUser from './Layout/Compnents/User/EditUser';
import EditLead from './Layout/Compnents/Leads/EditLead';
import Lead from './Layout/Compnents/Leads/Lead';
import Guest from './Auth/Guest';
import RoleList from './Layout/Compnents/Role/RoleList';
import AddRole from './Layout/Compnents/Role/AddRole';
import EditRole from './Layout/Compnents/Role/EditRole';
import Role from './Layout/Compnents/Role/Role';
import EnquiryList from './Layout/Compnents/Leads/EnquiryList';
import { ToastContainer } from 'react-toastify';
import ChangePassword from './Layout/Compnents/Account/ChangePassword';
import Details from './Layout/Compnents/Account/Details';

const appRoute = createBrowserRouter([{
    path:"/",
    element:<Guest><Login/></Guest>
  },{
    path:"/desk",
    element:<App/>,
    children:[{
      path:"/desk",
      element:<Statistics/>
    },{
      path:"/desk/changepassword",
      element:<ChangePassword/>
    },{
      path:"/desk/details",
      element:<Details/>
    },{
      path:"/desk/client",
      element:<Client/>,
      children:[{
        path:"/desk/client",
        element:<ClientList/>
      },{
        path:"/desk/client/addclient",
        element:<AddClient/>
      },{
        path:"/desk/client/editclient/:id",
        element:<EditClient/>
      }]
    },{
      path:"/desk/role",
      element:<Role/>,
      children:[{
        path:"/desk/role",
        element:<RoleList/>
      },{
        path:"/desk/role/addrole",
        element:<AddRole/>
      },{
        path:"/desk/role/editrole/:id",
        element:<EditRole/>
      }]
    },{
      path:"/desk/user",
      element:<User/>,
      children:[{
        path:"/desk/user",
        element:<UserList/>
      },{
        path:"/desk/user/adduser",
        element:<AddUser/>
      },{
        path:"/desk/user/edituser/:id",
        element:<EditUser/>
      }]
    },{
      path:"/desk/enquiry",
      element:<Lead/>,
      children:[{
        path:"/desk/enquiry",
        element:<EnquiryList/>
      },{
        path:"/desk/enquiry/addenquiry",
        element:<EnquiryForm/>
      },{
        path:"/desk/enquiry/editenquiry/:id",
        element:<EditLead/>
      }]
    }]
  }]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer autoClose={3000}/>
    <RouterProvider router={appRoute}/>
  </>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();