import React from 'react'
import Navbar from './Navbar'
import { Button} from '@mui/material'
import Bottomnavigation from './BottomNavigation'
import Context from '../Compontents/Context'
import { contextAPI } from '../Compontents/Context';
import { Skeleton } from '@mui/material'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useRazorpay from "react-razorpay";
import { toast, Zoom } from 'react-toastify'
import img from './istockphoto-515777808-1024x1024-transformed.jpeg'
import jwtDecode from 'jwt-decode'
function ProductView() {
  let [Products, setProducts] = useState([])
  let { id } = useParams()
  let navigate = useNavigate()
  let [loading, setloading] = useState(true)
  const Razorpay = useRazorpay();

  let getProduct = async () => {
    try {
      let res = await axios.get(`https://milk-way-crm.onrender.com/Products/view_Product/${id}`)
      if (res.status === 200) {
        setloading(false)
        setProducts(res.data)
      }
    }
    catch (error) {
      alert(error.response.data)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  let AddtoBasket = async (...data) => {
    if (localStorage.getItem('users')) {
      try {
        let token = localStorage.getItem('users')
        let decodedata = jwtDecode(token)
        let res = await axios.post('https://milk-way-crm.onrender.com/Cart/Add-to-cart', {
          Product_id: id,
          User_id: decodedata.id,
          Product_name: data[0].Product_name,
          Product_Price: data[1].Product_Price,
          Product_Image: data[2].Product_Image,
          Product_Quantity: data[3].Product_Quantity,
          Product_Category: data[4].Product_Category,
        })
        if (res.status === 201) {
          toast.success(res.data, {
            position: "top-center",
            limit: 1,
            transition: Zoom,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          })
        }
      }

      catch (error) {
        if (error.response.status === 400) {
          toast.info(error.response.data, {
            position: "top-center",
            limit: 1,
            transition: Zoom,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          })
        }
        // alert(,)

      }
    }
    else {
      navigate('/Signin')
    }
  }

  let ProcessPayment = async (data) => {

    let token = localStorage.getItem('users')
    let decodedata = jwtDecode(token)

    const options = {
      key: "rzp_test_oYYYX4CEp1ZRoW",
      amount: data.amount,
      currency: "INR",
      name: "Fresh Farms",
      description: "Test Transaction",
      image: "data:image/png;base64,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",
      order_id: data.id,
      handler: async (response) => {
        try {
          let res = await axios.post('https://milk-way-crm.onrender.com/Cart/verify', response)
          if (res.status === 200) {
            await axios.post('https://milk-way-crm.onrender.com/Cart/orders', {
              Product_id: id,
              User_id: decodedata.id,
              Product_name: Products[0].Product_name,
              Products_Price: Products[0].Product_Price,
              Product_Image: Products[0].Product_Image,
              transcation_id: response.razorpay_payment_id
            })
            navigate('/ordersuccess')
          }
        }
        catch (error) {
          console.log(error.response.data)
        }
      },

      prefill: {
        name: decodedata.Username,
        email: decodedata.Email,
        contact: decodedata.Mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);



    rzp1.open()
  }

  let makePayment = async (total) => {
    try {
      let res = await axios.post("https://milk-way-crm.onrender.com/Cart/Payment", {
        amount: total
      });
      if (res.status === 200) {
        console.log(res.data.amount)
        ProcessPayment(res.data)
      }


    }
    catch (error) {
      console.log(error)
    }
  }

  return <>
    <Navbar />
    {loading ?
      <div className='App-container'>
        <div className='Product-page mt-5'>
          <div className="Product-image">
          <Skeleton><img src={img}></img></Skeleton>

          </div>


          <div className="Product-content">
          <Skeleton><p className='Product-content-title'>
              {"Product name"}
            </p></Skeleton>
            <Skeleton><p className='Product-content-quantity'>2 liters</p></Skeleton>
            <Skeleton>  <p className='Product-content-Price'>
              <CurrencyRupeeIcon />{200}
            </p></Skeleton>
            <Skeleton><p className='Product_Delivery '><i class="fa-solid fa-bolt"></i> Today in 90 mins </p>
            </Skeleton>
            <Skeleton><p className='Product-content-discription mt-2'>Description</p></Skeleton>
            <Skeleton><p style={{ fontWeight: "400" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p></Skeleton>


            <div className='Product-content-button mt-5'>
            <Skeleton><Button style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px" }} 
             >Add to Basket</Button></Skeleton>
              <Skeleton><Button style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px" }} >Buy now</Button></Skeleton>
            </div>

          </div>


        </div>
      </div> :
      <div className='App-container'>

        {Products && Products.map((e) => {
          return <>
            <div className='Product-page mt-5'>
              <div className="Product-image">
                <img src={e.Product_Image}></img>

              </div>


              <div className="Product-content">
                <p className='Product-content-title'>
                  {e.Product_name}
                </p>
                <p className='Product-content-quantity'>{e.Product_Quantity} {e.Product_Category === "Milk" ? <>litre{e.Product_Quantity > 1 ? <>s</> : <></>}</> : e.Product_Category === "Egg" ? <>box{e.Product_Quantity > 1 ? <>es</> : <></>} (Pack of 6)</> :e.Product_Category === "Subscription" ? <>Month{e.Product_Quantity > 1 ? <>s</> : <></>} Subscription</>:<>Kg</>}</p>
                <p className='Product-content-Price'>
                  <CurrencyRupeeIcon />{e.Product_Price}
                </p>
                <p className='Product_Delivery '><i class="fa-solid fa-bolt"></i> Today in 90 mins </p>
                <p className='Product-content-discription mt-2'>Description</p>
                <p style={{ fontWeight: "400" }}>{e.Product_discription} </p>

                <div className='Product-content-button mt-5'>
                  <Button style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px" }} onClick={() => {
                    AddtoBasket({ Product_name: e.Product_name }, { Product_Price: e.Product_Price }, { Product_Image: e.Product_Image },
                      { Product_Quantity: e.Product_Quantity }, { Product_Category: e.Product_Category })
                  }}>Add to Basket</Button>
                  <Button style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px" }} onClick={() => makePayment(e.Product_Price)}>Buy now</Button>
                </div>

              </div>


            </div>
          </>
        })}
      </div>}
    <Bottomnavigation />
  </>
}

export default ProductView
