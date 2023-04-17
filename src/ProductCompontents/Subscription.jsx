import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Lottie from "lottie-react";
import Bottomnavigation from './BottomNavigation'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import subscription from './66404-pause-subscription.json'
import Navbar from './Navbar'
function Subscription() {
    let [orders, setOrders] = useState([])
    let [date, setdate] = useState('')
    let navigate = useNavigate()
    let getOrders = async () => {
        try {
            let token = localStorage.getItem('users')
            let decoded = jwtDecode(token)
            let res = await axios.get(`https://milk-way-crm.onrender.com/Cart/User_subscription/${decoded.id}`)
            if (res.status === 200) {
                setOrders(res.data)
                res.data.map((e) => {
                    let date = new Date(e.Ordered_on)
                    var startDateTime = date
                    var nextMonthDate =
                        console.log(nextMonthDate)
                })
            }
        }
        catch (error) {
            console.log(error.response.data)
        }
    }
    useEffect(() => {
        getOrders()
    }, [])
    return <>
        <Navbar />
        <div className='App-container'>
            {!orders.length ?<>
                <div className="OrderSuccess">
        <Lottie  className="query-animation" animationData={subscription} loop={true}></Lottie>
        <h1 className='order-msg'>Currently You haven't subscribed</h1>
        <p className='mt-2 order-msg-2 mb-2' style={{fontWeight:100}}>Explore All our Subscription Plans</p>
        <Button style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px",}}
        onClick={() => navigate('/Products/Subscription')}>view plans</Button>
          
  </div></>:<>
            <h2 className='mt-3'>Subscription</h2>
            <div className='row row-cols-1 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 g-2 m-1 mt-2 mb-5 p-5 w-100'>
                {orders.map((e, i) => {
                    return <>
                            <div className='orders' key={i._id}>
                                <img src={e.Product_Image} />
                                <div className='mt-2'>Order id: <p style={{ fontWeight: 400 }}>{e._id}</p></div>
                                <div style={{ display: "flex", gap: "5px" }}>Product Name: <p style={{ fontWeight: 400 }}>{e.Product_name}</p></div>
                                <div style={{ display: "flex", gap: "5px" }}>Payment mode: <p style={{ fontWeight: 400 }}>{e.Payment_mode}</p></div>
                                <div style={{ display: "flex", gap: "5px" }}>Expires on:<p style={{ fontWeight: 400 }}>{
                                    window.moment(new Date(e.Ordered_on), "DD-MM-YYYY")
                                        .add(1, 'months')
                                        .format('LL')}</p> </div>
                                <div style={{ display: "flex", gap: "5px" }}>Transcation id: <p style={{ fontWeight: 400 }}>{e.transcation_id}</p></div>
                            </div> 
                        
                    </>
                })
                }
            </div>
           </>}
        </div>
        <Bottomnavigation />
    </>
}

export default Subscription