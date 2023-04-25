import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import { Fade ,Zoom,rubberBand,Slide} from "react-awesome-reveal";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/Milky_Way_farm-removebg-preview (1).png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Bottomnavigation() {
  const [value, setValue] = useState(0);
  let queries = {
    xs: '(max-width: 320px)',
    sm: '(max-width: 840px)',
    md: '(max-width: 1024px)'
  }
  let media_screen_width = window.matchMedia(queries.sm);
  return <>
    {media_screen_width.matches ?
        <Box className='Bottom_navigation'>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              style={{ textDecoration: "none" }}
              component={Link}
              to="/"
              label="Home"
              icon={<HomeIcon />} />

            <BottomNavigationAction
              style={{ textDecoration: "none" }}
              component={Link}
              to="/Products/All"
              label="Products"
              icon={<i className="fa-solid fa-cow" ></i>} />

            <BottomNavigationAction
              style={{ textDecoration: "none" }}
              component={Link}
              to="/Cart"
              label="Basket"
              icon={<LocalMallIcon />} />

            <BottomNavigationAction
              style={{ textDecoration: "none" }}
              component={Link}
              to="/Useraccount"
              label="Profile"
              icon={<AccountCircleIcon />} />

          </BottomNavigation>
        </Box> : <>
        <div className='Footer mt-5'>
<Zoom>
<div className='about'>
        <img src={logo} width='220' height='54' style={{backgroundColor:"white"}}></img>
       <p>Taste the goodness of dairy Power</p>
       <h4 className='mt-3'>Know More About Milky Way</h4>
       <p className='mt-4'>Milky Way is committed to providing their customers with the best possible experience, from the quality of their products to their exceptional customer service. Whether you're looking for a creamy cup of milk for your coffee or artisanal cheese for your next charcuterie board, Milky Way has got you covered.</p>
<div className='button_links mt-5'>
<a href='https://www.facebook.com/eyecanof>ficial' target={"_blank"}  rel="noreferrer"><span><i class="fa-brands fa-facebook"></i></span></a>
<a href='https://www.youtube.com/channel/UCCXG36rCxTy__r4d6cGGllQ' target={"_blank"}  rel="noreferrer"><span><i class="fa-brands fa-youtube"></i></span></a>
<a href='https://www.linkedin.com/company/eyecan/' target={"_blank"}  rel="noreferrer"><span><i class="fa-brands fa-linkedin"></i></span></a>
<a href='https://www.instagram.com/eyecanofficial/' target={"_blank"}  rel="noreferrer"><span><i class="fa-brands fa-instagram"></i></span></a>
<a href='https://twitter.com/eyecanofficial' target={"_blank"}  rel="noreferrer"><span><i class="fa-brands fa-twitter"></i></span></a>
</div>
</div>
</Zoom>
<Zoom>
<div className='Usefull-links '>
  <h4>Useful Links</h4>
  <p>About Us</p>
  <p>Community</p>
  <p>Contact Us</p>
  <p>Subscription Plans</p>
  <p>Privacy Policy</p>
</div>
</Zoom>
<Zoom>
<div className='address'>
  <h4>Address</h4>
  <div>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.7875145982744!2d80.17388690930612!3d13.112643287162555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52638fffbcf51f%3A0x4fa5fa3bc22d6aae!2sAavin%20Milk%20Processing%20Unit!5e0!3m2!1sen!2sin!4v1682431475344!5m2!1sen!2sin" style={{border:"0",borderRadius:"10px"}} allowfullscreen loading="lazy"></iframe></div>
  <h6>
  <a href="tel:+918225835554">Phone</a></h6>
  <p className='mt-3'>+91 8225835554</p>
  <h6>
   <a  href="mailto:support@Milkway.in">Email</a>
  </h6>
  <p className='mt-3'>support@Milkway.in</p>
</div>
</Zoom>
</div>
        </>
    }
  </>
}

export default Bottomnavigation
