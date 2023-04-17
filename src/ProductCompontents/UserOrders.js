import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Bottomnavigation from './BottomNavigation'
import Navbar from './Navbar'
function UserOrders() {
  let [orders,setOrders]=useState([])
  let getOrders=async()=>{
    try{
      let token = localStorage.getItem('users')
      let decoded = jwtDecode(token)
      let res =await axios.get(`https://milk-way-crm.onrender.com/Cart/User_Orders/${decoded.id}`)
      if(res.status===200){
        setOrders(res.data)
      }
    }
    catch(error){
        console.log(error.response.data)
    }
  }
  useEffect(()=>{
    getOrders()
  },[])

  return <>
  <Navbar/>
    <div className='App-container'>
  <h2 className='mt-3'>Orders</h2>
    <div className='row row-cols-1 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 g-2 m-1 mt-2 mb-5 p-5 orders-container' style={{ gap: "2rem" }}>
      {orders.map((e,i)=>{
        return <>
      <div className='orders' key={i._id}>
        <img src={e.Product_Image}/>
        <div className='mt-2'>Order id: <p style={{fontWeight:400}}>{e._id}</p></div>
        <div style={{display:"flex",gap:"5px"}}>Product Name: <p style={{fontWeight:400}}>{e.Product_name}</p></div>
        <div style={{display:"flex",gap:"5px"}}>Payment mode: <p style={{fontWeight:400}}>{e.Payment_mode}</p></div>
        <div style={{display:"flex",gap:"5px"}}>Transcation id: <p style={{fontWeight:400}}>{e.transcation_id}</p></div>
      </div>
      </>})
}
    </div>
  </div>
  <Bottomnavigation/>
  </>
}

export default UserOrders