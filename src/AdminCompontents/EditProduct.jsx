import React from 'react'
import { Button } from '@mui/material'
import { useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
function EditProduct() {
  let [Product_name,setProductname]=useState("")
  let [Product_Category,setCategory]=useState('')
  let [Product_Price,setPrice]=useState(0)
  let {id}=useParams()
  let navigate=useNavigate()
  let [Product_discription,setDiscription]=useState("")
  let [Product_Image,setImage]=useState('')

  let Edit_Product=async()=>{
    try{
        let res=await axios.post(`https://milk-way-crm.onrender.com/Products/Edit_Product/${id}`,{
          Product_Category,
          Product_name,
          Product_discription,
          Product_Image,
          Product_Price
        })
        if(res.status===200){
           navigate(-1)
           toast.success(res.data)
        }
    }
    catch(error){
      toast.error(error.response.data)
    }
  }
  let getProduct = async () => {
    try {
      let res = await axios.get(`https://milk-way-crm.onrender.com/Products/view_Product/${id}`)
      if (res.status === 200) {
          setCategory(res.data[0].Product_Category)
          setProductname(res.data[0].Product_name)
          setImage(res.data[0].Product_Image)
          setDiscription(res.data[0].Product_discription)
          setPrice(res.data[0].Product_Price)
      }
    }
    catch (error) {
      alert(error.response.data)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return <>
      <AdminSidebar />
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
        <h1 className='Dashboard_title'>Add a Product</h1>
        <div className='App-container mt-5' style={{gap:"2rem"}}>
          <input type='text' placeholder='Product name' value={Product_name} onChange={(e)=>setProductname(e.target.value)}></input>
          <select onChange={(e)=>setCategory(e.target.value)} value={Product_Category}>
            <option value="Milk">Milk</option>
            <option value="Egg">Egg</option>
            <option value="Ghee">Ghee</option>
            <option value="Curd">Curd</option>
            <option value="Panneer">Panneer</option>
            <option value="Honey">Honey</option>
            <option value="Yogurt">Yogurt</option>
            <option value="Subcription">Subscription</option>
          </select>
          <input type='text' placeholder='Product Image URL'value={Product_Image} onChange={(e)=>setImage(e.target.value)}/>
          <input type='Number' placeholder='Product Price'value={Product_Price} onChange={(e)=>setPrice(e.target.value)}  />
          <textarea placeholder='Product discription' style={{fontWeight:"400",border:"1px solid silver"}} value={Product_discription} onChange={(e)=>setDiscription(e.target.value)}>
          </textarea>
        <Button  style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px",width:"10rem" }} onClick={Edit_Product}>Update</Button>
        </div>
      </div>
    </div>
  </>
}

export default EditProduct