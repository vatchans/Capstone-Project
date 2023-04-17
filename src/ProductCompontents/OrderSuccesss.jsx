import React from 'react'
import Lottie from "lottie-react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSuccess from './74394-order-success.json'
function OrderSuccesss() {
  let navigate=useNavigate()
useEffect(()=>{
 setTimeout(()=>{
     navigate(-1)
 },3000)
},[])
   
  return <>
  <div className="OrderSuccess">
        <Lottie animationData={OrderSuccess} loop={true}></Lottie>
        <h1 className='order-msg'>Your Order is Confirmed!</h1>
        <p className='mt-2 order-msg-2'>Thanks for Your Order</p>
        <p className='order-msg-2'>Your Order will be delivered within <i class="fa-solid fa-bolt"></i> 90mins</p>

  </div>
  </>
}

export default OrderSuccesss