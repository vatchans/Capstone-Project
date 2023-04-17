import React, { useState } from 'react'
import Navbar from './Navbar'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button } from '@mui/material';
import Returntologin from './Returntologin'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Bottomnavigation from './BottomNavigation'
import { useNavigate } from 'react-router-dom';
function UserSupport() {
  let [title, settitle] = useState('')
  let [Image, setimage] = useState("")
  let [department, setdepartment] = useState("")
  let [Reason, setreason] = useState('')
  let navigate=useNavigate()


  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }


  let uploadImage = async (e) => {
    let img = e.target.files[0]
    let base64 = convertToBase64(img)
    base64.then((a) => {
      setimage(a)
    });
  }


  let query = [{
    reason: "My delivery has delayed",
    department: "delivery department"
  }, {
    reason: "Payment failure",
    department: "Accounting department"
  }, {
    reason: "Quality is'nt good",
    department: "QC department"
  }, {
    reason: "I received damaged or expired Product",
    department: "delivery department"
  }, {
    reason: "I am unable to place a cash on delivery order",
    department: "It department"
  }, {
    reason: "I am Planning to relocate.cancle my Subscription or Change my Address",
    department: "delivery department"
  }, {
    reason: "Report missing items in my order",
    department: "delivery department"
  }, {
    reason: "items are different from what I ordered",
    department: "delivery department"
  }, {
    reason: "others",
    department: "general department"
  }
  ]

  let Raise_query = async () => {
    try {
      let token = localStorage.getItem('users')
      let decoded = jwtDecode(token)
      let Department=query.filter((e) => { if (e.reason.includes(title)) { return e } }).map((e) => {return e.department})
      let res = await axios.post('https://milk-way-crm.onrender.com/Query/Raise_query', {
        User_name: decoded.Username,
        User_id: decoded.id,
        Mobile: decoded.Mobile,
        Email: decoded.Email,
        title,
        Reason,
        department:Department[0],
        Image,

      })
      if (res.status === 201) {
        navigate('/Queryreceived')
      }
    }
    catch (error) {
      console.log(error.response.data)
    }
  }
  return <>
    <Navbar />
    <div className='App-container mb-5' style={{ gap: "2rem" }}>
      <div className='mt-3' style={{ display: "flex", gap: "6px" }}>Customer Support <img src="help.png" style={{ width: 46, height: 46 }}></img></div>

      <select onChange={(e) => settitle(e.target.value)}>{
        query.map((e) => {
          return <>
            <option value={e.reason} >{e.reason}</option>
          </>
        })}
      </select>
          <select onChange={(e) => setdepartment(e.target.value)}>
          {query.filter((e) => { if (e.reason.includes(title)) { return e } }).map((e) => {
           return <>
            <option value={e.department}>{e.department}</option>
            </>
           })}
          </select>
      

      <div className='image_upload' style={{ display: 'flex', alignItems: "center", gap: '2rem' }}>
        <label htmlFor='image_upload'>
          <div className='upload-btn'>Add Image<FileUploadIcon style={{ color: "white", fontSize: "medium" }} /></div>
        </label>
        <div>
          <p className="mb-1" style={{ textAlign: "center" }}>(optional)</p>
          <img src={Image || "empty-300x240.jpg"}>
          </img>
        </div>
      </div>
      <input type="file" id="image_upload" style={{ display: "none" }} onChange={(e) => uploadImage(e)} />
      <textarea placeholder='Write your reason here' style={{ fontWeight: "400", border: "1px solid silver" }} onChange={(e) => setreason(e.target.value)}>
      </textarea>
      <Button style={{ backgroundColor: "#d11243", color: "white", padding: "8px", borderRadius: "8px" }} onClick={Raise_query}>Submit</Button>
    </div>
    <Bottomnavigation/>

  </>
}

export default UserSupport