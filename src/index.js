import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './Layout/Login';
import Home from './Layout/Compnents/Home/Home';
import EnquiryForm from './Layout/Compnents/Home/EnquiryForm';
import FollowUp from './Layout/Compnents/Home/FollowUp';
import Statistics from './Layout/Compnents/Home/Statistics';
import Account from './Layout/Compnents/Account/Account';
import Details from './Layout/Compnents/Account/Details';
import ChangePassword from './Layout/Compnents/Account/ChangePassword';
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
import LeadView from './Layout/Compnents/Leads/LeadView';
import UserView from './Layout/Compnents/User/UserView';
import ClientView from './Layout/Compnents/client/ClientView';



const appRoute = createBrowserRouter([{
    path:"/",
    element:<Login/>
  },{
    path:"/desk",
    element:<App/>,
    children:[{
      path:"/desk",
      element:<Statistics/>,
    },{
         path:'/desk/home',
         element:<Home/>,
         children:[{
          path:"/desk/home/enquiryform",
          element:<EnquiryForm/>
         },{
          path:'/desk/home',
          element:<FollowUp/>
         },{
          path:"/desk/home/statistics",
          element:<Statistics/>
         }]
    },
  {
    path:'/desk/account',
    element:<Account/>,
    children:[{
      path:"/desk/account",
      element:<Details/>
    },{
      path:"/desk/account/changepassword",
      element:<ChangePassword/>
    }]
  },
{
  path:"/desk/client",
  element:<Client/>,
  children:[{
    path:'/desk/client',
    element:<ClientList/>
  },{
    path:"/desk/client/addclient",
    element:<AddClient/>
  },{
    path:"/desk/client/editclient",
    element:<EditClient/>
  },{
    path:"/desk/client/viewclient",
    element:<ClientView/>
  }]
},{
  path:"/desk/user",
  element:<User/>,
  children:[{
    path:'/desk/user',
    element:<UserList/>
  },{
    path:"/desk/user/adduser",
    element:<AddUser/>
  },{
    path:"/desk/user/edituser",
    element:<EditUser/>
  },{
    path:"/desk/user/viewuser",
    element:<UserView/>
  }]
},{
  
    path:"/desk/lead",
    element:<Lead/>,
  
  
},{
  path:"/desk/editlead",
  element:<EditLead/>
},
{
  path:"/desk/viewlead",
  element:<LeadView/>
}]
  }]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <RouterProvider router={appRoute}/>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
