import React from 'react'
import { Button } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import AdminSidebar from './AdminSidebar'
function AddProduct() {
  let [Product_name,setProductname]=useState("")
  let [Product_Category,setCategory]=useState('')
  let [Products_Price,setPrice]=useState(0)
  let [Product_discription,setDiscription]=useState("")
  let [Product_Image,setImage]=useState('')

  let Add_Product=async()=>{
    try{
        let res=await axios.post('https://milk-way-crm.onrender.com/Products/Add_Products',{
          Product_Category,
          Product_name,
          Product_discription,
          Product_Image,
          Products_Price
        })
        if(res.status===201){
           toast.success(res.data)
           setProductname('')
           setCategory('')
           setPrice('')
           setDiscription('')
           setImage('')
        }
    }
    catch(error){

    }
  }
  return <>
    <AdminSidebar />
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
        <h1 className='Dashboard_title'>Add a Product</h1>
        <div className='App-container mt-5' style={{gap:"2rem"}}>
          <input type='text' placeholder='Product name' onChange={(e)=>setProductname(e.target.value)}></input>
          <select onChange={(e)=>setCategory(e.target.value)}>
            <option value="Milk">Milk</option>
            <option value="Egg">Egg</option>
            <option value="Ghee">Ghee</option>
            <option value="Curd">Curd</option>
            <option value="Panneer">Panneer</option>
            <option value="Honey">Honey</option>
            <option value="Yogurt">Yogurt</option>
            <option value="Subcription">Subscription</option>
          </select>
          <input type='text' placeholder='Product Image URL' onChange={(e)=>setImage(e.target.value)}/>
          <input type='Number' placeholder='Product Price' onChange={(e)=>setPrice(e.target.value)}/>
          <textarea placeholder='Product discription' style={{fontWeight:"400",border:"1px solid silver"}} onChange={(e)=>setDiscription(e.target.value)}>
          </textarea>
        <Button  style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px",width:"10rem" }} onClick={Add_Product}>Add</Button>
        </div>
      </div>
    </div>

  </>
}

export default AddProduct