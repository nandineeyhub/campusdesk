import React, { Children } from 'react';
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
