import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import React from 'react';
import { ThemeContext } from './theme-context';

function App() {
  const { theme} = React.useContext(ThemeContext)
  console.log(theme.backgroundColor, theme.color)
  return (
    <div className="" style={{ backgroundColor: theme.backgroundColor, color: theme.color,}}>
 
    <Header/>
    <div className="container-fluid">
    <div className="row flex-nowrap">
     <Sidebar/>
     <div class={`col py-3 body-height ${theme.backgroundColor=='black'?" dark ":"bg-light"} `}>
           <Outlet/>
        </div>
     </div>
     </div>

      <Footer/>
    </div>
  );
}

export default App;
