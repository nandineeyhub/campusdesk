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
import Details from './Layout/Compnents/Account/Details';
import RecoverPassword from './Layout/Compnents/Account/RecoverPassword';
import Protected from './Auth/Protected';
import RecoverPasswordForm from './Layout/Compnents/Account/RecoverPasswordForm';
import AuthCheck from './Auth/AuthCheck';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './theme-context';

const ChangePassword = lazy(()=>import('./Layout/Compnents/Account/ChangePassword'))

const appRoute = createBrowserRouter([{
    path:"/",
    element:<Guest><Login/></Guest>
  },{
    path:"/recoverpassword",
    element:<Guest><RecoverPassword/></Guest>,

  }, {
    path:"/recoverpassword/:token",
    element:<Guest><RecoverPasswordForm/></Guest>
  }, {
    path:"/desk",
    element:<Protected><App/></Protected>,
    children:[{
      path:"/desk",
      element:<Statistics/>
    },{
      path:"/desk/changepassword",
      element: <Suspense fallback={<h1>loading</h1>}><ChangePassword/></Suspense>
    },{
      path:"/desk/details",
      element:<Details/>
    },{
      path:"/desk/client",
      element:<Client/>,
      children:[{
        path:"/desk/client",
        element:<AuthCheck access={"view_client"}><ClientList/></AuthCheck>
      },{
        path:"/desk/client/addclient",
        element:<AuthCheck access={"add_client"}><AddClient/></AuthCheck>
      },{
        path:"/desk/client/editclient/:id",
        element:<AuthCheck access={"edit_client"}><EditClient/></AuthCheck>
      }]
    },{
      path:"/desk/role",
      element:<Role/>,
      children:[{
        path:"/desk/role",
        element:<AuthCheck access={"view_role"}><RoleList/></AuthCheck>
      },{
        path:"/desk/role/addrole",
        element:<AuthCheck access={"add_role"}><AddRole/></AuthCheck>
      },{
        path:"/desk/role/editrole/:id",
        element:<AuthCheck access={"edit_role"}><EditRole/></AuthCheck>
      }]
    },{
      path:"/desk/user",
      element:<User/>,
      children:[{
        path:"/desk/user",
        element:<AuthCheck access={"view_user"}><UserList/></AuthCheck>
      },{
        path:"/desk/user/adduser",
        element:<AuthCheck access={"add_user"}><AddUser/></AuthCheck>
      },{
        path:"/desk/user/edituser/:id",
        element:<AuthCheck access={"edit_user"}><EditUser/></AuthCheck>
      }]
    },{
      path:"/desk/enquiry",
      element:<Lead/>,
      children:[{
        path:"/desk/enquiry",
        element:<AuthCheck access={"view_enquiry"}><EnquiryList/></AuthCheck>
      },{
        path:"/desk/enquiry/addenquiry",
        element:<AuthCheck access={"add_enquiry"}><EnquiryForm/></AuthCheck>
      },{
        path:"/desk/enquiry/editenquiry/:id",
        element:<AuthCheck access={"edit_enquiry"}><EditLead/></AuthCheck>
      }]
    }]
  }]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ThemeProvider>
    <ToastContainer autoClose={3000}/>
    <RouterProvider router={appRoute}/>
    </ThemeProvider>
  </>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();