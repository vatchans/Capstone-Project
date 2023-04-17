import React from 'react'
import Lottie from "lottie-react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import help from './89131-247-help.json'
function Queryreceived() {
  let navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/Useraccount')
    },5000)
  }, [])
  return <>
     <div className="OrderSuccess">
        <Lottie  className="query-animation" animationData={help} loop={true}></Lottie>
        <h1 className='order-msg'>We have receive Your Complaint</h1>
        <p className='mt-2 order-msg-2'>Our team will be contacting you soon.And you will receive all updates through mail.</p>

  </div>
  </>
}

export default Queryreceived