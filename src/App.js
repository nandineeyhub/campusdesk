import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import { useState } from 'react';


function App() {
  const [open, setOpen] = useState(true)
  const handleOpen = () => {
    if(open) setOpen(false)
    else setOpen(true)
  }
  return (
    <div className="">
 
    <Header handleOpen={handleOpen}/>
  
    <div className="container-fluid">
    <div className="row flex-nowrap">
     <Sidebar show = {open}/>
     <div class="col py-3 bg-light ">
           <Outlet/>
        </div>
     </div>
     </div>

      <Footer/>
    </div>
  );
}

export default App;
