
import './App.css';


import { Outlet } from 'react-router-dom';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
