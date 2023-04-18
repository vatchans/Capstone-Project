import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export const contextAPI = React.createContext()
function Context({ children }) {
    let [users, setusers] = useState([])
    let [Pending_queries, setPending] = useState([])
    let [Query, setQuery] = useState([])
    let [resolved, setresolvedquery] = useState([])
    let [Products, SetProducts] = useState([])
    let [Employees,setEmployee] =useState([])

    let getusers = async () => {
        try {
            let res = await axios.get('https://milk-way-crm.onrender.com/users/All')
            if (res.status === 200) {
                setusers(res.data)
            }
        }
        catch (err) {
            alert(err.response.message)
        }
    }

    let getEmployees = async () => {
        try {
            let res = await axios.get('https://milk-way-crm.onrender.com/CustomerExcecutive/All')
            if (res.status === 200) {
                setEmployee(res.data)
            }
        }
        catch (err) {
            alert(err.response.message)
        }
    }

    let Pending = async () => {
        try {
            let res = await axios.get('https://milk-way-crm.onrender.com/Query/Pending_queries')
            if (res.status === 200) {
                setPending(res.data)
                console.log(res.data)
            }
        }
        catch (err) {
            alert(err.response.message)
        }
    }

    let My_Query = async () => {
        try {
            let token = localStorage.getItem('CustomerExcecutive')
            let decoded = jwtDecode(token)
            let res = await axios.post('https://milk-way-crm.onrender.com/Query/My_Queries', {
                Assigned_to:decoded.Username
            })
            if (res.status === 200) {
                setQuery(res.data)

            }
        }
        catch (error) {
            alert(error.response.message)
        }
    }

    let Resolved = async () => {
        try {
            let token = localStorage.getItem('CustomerExcecutive')
            let decoded = jwtDecode(token)
            let res = await axios.get(`https://milk-way-crm.onrender.com/Query/Resolved_Queries_admin/${decoded.id}`)
            if (res.status === 200) {
                setresolvedquery(res.data)
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }

    let  getAllProducts =async () => {
       try{
         let res = await axios.get('https://milk-way-crm.onrender.com/Products/getAll_Products')
         if(res.status===200){
            SetProducts(res.data)
         }
       }
       catch(error){
        console.log(error.response.data)
       }
    }

    useEffect(() => {
        getusers()
    }, [])

    useEffect(() => {
        Pending()
    }, [])

    useEffect(() => {
        My_Query()
    }, [])

    useEffect(() => {
        Resolved()
    }, [])


    useEffect(()=>{
       getAllProducts()
    },[])
     
    useEffect(()=>{
     getEmployees()
    },[])

    return <contextAPI.Provider value={{ users, Pending_queries, Query, resolved,Products,Employees}}>
        {children}
    </contextAPI.Provider>
}

export default Context
