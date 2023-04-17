import React from 'react'
import { useState,useEffect,useContext} from 'react'
import Navbar from './Navbar'
import { SearchOutlined } from '@mui/icons-material'
import Bottomnavigation from './BottomNavigation'
import { useParams,useNavigate} from 'react-router-dom'
import { contextAPI } from '../Compontents/Context';
import milk_img from './assets/fresh-milk-mug-jug-wooden-table.jpg'
import egg_img from './assets/Eggs.png'
import honey_img from './assets/istockphoto-520733611-1024x1024-transformed.jpeg'
import butter_img from './assets/istockphoto-179875636-1024x1024-transformed.jpeg'
import curd_img from './assets/imageedit_2_9845413963.jpg'
import panneer_img from './assets/istockphoto-1210307314-1024x1024-transformed.jpeg'
import ghee_img from './assets/istockphoto-1187181045-1024x1024-transformed.jpeg'
import yogurt_img from './assets/istockphoto-515777808-1024x1024-transformed.jpeg'
import axios from 'axios'
function Products() {
    let [Search,setsearch]=useState("")
    let navigate=useNavigate()
    let {category}=useParams()
    let data=useContext(contextAPI)
    return <>
        <Navbar></Navbar>
        <div className='App-container m-5'>
            <div className='Product_Search-bar'>
            <h2>Products</h2>
                <div className='Product_search-box'>
                    <SearchOutlined />
                    <input type="text" placeholder="Search" onChange={(e) => { setsearch(e.target.value) }} style={{border:"none"}}/>

                </div>
            </div>
        </div>
        <div className='Content-scrollable'>
        <div className='Catagories_fliter'>
                <div className='category-card-filter' onClick={()=>setsearch("Milk")}>
               <img src={milk_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Milk</p>
               </div>
               <div className='category-card-filter' onClick={()=>setsearch("Egg")}>
               <img src={egg_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Eggs</p>
               </div>
               <div className='category-card-filter' onClick={()=>setsearch("Curd")}>
               <img src={curd_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Curd</p>
               </div>
               <div className='category-card-filter'onClick={()=>setsearch("Ghee")}>
               <img src={ghee_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Ghee</p>
               </div>
               <div className='category-card-filter' onClick={()=>setsearch("Yogurt")}>
               <img src={yogurt_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Yogurt</p>
               </div>
               <div className='category-card-filter' onClick={()=>setsearch("Panner")}>
               <img src={panneer_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Panneer</p>
               </div>
               <div className='category-card-filter'onClick={()=>setsearch("Butter")}>
               <img src={butter_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Butter</p>
               </div>
               <div className='category-card-filter'onClick={()=>setsearch("Honey")}>
               <img src={honey_img}></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Honey</p>
               </div>
                </div>
               
                </div>

                <div className='ct row row-cols-1 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 g-2 m-1 mt-2 mb-5 p-5'>
                    {data.Products&& data.Products.filter((s)=>{
                        if(category==="All"){
                            return s;
                        }
                        else if(s.Product_Category.includes(category)){
                            return s;
                        }
                    }).filter((s)=>{
                        if(Search===""){
                            return s;
                        }
                        else if(s.Product_name.toLowerCase().includes(Search.toLowerCase())||s.Product_Category.toLowerCase().includes(Search.toLowerCase())){
                           return s;
                        }
                    }).map((e,i)=>{
                        return<>
                    <div className='Product-card mt-5' key={i._id} onClick={()=>navigate(`/ProductView/${e._id}`)}>
                         <img src={e.Product_Image||'fresh-milk-mug-jug-wooden-table.jpg'}></img>
                        <p className='Product-title mt-2'>
                            {e.Product_name}
                        </p>

                        <p className='mt-3'>{e.Product_Quantity} {e.Product_Category === "Milk" ? <>litre{e.Product_Quantity > 1 ? <>s</> : <></>}</> : e.Product_Category === "Egg" ? <>box{e.Product_Quantity > 1 ? <>es</> : <></>} (Pack of 6)</> : <>Kg</>}</p>
                        <p className='Product_price mt-2'>₹ {e.Product_Price}</p>
                        <p className='Product_Delivery mt-4'><i class="fa-solid fa-bolt"></i> Today in 90 mins </p>
                    </div>
                    </>})}
                </div>
                <Bottomnavigation/>
    </>
}

export default Products
