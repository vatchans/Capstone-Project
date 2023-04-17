import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { contextAPI } from './Context';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
function Resolve_query() {
   let { id } = useParams()
   let data = useContext(contextAPI)
   let [solution, setSolution] = useState('')

   let resolve = async () => {
      try {
         let token = localStorage.getItem('CustomerExcecutive')
         let decoded = jwtDecode(token)
         let query = data.Query.filter((e) => { if (e._id === id) { return e } }).map((e) => { return {
            Query_id: e._id,
            User_name: e.User_name,
            User_id: e.User_id,
            admin_id: decoded.id,
            title:  e.title,
            Reason: e.Reason,
            Solution: solution
         }})
         let res = await axios.post('https://milk-way-crm.onrender.com/Query/resolve_Query',query)
         if (res.status === 200) {
            toast.success(res.data)
         }
      }
      catch (error) {
         console.log(error.response.data)
      }
   }
   return <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
         <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
            <h1 className='Dashboard_title'>Resolve Query</h1>
            <div className='reply-box-container'>
               <><textarea placeholder='Write your reply here' onChange={(e) => setSolution(e.target.value)}>
               </textarea>
               </>
               <div className='reply-box'>{
                  data.Query.filter((e) => {
                     if (e._id === id) {
                        return e
                     }
                  }).map((e) => {
                     return (
                        <div style={{ padding: "2px", margin: "5px" }}>
                           <p>Query id: {id}</p>
                           <p>Customer Name: {e.User_name}</p>
                           <p>Title: {e.title},</p>
                           <p>Reason: {e.Reason}</p>

                        </div>
                     )
                  })
               }
               </div>

            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
               <Button style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px" }} onClick={resolve}>Submit</Button>
            </div>
         </div>
      </div>

   </>
}

export default Resolve_query