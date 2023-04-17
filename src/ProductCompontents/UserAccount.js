import React from 'react'
import { useEffect,useState} from 'react'
import Navbar from './Navbar'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Bottomnavigation from './BottomNavigation'
import jwtDecode from 'jwt-decode'
function UserAccount() {
  let [User, setUsers] = useState([])
  let navigate=useNavigate()
  let Existinguser = () => {
    if (localStorage.getItem('users')) {
      let token = localStorage.getItem('users')
      let decoded = jwtDecode(token)
      setUsers(decoded)
    } else {
      navigate('/Signin')
    }
  }
  useEffect(()=>{
   Existinguser()
  },[])

  return <>
  <Navbar/>
  <div className='App-container'>
  <h2 className='mt-3'>Profile</h2>
  <div className='Profile'>
  <div className='User-details'>
     <Avatar style={{ width: 46, height: 46 }}></Avatar> 
    <p style={{fontSize:'16px'}}>
      Account details
    </p>
  </div>
  <div className='User-details' onClick={()=>navigate('/Userorders')}>
     <img src='shopping-bag.png' style={{ width: 46, height: 46 }}/>
    <p style={{fontSize:'16px'}}>
       Orders
    </p>
  </div>
  <div className='User-details' onClick={()=>navigate('/Subscription')}>
  <img src='calendar.png' style={{ width: 46, height: 46 }}/>
    <p style={{fontSize:'16px'}}>
       Subscription
    </p>
  </div>
  <div className='User-details'onClick={()=>navigate('/Usersupport')}>
  <img src='ask-me.png' style={{ width: 46, height: 46 }}/>
    <p style={{fontSize:'16px'}}>
       Customer Support
    </p>
  </div>
  </div>
  </div>
  <Bottomnavigation/>
  </>
}

export default UserAccount