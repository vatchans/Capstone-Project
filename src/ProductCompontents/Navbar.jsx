import React from 'react'
import { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import { Link,HashRouter} from "react-router-dom";
import logo from './assets/Milky_Way_farm-removebg-preview (1).png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
function Navbar() {
  let queries = {
    xs: '(max-width: 320px)',
    sm: '(max-width: 720px)',
    md: '(max-width: 1024px)'
    }
 let media_screen_width = window.matchMedia(queries.md);
  return<>
  {media_screen_width.matches?<>
    <div className='logo mt-2'>
        <img src={logo}></img>
    </div>
       </>:
  <div className='Navbar'>
  <div className='logo'>
        <img src={logo}></img>
    </div>
    <div className='Navbar-list'>
       <Link to="/" style={{textDecoration:"none"}} ><p><HomeIcon/> Home</p></Link>

       <Link to='/Products/All'style={{textDecoration:"none"}}><p><i className="fa-solid fa-cow" ></i> Products</p></Link>
       <Link to="/Cart" style={{textDecoration:"none"}}><p ><LocalMallIcon/> Basket</p></Link>

       <Link to="/Useraccount"style={{textDecoration:"none"}}><span className='Sub-btn'><AccountBoxIcon/>Profile</span></Link>
  
      
  </div>
  </div>
  }
  </>
  
}

export default Navbar