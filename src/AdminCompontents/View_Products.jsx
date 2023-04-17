import React from 'react'
import { contextAPI } from '../Compontents/Context'
import { useContext, useState } from 'react'
import { SearchOutlined } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'
import axios from 'axios'
import {toast} from 'react-toastify'
import AdminSidebar from './AdminSidebar'
function View_Products() {
    let [Search, setsearch] = useState('')
    let data = useContext(contextAPI)
    let navigate = useNavigate('')
    console.log(data.Products)

    let deleteProduct = async (id) => {
      try{
       let res=await axios.delete(`https://milk-way-crm.onrender.com/Products/delete_Product/${id}`)
       if(res.status===200){
        toast.success(res.data)
       }
      }
      catch(error){
        toast.error(error.response.data)
      }
    }
    return <>
        <AdminSidebar />
        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                <div className='App-container m-5'>
                    <div className='Product_Search-bar'>
                        <h2>Products</h2>
                        <div className='Product_search-box'>
                            <SearchOutlined />
                            <input type="text" placeholder="Search" onChange={(e) => { setsearch(e.target.value) }} style={{ border: "none" }} />

                        </div>
                    </div>
                </div>
                <div className='ct row row-cols-1 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 g-2 m-1 mt-2 mb-5 p-5' style={{ gap: "2rem" }}>
                    {data.Products && data.Products.filter((s) => {
                        if (Search === "") {
                            return s;
                        }
                        else if (s.Product_name.toLowerCase().includes(Search.toLowerCase()) || s.Product_Category.toLowerCase().includes(Search.toLowerCase())) {
                            return s;
                        }
                    }).map((e, i) => {
                        return <>
                            <div className='Product-card mt-5' key={i._id} style={{ border: "1px solid silver", borderRadius: "8px" }}>
                                <img src={e.Product_Image || 'fresh-milk-mug-jug-wooden-table.jpg'}></img>
                                <p className='Product-title mt-2'>
                                    {e.Product_name}
                                </p>

                                <p className='mt-3'>{e.Product_Quantity} {e.Product_Category.includes("Milk") ? <>litre</> : <>Piece</>}</p>
                                <p className='Product_price mt-2'>₹ {e.Product_Price}</p>
                                <div className="mt-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button style={{ backgroundColor: "#d11243", color: "white", padding: "7px", borderRadius: "8px", }} onClick={() => navigate(`/Edit_Product/${e._id}`)}><EditIcon /> </Button>
                                    <Button style={{ backgroundColor: "#d11243", color: "white", padding: "7px", borderRadius: "8px", }} onClick={() => { deleteProduct(e._id) }}><DeleteIcon /> </Button>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default View_Products